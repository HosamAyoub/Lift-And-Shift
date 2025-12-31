<template>
  <div class="tab-content-wrapper">
    <h4 class="text-white mb-2">Additional Information</h4>
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

    <!-- Policy Agreement -->
    <div class="mb-4">
      <div class="policy-agreement">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :checked="formData.agreeToPolicy"
            @change="updateFormField('agreeToPolicy', $event.target.checked)"
            id="agreeToPolicyMoving"
          />
          <label class="form-check-label text-white" for="agreeToPolicyMoving">
            I agree to the Lift & Shift
            <router-link to="/privacy" class="text-orange" target="_blank"
              >Privacy Policy</router-link
            >
            and
            <router-link to="/terms" class="text-orange" target="_blank"
              >Terms & Conditions</router-link
            >
            <span class="text-orange">*</span>
          </label>
        </div>
        <div v-if="fieldTouched.agreeToPolicy && fieldErrors.agreeToPolicy" class="field-error">
          {{ fieldErrors.agreeToPolicy }}
        </div>
      </div>
    </div>

    <!-- Summary Card -->
    <div class="summary-card">
      <h5 class="text-white mb-2">
        <i class="fas fa-file-alt text-orange me-2"></i>Request Summary
      </h5>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-label">Name</div>
          <div class="summary-value">{{ fullName || 'Not provided' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Phone</div>
          <div class="summary-value">{{ formData.phone || 'Not provided' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Email</div>
          <div class="summary-value">{{ formData.email || 'Not provided' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Service Type</div>
          <div class="summary-value">{{ serviceLabel || 'Not selected' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Pickup Location</div>
          <div class="summary-value">{{ pickupAddress || 'Not provided' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Delivery Location</div>
          <div class="summary-value">{{ dropoffAddress || 'Not provided' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Pickup Date</div>
          <div class="summary-value">{{ formattedDate || 'Not selected' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Pickup Time</div>
          <div class="summary-value">{{ timeLabel || 'Not selected' }}</div>
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
        morning: 'Morning (8AM-12PM)',
        midday: 'Mid-day (12PM-3PM)',
        afternoon: 'Afternoon (3PM-6PM)',
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

.policy-agreement {
  padding: var(--gap-md) 0;
}

.policy-agreement .form-check {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
}

.policy-agreement .form-check-input {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  flex-shrink: 0;
}

.policy-agreement .form-check-label {
  cursor: pointer;
  font-weight: 600;
  margin: 0;
}

.summary-card {
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  padding: var(--gap-lg);
  margin-top: var(--gap-lg);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--gap-md);
}

.summary-item {
  padding: var(--gap-ssm);
}

.summary-label {
  color: var(--text-gray);
  font-size: var(--font-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--gap-sm);
}

.summary-value {
  color: var(--text-light);
  font-weight: 600;
  font-size: var(--font-sm);
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
