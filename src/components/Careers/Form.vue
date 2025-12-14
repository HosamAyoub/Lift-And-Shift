<template>
  <div class="careers-form">
    <form @submit.prevent="handleSubmit">
      <div class="row g-4">
        <!-- First Name -->
        <div class="col-md-6">
          <label class="form-label fw-bold"> First Name <span class="text-orange">*</span> </label>
          <input
            type="text"
            :value="formData.firstName"
            @input="updateFormField('firstName', $event.target.value)"
            @blur="handleBlur('firstName')"
            class="form-control"
            :class="{ invalid: fieldTouched.firstName && fieldErrors.firstName }"
            placeholder="John"
          />
          <div v-if="fieldTouched.firstName && fieldErrors.firstName" class="field-error">
            {{ fieldErrors.firstName }}
          </div>
        </div>

        <!-- Last Name -->
        <div class="col-md-6">
          <label class="form-label fw-bold"> Last Name <span class="text-orange">*</span> </label>
          <input
            type="text"
            :value="formData.lastName"
            @input="updateFormField('lastName', $event.target.value)"
            @blur="handleBlur('lastName')"
            class="form-control"
            :class="{ invalid: fieldTouched.lastName && fieldErrors.lastName }"
            placeholder="Doe"
          />
          <div v-if="fieldTouched.lastName && fieldErrors.lastName" class="field-error">
            {{ fieldErrors.lastName }}
          </div>
        </div>

        <!-- Email -->
        <div class="col-md-6">
          <label class="form-label fw-bold">
            Email Address <span class="text-orange">*</span>
          </label>
          <input
            type="email"
            :value="formData.email"
            @input="updateFormField('email', $event.target.value)"
            @blur="handleBlur('email')"
            class="form-control"
            :class="{ invalid: fieldTouched.email && fieldErrors.email }"
            placeholder="john.doe@example.com"
          />
          <div v-if="fieldTouched.email && fieldErrors.email" class="field-error">
            {{ fieldErrors.email }}
          </div>
        </div>

        <!-- Phone -->
        <div class="col-md-6">
          <label class="form-label fw-bold">
            Phone Number <span class="text-orange">*</span>
          </label>
          <input
            type="tel"
            :value="formData.phone"
            @input="handlePhoneInput($event.target.value)"
            @blur="handleBlur('phone')"
            class="form-control"
            :class="{ invalid: fieldTouched.phone && fieldErrors.phone }"
            placeholder="(555) 123-4567"
          />
          <div v-if="fieldTouched.phone && fieldErrors.phone" class="field-error">
            {{ fieldErrors.phone }}
          </div>
        </div>

        <!-- Position -->
        <div class="col-md-6">
          <label class="form-label fw-bold">
            Position Applied For <span class="text-orange">*</span>
          </label>
          <select
            :value="formData.position"
            @change="updateFormField('position', $event.target.value)"
            @blur="handleBlur('position')"
            class="form-control form-select"
            :class="{ invalid: fieldTouched.position && fieldErrors.position }"
          >
            <option value="">Select a position...</option>
            <option value="mover">Mover</option>
            <option value="driver">Driver</option>
            <option value="packer">Packer</option>
            <option value="warehouse">Warehouse Associate</option>
            <option value="supervisor">Team Supervisor</option>
            <option value="customer-service">Customer Service</option>
            <option value="office">Office Administrator</option>
            <option value="other">Other</option>
          </select>
          <div v-if="fieldTouched.position && fieldErrors.position" class="field-error">
            {{ fieldErrors.position }}
          </div>
        </div>

        <!-- Years of Experience -->
        <div class="col-md-6">
          <label class="form-label fw-bold">Years of Experience</label>
          <select
            :value="formData.experience"
            @change="updateFormField('experience', $event.target.value)"
            class="form-control form-select"
          >
            <option value="">Select experience...</option>
            <option value="0-1">Less than 1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <!-- Availability -->
        <div class="col-12">
          <label class="form-label fw-bold">Availability</label>
          <select
            :value="formData.availability"
            @change="updateFormField('availability', $event.target.value)"
            class="form-control form-select"
          >
            <option value="">Select availability...</option>
            <option value="immediate">Immediate</option>
            <option value="2-weeks">2 weeks notice</option>
            <option value="1-month">1 month</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <!-- Resume Upload -->
        <div class="col-12">
          <FileUpload
            :modelValue="uploadedFiles"
            label="Upload Resume/CV"
            name="resume"
            placeholder="Drag & drop your resume or click to browse"
            accept="application/pdf"
            :required="true"
            :maxSize="10 * 1024 * 1024"
            :maxFiles="1"
            :multiple="false"
            @change="handleFilesChange"
          />
          <p class="text-gray small mt-2">
            <i class="fas fa-info-circle text-orange me-1"></i>
            PDF format only, maximum file size 10MB
          </p>
          <div v-if="fieldErrors.resume" class="field-error mt-2">
            {{ fieldErrors.resume }}
          </div>
        </div>

        <!-- Additional Message -->
        <div class="col-12">
          <label class="form-label fw-bold">Cover Letter / Additional Information</label>
          <textarea
            :value="formData.message"
            @input="updateFormField('message', $event.target.value)"
            class="form-control"
            rows="5"
            placeholder="Tell us why you'd be a great fit for our team..."
          ></textarea>
        </div>

        <!-- Policy Agreement -->
        <div class="col-12">
          <div class="policy-agreement">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :checked="formData.agreeToPolicy"
                @change="updateFormField('agreeToPolicy', $event.target.checked)"
                id="agreeToPolicyCareers"
              />
              <label class="form-check-label text-white" for="agreeToPolicyCareers">
                I agree to the Lift & Shift Privacy Policy and Terms of Service
                <span class="text-orange">*</span>
              </label>
            </div>
            <div v-if="fieldTouched.agreeToPolicy && fieldErrors.agreeToPolicy" class="field-error">
              {{ fieldErrors.agreeToPolicy }}
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="d-flex justify-content-end mt-4">
        <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
          <i v-if="!isSubmitting" class="fas fa-paper-plane me-2"></i>
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
          {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
        </button>
      </div>

      <!-- Success/Error Messages -->
      <div
        v-if="submitMessage"
        class="mt-4 p-3 rounded"
        :class="
          submitSuccess
            ? 'bg-success bg-opacity-10 border border-success'
            : 'bg-danger bg-opacity-10 border border-danger'
        "
      >
        <p class="mb-0" :class="submitSuccess ? 'text-success' : 'text-danger'">
          <i :class="submitSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
          {{ submitMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import FileUpload from '../Shared/FileUpload.vue'
import { validators } from '../../utils/validators.js'

export default {
  name: 'CareersForm',
  components: {
    FileUpload,
  },
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
    uploadedFiles: {
      type: Array,
      required: true,
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
    submitMessage: {
      type: String,
      default: '',
    },
    submitSuccess: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:formData',
    'update:fieldErrors',
    'update:fieldTouched',
    'update:uploadedFiles',
    'submit',
    'validation-failed',
  ],
  methods: {
    updateFormField(field, value) {
      this.$emit('update:formData', { ...this.formData, [field]: value })
      this.clearFieldError(field)
    },
    handlePhoneInput(value) {
      const formatted = validators.phone.format(value)
      this.$emit('update:formData', { ...this.formData, phone: formatted })
      this.clearFieldError('phone')
    },
    handleBlur(field) {
      const touched = { ...this.fieldTouched, [field]: true }
      this.$emit('update:fieldTouched', touched)
      this.validateField(field)
    },
    clearFieldError(field) {
      if (this.fieldErrors[field]) {
        this.$emit('update:fieldErrors', { ...this.fieldErrors, [field]: '' })
      }
    },
    validateField(field) {
      const errors = { ...this.fieldErrors }

      switch (field) {
        case 'firstName':
        case 'lastName':
          const nameResult = validators.name.validate(this.formData[field])
          errors[field] = nameResult.error
          break
        case 'email':
          const emailResult = validators.email.validate(this.formData[field], true)
          errors[field] = emailResult.error
          break
        case 'phone':
          const phoneResult = validators.phone.validate(this.formData[field], true)
          errors[field] = phoneResult.error
          break
        case 'position':
          errors[field] = !this.formData[field] ? 'Please select a position' : ''
          break
      }

      this.$emit('update:fieldErrors', errors)
    },
    validateForm() {
      let isValid = true
      const errors = { ...this.fieldErrors }
      const touched = { ...this.fieldTouched }

      // Validate first name
      touched.firstName = true
      const firstNameResult = validators.name.validate(this.formData.firstName)
      errors.firstName = firstNameResult.error
      if (!firstNameResult.valid) isValid = false

      // Validate last name
      touched.lastName = true
      const lastNameResult = validators.name.validate(this.formData.lastName)
      errors.lastName = lastNameResult.error
      if (!lastNameResult.valid) isValid = false

      // Validate email
      touched.email = true
      const emailResult = validators.email.validate(this.formData.email, true)
      errors.email = emailResult.error
      if (!emailResult.valid) isValid = false

      // Validate phone
      touched.phone = true
      const phoneResult = validators.phone.validate(this.formData.phone, true)
      errors.phone = phoneResult.error
      if (!phoneResult.valid) isValid = false

      // Validate position
      touched.position = true
      if (!this.formData.position) {
        errors.position = 'Please select a position'
        isValid = false
      } else {
        errors.position = ''
      }

      // Validate resume upload
      if (this.uploadedFiles.length === 0) {
        errors.resume = 'Please upload your resume'
        isValid = false
      } else {
        errors.resume = ''
      }

      // Validate policy agreement
      touched.agreeToPolicy = true
      if (!this.formData.agreeToPolicy) {
        errors.agreeToPolicy = 'You must agree to the Privacy Policy and Terms of Service'
        isValid = false
      } else {
        errors.agreeToPolicy = ''
      }

      this.$emit('update:fieldErrors', errors)
      this.$emit('update:fieldTouched', touched)

      return isValid
    },
    handleSubmit() {
      if (this.validateForm()) {
        this.$emit('submit')
      } else {
        // Emit validation failed event
        this.$emit('validation-failed')
        // Only scroll when validation fails to show errors
        const firstError = document.querySelector('.field-error')
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    },
    handleFilesChange(files) {
      this.$emit('update:uploadedFiles', files)
      // Clear resume error when files are uploaded
      if (files.length > 0) {
        this.clearFieldError('resume')
      }
    },
  },
}
</script>

<style scoped>
.careers-form {
  width: 100%;
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

/* Success/Error message styling */
.bg-success {
  background-color: rgba(16, 185, 129, 0.1) !important;
}

.bg-danger {
  background-color: rgba(239, 68, 68, 0.1) !important;
}

.border-success {
  border-color: rgba(16, 185, 129, 0.3) !important;
}

.border-danger {
  border-color: rgba(239, 68, 68, 0.3) !important;
}

.text-success {
  color: #10b981 !important;
}

.text-danger {
  color: var(--accent-red) !important;
}

.spinner-border {
  width: 1rem;
  height: 1rem;
  border-width: 0.15em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Form Inputs use global styles */

.form-select option {
  background: var(--secondary-dark);
  color: white;
}

.form-control.invalid,
.form-select.invalid {
  border-color: var(--accent-red);
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.form-label {
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.field-error {
  color: var(--accent-red);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  animation: fadeInUp 0.3s ease;
}

.field-error::before {
  content: '⚠';
  font-size: 1rem;
}

/* Submit Button */
.btn-primary {
  background: var(--accent-orange);
  border: none;
  padding: 1rem 3rem;
  font-size: 1rem;
  font-weight: 600;
  transition: var(--transition-base);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--accent-orange-light);
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

textarea.form-control {
  min-height: 120px;
  resize: vertical;
}

/* Responsive */
@media (max-width: 768px) {
  .btn-primary {
    width: 100%;
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}
</style>
