<template>
  <div class="file-upload-component">
    <label v-if="label" class="text-white fw-bold d-block mb-2">
      {{ label }} <span v-if="required" class="text-orange">*</span>
    </label>

    <div
      class="upload-area-compact position-relative rounded"
      :class="{
        dragging: isDragging,
        invalid: showError && errorMessage,
      }"
      @click="triggerFileInput"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleFileDrop"
    >
      <input
        ref="fileInput"
        type="file"
        :name="name"
        :multiple="multiple"
        :accept="accept"
        @change="handleFileSelect"
        style="display: none"
      />
      <div class="text-center py-5">
        <i class="fas fa-cloud-upload text-orange" style="font-size: 2rem"></i>
        <p class="text-gray mt-2 mb-0">{{ placeholder }}</p>
      </div>
    </div>

    <!-- Uploaded Files List -->
    <div v-if="files.length > 0" class="uploaded-files-list mt-3">
      <div v-for="(file, index) in files" :key="index" class="uploaded-file-item">
        <div class="file-icon">
          <i class="fas fa-file-image" v-if="file.type.startsWith('image/')"></i>
          <i class="fas fa-file-video" v-else-if="file.type.startsWith('video/')"></i>
          <i class="fas fa-file-pdf" v-else></i>
        </div>
        <div class="file-info">
          <div class="file-name">{{ file.name }}</div>
          <div class="file-size">{{ (file.size / 1024).toFixed(2) }} KB</div>
        </div>
        <div class="file-actions">
          <button
            type="button"
            class="btn-file-action btn-edit"
            @click.stop="editFile(index)"
            title="Replace file"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            type="button"
            class="btn-file-action btn-delete"
            @click.stop="deleteFile(index)"
            title="Remove file"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="showError && errorMessage" class="field-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    label: {
      type: String,
      default: 'Upload Photos',
    },
    name: {
      type: String,
      default: 'attachments',
    },
    placeholder: {
      type: String,
      default: 'Drag & drop or click to browse',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: String,
      default: 'image/*,video/*,application/pdf',
    },
    required: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10MB
    },
    maxFiles: {
      type: Number,
      default: 10,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: '',
    },
    showError: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      isDragging: false,
      files: [],
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.files = newVal || []
      },
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileSelect(event) {
      const newFiles = Array.from(event.target.files)
      this.addFiles(newFiles)
    },
    handleFileDrop(event) {
      this.isDragging = false
      const newFiles = Array.from(event.dataTransfer.files)

      // Filter allowed file types
      const allowedFiles = newFiles.filter((file) => {
        const acceptTypes = this.accept.split(',').map((t) => t.trim())
        return acceptTypes.some((type) => {
          if (type.endsWith('/*')) {
            const baseType = type.replace('/*', '')
            return file.type.startsWith(baseType)
          }
          return file.type === type
        })
      })

      this.addFiles(allowedFiles)
    },
    addFiles(newFiles) {
      this.files = [...this.files, ...newFiles]
      this.updateModelValue()
    },
    editFile(index) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = this.accept
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          this.files[index] = file
          this.updateModelValue()
        }
      }
      input.click()
    },
    deleteFile(index) {
      this.files.splice(index, 1)
      this.updateModelValue()
    },
    updateModelValue() {
      // Update file input element
      const dataTransfer = new DataTransfer()
      this.files.forEach((file) => dataTransfer.items.add(file))
      this.$refs.fileInput.files = dataTransfer.files

      // Emit changes
      this.$emit('update:modelValue', this.files)
      this.$emit('change', this.files)
    },
  },
}
</script>

<style scoped>
/* Uploaded Files List */
.uploaded-files-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.uploaded-file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--secondary-dark);
  border: 1px solid var(--orange-10);
  border-radius: 8px;
  transition: var(--transition-base);
}

.uploaded-file-item:hover {
  border-color: var(--accent-orange);
  background: var(--orange-10);
}

.file-icon {
  font-size: 24px;
  color: var(--accent-orange);
  min-width: 30px;
  text-align: center;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  color: var(--text-light);
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.file-size {
  color: var(--text-gray);
  font-size: 12px;
}

.file-actions {
  display: flex;
  gap: 8px;
}

.btn-file-action {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--orange-20);
  border-radius: 6px;
  background: var(--primary-dark);
  color: var(--accent-orange);
  cursor: pointer;
  transition: var(--transition-base);
  font-size: 14px;
}

.btn-file-action:hover {
  background: var(--accent-orange);
  color: var(--primary-dark);
  border-color: var(--accent-orange);
  transform: scale(1.05);
}

.btn-edit:hover {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
  color: var(--text-light);
}

.btn-delete:hover {
  background: var(--danger-red);
  border-color: var(--danger-red);
  color: var(--text-light);
}
</style>
