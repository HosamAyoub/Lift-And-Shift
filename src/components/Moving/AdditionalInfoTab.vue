<template>
  <div class="tab-content-wrapper">
    <h4 class="text-white mb-4">
      <i class="fas fa-clipboard-list text-orange me-2"></i>Additional Information
    </h4>
    <p class="text-gray small mb-4">
      Help us serve you better by providing more details about your move.
    </p>

    <!-- Photo Upload -->
    <div class="mb-4">
      <FileUpload
        :model-value="uploadedFiles"
        label="Upload Photos"
        name="moving_photos"
        placeholder="Drag & drop or click to browse (optional)"
        accept="image/*,video/*,application/pdf"
        :required="false"
        :max-size="10 * 1024 * 1024"
        :max-files="10"
        @change="handleFilesChange"
      />
      <p class="text-gray small mt-2">
        <i class="fas fa-info-circle text-orange me-1"></i>
        Photos help us provide a more accurate quote. Include furniture, rooms, and access points.
      </p>
    </div>

    <!-- Description -->
    <div class="mb-4">
      <label class="text-white fw-bold d-block mb-2"> Additional Details </label>
      <textarea
        :value="formData.description"
        @input="updateFormField('description', $event.target.value)"
        class="form-control"
        rows="5"
        placeholder="Tell us more about your move: number of rooms, special items, stairs, parking restrictions, etc. (optional)"
      ></textarea>
      <p class="text-gray small mt-2">
        <i class="fas fa-lightbulb text-orange me-1"></i>
        Include: Number of bedrooms, heavy/fragile items, stairs, elevator access, parking info
      </p>
    </div>

    <!-- How did you hear about us -->
    <div class="mb-4">
      <label class="text-white fw-bold d-block mb-2"> How Did You Hear About Us? </label>
      <select
        :value="formData.hearAboutUs"
        @change="updateFormField('hearAboutUs', $event.target.value)"
        class="form-control"
      >
        <option value="">Select an option (optional)</option>
        <option v-for="source in referralSources" :key="source" :value="source">
          {{ source }}
        </option>
      </select>
    </div>

    <!-- Summary Card -->
    <div class="summary-card">
      <h5 class="text-white mb-3">
        <i class="fas fa-check-circle text-orange me-2"></i>Request Summary
      </h5>

      <div class="summary-section">
        <h6 class="text-orange mb-2">Contact Information</h6>
        <div class="summary-item">
          <span class="summary-label">Name:</span>
          <span class="summary-value">{{ fullName || 'Not provided' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Phone:</span>
          <span class="summary-value">{{ formData.phone || 'Not provided' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Service:</span>
          <span class="summary-value">{{ serviceLabel || 'Not selected' }}</span>
        </div>
      </div>

      <div class="summary-section">
        <h6 class="text-orange mb-2">Moving Details</h6>
        <div class="summary-item">
          <span class="summary-label">From:</span>
          <span class="summary-value">{{ pickupAddress || 'Not provided' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">To:</span>
          <span class="summary-value">{{ dropoffAddress || 'Not provided' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Date:</span>
          <span class="summary-value">{{ formattedDate || 'Not provided' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Time:</span>
          <span class="summary-value">{{ timeLabel || 'Not selected' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '../Shared/FileUpload.vue'

export default {
  name: 'AdditionalInfoTab',
  components: {
    FileUpload,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    uploadedFiles: {
      type: Array,
      default: () => [],
    },
    fieldErrors: {
      type: Object,
      required: true,
    },
    fieldTouched: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:formData', 'update:uploadedFiles', 'update:fieldErrors', 'update:fieldTouched'],
  data() {
    return {
      referralSources: [
        'Google Search',
        'Social Media',
        'Friend or Family',
        'Previous Customer',
        'Advertisement',
        'Real Estate Agent',
        'Other',
      ],
    }
  },
  computed: {
    fullName() {
      if (this.formData.firstName || this.formData.lastName) {
        return `${this.formData.firstName} ${this.formData.lastName}`.trim()
      }
      return ''
    },
    serviceLabel() {
      const serviceMap = {
        packing: 'Packing Only',
        moving: 'Moving Only',
        storage: 'Storage Only',
        'packing-moving': 'Packing & Moving',
        'full-service': 'Full Service (All)',
      }
      return serviceMap[this.formData.helpType] || ''
    },
    pickupAddress() {
      if (this.formData.pickupCity && this.formData.pickupState) {
        return `${this.formData.pickupCity}, ${this.formData.pickupState} ${this.formData.pickupZip || ''}`
      }
      return ''
    },
    dropoffAddress() {
      if (this.formData.dropoffCity && this.formData.dropoffState) {
        return `${this.formData.dropoffCity}, ${this.formData.dropoffState} ${this.formData.dropoffZip || ''}`
      }
      return ''
    },
    formattedDate() {
      if (this.formData.pickupDate) {
        const date = new Date(this.formData.pickupDate + 'T00:00:00')
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }
      return ''
    },
    timeLabel() {
      const timeMap = {
        morning: 'Morning',
        afternoon: 'Afternoon',
      }
      return timeMap[this.formData.pickupTime] || ''
    },
  },
  methods: {
    updateFormField(field, value) {
      const updated = { ...this.formData, [field]: value }
      this.$emit('update:formData', updated)
    },
    handleFilesChange(files) {
      this.$emit('update:uploadedFiles', files)
    },
  },
}
</script>

<style scoped>
.tab-content-wrapper {
  padding: var(--gap-lg);
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

.summary-card {
  background: var(--primary-dark);
  border: 2px solid var(--accent-orange);
  border-radius: var(--radius-lg);
  padding: var(--gap-xl);
  margin-top: var(--gap-xl);
}

.summary-section {
  margin-bottom: var(--gap-lg);
}

.summary-section:last-child {
  margin-bottom: 0;
}

.summary-section h6 {
  font-size: var(--font-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--gap-md);
  padding-bottom: var(--gap-sm);
  border-bottom: 1px solid var(--orange-10);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--gap-md);
  padding: var(--gap-sm) 0;
  border-bottom: 1px solid var(--orange-10);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  color: var(--text-gray);
  font-size: var(--font-sm);
  font-weight: 500;
  min-width: 80px;
}

.summary-value {
  color: var(--text-light);
  font-size: var(--font-sm);
  text-align: right;
  flex: 1;
  font-weight: 600;
}

@media (max-width: 768px) {
  .summary-item {
    flex-direction: column;
    gap: 4px;
  }

  .summary-value {
    text-align: left;
  }
}
</style>
