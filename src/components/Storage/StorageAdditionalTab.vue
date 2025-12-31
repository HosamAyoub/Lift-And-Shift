<template>
  <div class="tab-content-wrapper">
    <h4 class="text-white mb-2">Additional Information</h4>
    <p class="text-gray small mb-4">Help us prepare the perfect storage solution for your needs.</p>

    <!-- Photo Upload -->
    <div class="mb-4">
      <FileUpload
        :model-value="uploadedFiles"
        label="Upload Photos"
        name="storage_photos"
        placeholder="Drag & drop or click to browse (optional)"
        accept="image/*,video/*,application/pdf"
        :required="false"
        :max-size="10 * 1024 * 1024"
        :max-files="10"
        @change="handleFilesChange"
      />
      <p class="text-gray small mt-2">
        <i class="fas fa-info-circle text-orange me-1"></i>
        Photos help us provide accurate recommendations. Include items you're storing, their
        condition, and special requirements.
      </p>
    </div>

    <!-- What are you storing -->
    <div class="mb-4">
      <label class="text-white fw-bold d-block mb-2">What are you storing?</label>
      <textarea
        :value="formData.notes"
        @input="updateFormField('notes', $event.target.value)"
        class="form-control"
        rows="5"
        placeholder="Tell us about what you're storing: furniture, boxes, vehicles, business inventory, etc. Include any special requirements or concerns..."
      ></textarea>
      <p class="text-gray small mt-2">
        <i class="fas fa-lightbulb text-orange me-1"></i>
        Include details like: type of items, quantity, any fragile or valuable items, special
        handling needs
      </p>
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
            id="agreeToPolicyStorage"
          />
          <label class="form-check-label text-white" for="agreeToPolicyStorage">
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
      <h5 class="text-white mb-3">
        <i class="fas fa-file-alt text-orange me-2"></i>Storage Reservation Summary
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
          <div class="summary-label">Pickup Location</div>
          <div class="summary-value">{{ pickupAddress || 'Not provided' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Delivery Location</div>
          <div class="summary-value">{{ dropoffAddress || 'Not provided' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Move-In Time</div>
          <div class="summary-value">{{ timeLabel }}</div>
          <div class="summary-value">{{ formattedDate || 'Not selected' }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Duration</div>
          <div class="summary-value">
            {{ formData.storageDuration ? `${formData.storageDuration} months` : 'Not specified' }}
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Number Of Boxes</div>
          <div class="summary-value">{{ numberOfBoxes || '' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '../Shared/FileUpload.vue'

export default {
  name: 'StorageAdditionalTab',
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
  computed: {
    fullName() {
      if (this.formData.firstName || this.formData.lastName) {
        return `${this.formData.firstName} ${this.formData.lastName}`.trim()
      }
      return ''
    },
    pickupAddress() {
      const parts = []
      if (this.formData.pickupStreet) parts.push(this.formData.pickupStreet)
      if (this.formData.pickupCity) parts.push(this.formData.pickupCity)
      if (this.formData.pickupState) parts.push(this.formData.pickupState)
      if (this.formData.pickupZip) parts.push(this.formData.pickupZip)
      return parts.join(', ')
    },
    dropoffAddress() {
      const parts = []
      if (this.formData.dropoffStreet) parts.push(this.formData.dropoffStreet)
      if (this.formData.dropoffCity) parts.push(this.formData.dropoffCity)
      if (this.formData.dropoffState) parts.push(this.formData.dropoffState)
      if (this.formData.dropoffZip) parts.push(this.formData.dropoffZip)
      return parts.join(', ')
    },
    formattedDate() {
      if (this.formData.moveInDate) {
        const date = new Date(this.formData.moveInDate + 'T00:00:00')
        return date.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      }
      return ''
    },
    timeLabel() {
      const timeMap = {
        morning: 'Morning (8AM-12PM)',
        afternoon: 'Afternoon (12PM-5PM)',
        evening: 'Evening (5PM-8PM)',
      }
      return timeMap[this.formData.moveInTime] || ''
    },
    numberOfBoxes() {
      let number
      if (this.formData.numberOfBoxes) number = this.formData.numberOfBoxes
      return number
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
  padding: var(--gap-sm);
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
