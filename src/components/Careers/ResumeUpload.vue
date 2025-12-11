<template>
  <div class="resume-upload">
    <div
      class="upload-area"
      :class="{ 'drag-over': isDragging }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        ref="fileInput"
        @change="handleFileSelect"
        accept=".pdf"
        class="file-input"
        id="resume-upload"
      />
      <label for="resume-upload" class="upload-label">
        <div class="upload-icon">
          <i class="fas fa-file-pdf"></i>
        </div>
        <div class="upload-text">
          <p class="mb-2"><strong>Click to upload</strong> or drag and drop</p>
          <p class="text-muted small">PDF files only</p>
        </div>
      </label>
    </div>

    <!-- Uploaded Files List -->
    <div v-if="uploadedFiles.length > 0" class="uploaded-files mt-3">
      <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
        <div class="file-info">
          <i class="fas fa-file-pdf file-icon"></i>
          <div class="file-details">
            <div class="file-name">{{ file.name }}</div>
            <div class="file-size">{{ formatFileSize(file.size) }}</div>
          </div>
        </div>
        <button type="button" @click="removeFile(index)" class="btn-remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message mt-2">
      <i class="fas fa-exclamation-circle"></i>
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeUpload',
  props: {
    uploadedFiles: {
      type: Array,
      default: () => [],
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10MB in bytes
    },
    maxFiles: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:uploadedFiles'],
  data() {
    return {
      isDragging: false,
      errorMessage: '',
    }
  },
  methods: {
    handleDragOver() {
      this.isDragging = true
    },
    handleDragLeave() {
      this.isDragging = false
    },
    handleDrop(event) {
      this.isDragging = false
      const files = Array.from(event.dataTransfer.files)
      this.processFiles(files)
    },
    handleFileSelect(event) {
      const files = Array.from(event.target.files)
      this.processFiles(files)
      // Reset input
      event.target.value = ''
    },
    processFiles(files) {
      this.errorMessage = ''

      // Filter PDF files only
      const pdfFiles = files.filter((file) => file.type === 'application/pdf')

      if (pdfFiles.length !== files.length) {
        this.errorMessage = 'Only PDF files are allowed'
        return
      }

      // Check max files limit
      if (this.uploadedFiles.length + pdfFiles.length > this.maxFiles) {
        this.errorMessage = `You can only upload ${this.maxFiles} file(s)`
        return
      }

      // Check file sizes
      const oversizedFiles = pdfFiles.filter((file) => file.size > this.maxSize)
      if (oversizedFiles.length > 0) {
        this.errorMessage = `File size must be less than ${this.formatFileSize(this.maxSize)}`
        return
      }

      // Add files
      const newFiles = [...this.uploadedFiles, ...pdfFiles]
      this.$emit('update:uploadedFiles', newFiles)
    },
    removeFile(index) {
      const newFiles = this.uploadedFiles.filter((_, i) => i !== index)
      this.$emit('update:uploadedFiles', newFiles)
      this.errorMessage = ''
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    },
  },
}
</script>

<style scoped>
.resume-upload {
  width: 100%;
}

.upload-area {
  border: 2px dashed var(--orange-10);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  text-align: center;
  transition: var(--transition-base);
  cursor: pointer;
}

.upload-area:hover {
  border-color: var(--accent-orange);
  background: rgba(255, 255, 255, 0.08);
}

.upload-area.drag-over {
  border-color: var(--accent-orange);
  background: var(--orange-10);
}

.file-input {
  display: none;
}

.upload-label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 0;
}

.upload-icon {
  width: 60px;
  height: 60px;
  background: var(--orange-10);
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--accent-orange);
  transition: var(--transition-base);
}

.upload-area:hover .upload-icon {
  transform: scale(1.1);
  background: var(--accent-orange);
  color: white;
}

.upload-area.drag-over .upload-icon {
  transform: scale(1.1);
  background: var(--accent-orange);
  color: white;
}

.upload-text p {
  margin: 0;
  color: white;
}

.upload-text .text-muted {
  color: rgba(255, 255, 255, 0.5) !important;
}

.uploaded-files {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
}

.file-item:hover {
  border-color: var(--accent-orange);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.file-icon {
  font-size: 1.5rem;
  color: var(--accent-orange);
}

.file-details {
  flex: 1;
}

.file-name {
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.file-size {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

.btn-remove {
  background: transparent;
  border: none;
  color: var(--accent-red);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.btn-remove:hover {
  background: rgba(239, 68, 68, 0.1);
  transform: scale(1.1);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-red);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-md);
}

@media (max-width: 768px) {
  .upload-area {
    padding: 1.5rem 1rem;
  }

  .upload-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .file-item {
    padding: 0.75rem;
  }
}
</style>
