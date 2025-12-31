<template>
  <div class="careers-form">
    <form @submit.prevent="handleSubmit">
      <div class="row g-3">
        <!-- First Name -->
        <div class="col-md-6">
          <label class="form-label text-white fw-bold">
            First Name <span class="text-orange">*</span>
          </label>
          <input
            v-model="form.firstName"
            type="text"
            class="form-control"
            :class="{ invalid: fieldTouched.firstName && fieldErrors.firstName }"
            placeholder="John"
            @blur="validateField('firstName')"
          />
          <div v-if="fieldTouched.firstName && fieldErrors.firstName" class="field-error">
            {{ fieldErrors.firstName }}
          </div>
        </div>

        <!-- Last Name -->
        <div class="col-md-6">
          <label class="form-label text-white fw-bold">
            Last Name <span class="text-orange">*</span>
          </label>
          <input
            v-model="form.lastName"
            type="text"
            class="form-control"
            :class="{ invalid: fieldTouched.lastName && fieldErrors.lastName }"
            placeholder="Doe"
            @blur="validateField('lastName')"
          />
          <div v-if="fieldTouched.lastName && fieldErrors.lastName" class="field-error">
            {{ fieldErrors.lastName }}
          </div>
        </div>

        <!-- Email -->
        <div class="col-md-6">
          <label class="form-label text-white fw-bold">
            Email Address <span class="text-orange">*</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            :class="{ invalid: fieldTouched.email && fieldErrors.email }"
            placeholder="john.doe@example.com"
            @blur="validateField('email')"
          />
          <div v-if="fieldTouched.email && fieldErrors.email" class="field-error">
            {{ fieldErrors.email }}
          </div>
        </div>

        <!-- Phone -->
        <div class="col-md-6">
          <label class="form-label text-white fw-bold">
            Phone Number <span class="text-orange">*</span>
          </label>
          <input
            v-model="form.phone"
            type="tel"
            class="form-control"
            :class="{ invalid: fieldTouched.phone && fieldErrors.phone }"
            placeholder="(555) 123-4567"
            @input="handlePhoneInput"
            @blur="validateField('phone')"
          />
          <div v-if="fieldTouched.phone && fieldErrors.phone" class="field-error">
            {{ fieldErrors.phone }}
          </div>
        </div>

        <!-- Position -->
        <div class="col-md-6">
          <label class="form-label text-white fw-bold">
            Position Applied For <span class="text-orange">*</span>
          </label>
          <select
            v-model="form.position"
            class="form-control form-select"
            :class="{ invalid: fieldTouched.position && fieldErrors.position }"
            @blur="validateField('position')"
          >
            <option value="">Select a position...</option>
            <option value="Mover / Hauler / Driver">Mover / Hauler / Driver</option>
            <option value="Mover with Truck">Mover with Truck</option>
            <option value="Lead Mover / Crew Lead">Lead Mover / Crew Lead</option>
            <option value="Dispatcher / Scheduler">Dispatcher / Scheduler</option>
            <option value="Operations Manager">Operations Manager</option>
            <option value="Demolition Technician">Demolition Technician</option>
            <option value="Customer Service Representative">Customer Service Representative</option>
            <option value="Sales Representative">Sales Representative</option>
            <option value="Regional On-Site Moving Manager">Regional On-Site Moving Manager</option>
            <option value="Marketing Manager">Marketing Manager</option>
            <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
            <option value="Internship (Summer)">Internship (Summer)</option>
          </select>
          <div v-if="fieldTouched.position && fieldErrors.position" class="field-error">
            {{ fieldErrors.position }}
          </div>
        </div>

        <!-- Years of Experience -->
        <div class="col-md-6">
          <label class="form-label text-white fw-bold">Years of Experience</label>
          <select v-model="form.experience" class="form-control form-select">
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
          <label class="form-label text-white fw-bold">Availability</label>
          <select v-model="form.availability" class="form-control form-select">
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
          <label class="form-label text-white fw-bold">Cover Letter / Additional Information</label>
          <textarea
            v-model="form.message"
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
                v-model="form.agreeToPolicy"
                id="agreeToPolicyCareers"
                @change="clearFieldError('agreeToPolicy')"
              />
              <label class="form-check-label text-white" for="agreeToPolicyCareers">
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

        <!-- Submit Button -->
        <div class="col-12">
          <button type="submit" class="btn btn-primary btn-lg w-100" :disabled="isSubmitting">
            <span v-if="!isSubmitting">
              <i class="fas fa-paper-plane me-2"></i>Submit Application
            </span>
            <span v-else> <i class="fas fa-spinner fa-spin me-2"></i>Submitting... </span>
          </button>
        </div>
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
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        availability: '',
        message: '',
        agreeToPolicy: false,
      },
      uploadedFiles: [],
      fieldErrors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        resume: '',
        agreeToPolicy: '',
      },
      fieldTouched: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        position: false,
        agreeToPolicy: false,
      },
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false,
    }
  },
  methods: {
    handlePhoneInput() {
      this.form.phone = validators.phone.format(this.form.phone)
      this.clearFieldError('phone')
    },
    clearFieldError(field) {
      if (this.fieldErrors[field]) {
        this.fieldErrors[field] = ''
      }
    },
    validateField(field) {
      this.fieldTouched[field] = true

      switch (field) {
        case 'firstName':
        case 'lastName':
          const nameResult = validators.name.validate(this.form[field])
          this.fieldErrors[field] = nameResult.error
          break
        case 'email':
          const emailResult = validators.email.validate(this.form[field], true)
          this.fieldErrors[field] = emailResult.error
          break
        case 'phone':
          const phoneResult = validators.phone.validate(this.form[field], true)
          this.fieldErrors[field] = phoneResult.error
          break
        case 'position':
          this.fieldErrors[field] = !this.form[field] ? 'Please select a position' : ''
          break
        case 'agreeToPolicy':
          this.fieldErrors[field] = !this.form[field]
            ? 'You must agree to the Privacy Policy and Terms of Service'
            : ''
          break
      }
    },
    validateForm() {
      let isValid = true

      // Mark all fields as touched
      Object.keys(this.fieldTouched).forEach((key) => {
        this.fieldTouched[key] = true
      })

      // Validate first name
      const firstNameResult = validators.name.validate(this.form.firstName)
      this.fieldErrors.firstName = firstNameResult.error
      if (!firstNameResult.valid) isValid = false

      // Validate last name
      const lastNameResult = validators.name.validate(this.form.lastName)
      this.fieldErrors.lastName = lastNameResult.error
      if (!lastNameResult.valid) isValid = false

      // Validate email
      const emailResult = validators.email.validate(this.form.email, true)
      this.fieldErrors.email = emailResult.error
      if (!emailResult.valid) isValid = false

      // Validate phone
      const phoneResult = validators.phone.validate(this.form.phone, true)
      this.fieldErrors.phone = phoneResult.error
      if (!phoneResult.valid) isValid = false

      // Validate position
      if (!this.form.position) {
        this.fieldErrors.position = 'Please select a position'
        isValid = false
      } else {
        this.fieldErrors.position = ''
      }

      // Validate resume upload
      if (this.uploadedFiles.length === 0) {
        this.fieldErrors.resume = 'Please upload your resume'
        isValid = false
      } else {
        this.fieldErrors.resume = ''
      }

      // Validate policy agreement
      if (!this.form.agreeToPolicy) {
        this.fieldErrors.agreeToPolicy = 'You must agree to the Privacy Policy and Terms of Service'
        isValid = false
      } else {
        this.fieldErrors.agreeToPolicy = ''
      }

      if (!isValid) {
        const firstError = document.querySelector('.field-error')
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }

      return isValid
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        this.submitSuccess = false
        this.submitMessage = 'Please fix the errors before submitting'
        setTimeout(() => {
          this.submitMessage = ''
        }, 5000)
        return
      }

      if (this.isSubmitting) return

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        const formDataToSend = new FormData()
        formDataToSend.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
        formDataToSend.append('form', 'Careers')
        formDataToSend.append('first_name', this.form.firstName)
        formDataToSend.append('last_name', this.form.lastName)
        formDataToSend.append('email', this.form.email)
        formDataToSend.append('phone', this.form.phone)
        formDataToSend.append('position', this.form.position)
        formDataToSend.append('experience', this.form.experience)
        formDataToSend.append('availability', this.form.availability)
        formDataToSend.append('message', this.form.message)

        this.uploadedFiles.forEach((file, index) => {
          formDataToSend.append(`resume_${index}`, file)
        })

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formDataToSend,
        })

        const data = await response.json()

        if (data.success) {
          this.submitSuccess = true
          this.submitMessage =
            'Thank you for your application! We will review it and get back to you within 48 hours.'

          setTimeout(() => {
            this.form = {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              position: '',
              experience: '',
              availability: '',
              message: '',
              agreeToPolicy: false,
            }
            this.uploadedFiles = []
            this.fieldErrors = {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              position: '',
              resume: '',
              agreeToPolicy: '',
            }
            this.fieldTouched = {
              firstName: false,
              lastName: false,
              email: false,
              phone: false,
              position: false,
              agreeToPolicy: false,
            }
            this.submitMessage = ''
            this.submitSuccess = false
          }, 5000)
        } else {
          this.submitSuccess = false
          this.submitMessage =
            'Something went wrong. Please try again or call us at (800) 889-9788.'
        }
      } catch (error) {
        this.submitSuccess = false
        this.submitMessage = 'Network error. Please check your connection and try again.'
      } finally {
        this.isSubmitting = false
      }
    },
    handleFilesChange(files) {
      this.uploadedFiles = files
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

.text-gray {
  color: rgba(255, 255, 255, 0.7);
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

/* Responsive */
@media (max-width: 768px) {
  .btn-primary {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}
</style>
