<template>
  <div class="tab-content">
    <h4 class="mb-4 text-white">Storage Duration & Details</h4>

    <!-- Duration Selection -->
    <div class="mb-4">
      <label class="form-label">Storage Duration (Months) *</label>
      <input
        type="number"
        v-model.number="localFormData.storageDuration"
        class="form-control"
        :class="{
          'is-invalid': localFieldErrors.storageDuration && localFieldTouched.storageDuration,
        }"
        @blur="validateField('storageDuration')"
        @input="clearFieldError('storageDuration')"
        placeholder="Enter number of months"
        min="4"
      />
      <small class="form-text text-gray">Minimum 4 months required</small>
      <div class="invalid-feedback" v-if="localFieldTouched.storageDuration">
        {{ localFieldErrors.storageDuration }}
      </div>
    </div>

    <!-- Move-In Date -->
    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label class="form-label">Move-In Date *</label>
        <input
          type="date"
          v-model="localFormData.moveInDate"
          class="form-control"
          :class="{ 'is-invalid': localFieldErrors.moveInDate && localFieldTouched.moveInDate }"
          @blur="validateField('moveInDate')"
          @change="clearFieldError('moveInDate')"
          :min="minDate"
        />
        <div class="invalid-feedback" v-if="localFieldTouched.moveInDate">
          {{ localFieldErrors.moveInDate }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Preferred Move-In Time</label>
        <select v-model="localFormData.moveInTime" class="form-control">
          <option value="">Select time...</option>
          <option value="morning">Morning (8AM-12PM)</option>
          <option value="afternoon">Afternoon (12PM-5PM)</option>
          <option value="evening">Evening (5PM-8PM)</option>
        </select>
      </div>
    </div>

    <!-- Unit Size -->
    <div class="mb-4">
      <label class="form-label">Unit Size Needed *</label>
      <select
        v-model="localFormData.unitSize"
        class="form-control"
        :class="{ 'is-invalid': localFieldErrors.unitSize && localFieldTouched.unitSize }"
        @blur="validateField('unitSize')"
        @change="clearFieldError('unitSize')"
      >
        <option value="">Select size...</option>
        <option value="small">Small (5x5 - 5x10)</option>
        <option value="medium">Medium (10x10 - 10x15)</option>
        <option value="large">Large (10x20 - 10x30)</option>
        <option value="extra-large">Extra Large (20x20+)</option>
      </select>
      <div class="invalid-feedback" v-if="localFieldTouched.unitSize">
        {{ localFieldErrors.unitSize }}
      </div>
    </div>

    <!-- Climate Control -->
    <div class="mb-4">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="localFormData.climateControl"
          id="climateControl"
        />
        <label class="form-check-label" for="climateControl">
          I need climate-controlled storage (+$25/month)
        </label>
      </div>
    </div>

    <!-- Additional Notes -->
    <div class="mb-4">
      <label class="form-label">What are you storing?</label>
      <textarea
        v-model="localFormData.notes"
        class="form-control"
        rows="4"
        placeholder="Tell us about what you're storing (furniture, boxes, vehicles, etc.) and any special requirements..."
      ></textarea>
    </div>
  </div>
</template>

<script>
import { validators } from '../../utils/validators.js'

export default {
  name: 'StorageDurationTab',
  props: {
    formData: {
      type: Object,
      required: true,
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
  computed: {
    localFormData: {
      get() {
        return this.formData
      },
      set(value) {
        this.$emit('update:formData', value)
      },
    },
    localFieldErrors: {
      get() {
        return this.fieldErrors
      },
      set(value) {
        this.$emit('update:fieldErrors', value)
      },
    },
    localFieldTouched: {
      get() {
        return this.fieldTouched
      },
      set(value) {
        this.$emit('update:fieldTouched', value)
      },
    },
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
  },
  methods: {
    validateField(fieldName) {
      const touched = { ...this.localFieldTouched }
      const errors = { ...this.localFieldErrors }
      touched[fieldName] = true

      if (fieldName === 'storageDuration') {
        if (!this.localFormData.storageDuration) {
          errors.storageDuration = 'Storage duration is required'
        } else if (this.localFormData.storageDuration < 4) {
          errors.storageDuration = 'Minimum 4 months required'
        } else {
          errors.storageDuration = ''
        }
        this.$emit('update:fieldTouched', touched)
        this.$emit('update:fieldErrors', errors)
        return !errors.storageDuration
      }

      if (fieldName === 'unitSize') {
        if (!this.localFormData.unitSize) {
          errors.unitSize = 'Please select a unit size'
        } else {
          errors.unitSize = ''
        }
        this.$emit('update:fieldTouched', touched)
        this.$emit('update:fieldErrors', errors)
        return !errors.unitSize
      }

      if (fieldName === 'moveInDate') {
        if (!this.localFormData.moveInDate) {
          errors.moveInDate = 'Move-in date is required'
        } else {
          errors.moveInDate = ''
        }
        this.$emit('update:fieldTouched', touched)
        this.$emit('update:fieldErrors', errors)
        return !errors.moveInDate
      }

      return true
    },
    clearFieldError(fieldName) {
      const errors = { ...this.localFieldErrors }
      errors[fieldName] = ''
      this.$emit('update:fieldErrors', errors)
    },
    updateFormField(field, value) {
      const updated = { ...this.localFormData }
      updated[field] = value
      this.$emit('update:formData', updated)
    },
  },
}
</script>

<style scoped>
.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-label {
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-text {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.form-control {
  background: var(--primary-dark) !important;
  border: 1px solid var(--orange-10) !important;
  color: var(--text-light) !important;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: var(--accent-orange) !important;
  box-shadow: 0 0 0 0.2rem var(--orange-20) !important;
}

.form-control::placeholder {
  color: var(--text-gray) !important;
}

.form-check-input {
  background-color: var(--primary-dark);
  border-color: var(--orange-10);
  margin-top: 0.25rem;
}

.form-check-input:checked {
  background-color: var(--accent-orange);
  border-color: var(--accent-orange);
}

.form-check-label {
  color: var(--text-light);
  margin-left: 0.5rem;
}

.invalid-feedback {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}

.form-control.is-invalid {
  border-color: #dc3545 !important;
}
</style>
