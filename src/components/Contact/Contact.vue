<template>
  <div style="background-color: var(--bg-dark); padding: 50px">
    <div class="container">
      <h1 style="color: white; margin-bottom: 30px">Contact Us</h1>

      <div class="row g-4">
        <!-- Contact Form -->
        <div class="col-lg-8">
          <div class="card-dark shadow-lg">
            <h3 class="text-white mb-4">Send Us a Message</h3>

            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                <!-- Name -->
                <div class="col-md-6">
                  <label class="form-label text-white fw-bold"
                    >Your Name <span class="text-orange">*</span></label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    :class="{ invalid: fieldTouched.name && fieldErrors.name }"
                    placeholder="John Doe"
                    @blur="validateField('name')"
                  />
                  <div v-if="fieldTouched.name && fieldErrors.name" class="field-error">
                    {{ fieldErrors.name }}
                  </div>
                </div>

                <!-- Email -->
                <div class="col-md-6">
                  <label class="form-label text-white fw-bold"
                    >Email Address <span class="text-orange">*</span></label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    :class="{ invalid: fieldTouched.email && fieldErrors.email }"
                    placeholder="john@example.com"
                    @blur="validateField('email')"
                  />
                  <div v-if="fieldTouched.email && fieldErrors.email" class="field-error">
                    {{ fieldErrors.email }}
                  </div>
                </div>

                <!-- Phone -->
                <div class="col-md-6">
                  <label class="form-label text-white fw-bold"
                    >Phone Number <span class="text-orange">*</span></label
                  >
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

                <!-- Service Type -->
                <div class="col-md-6">
                  <label class="form-label text-white fw-bold"
                    >Reason for contact <span class="text-orange">*</span></label
                  >
                  <select v-model="form.service" class="form-control">
                    <option value="">Select reason</option>
                    <option value="moving">Moving</option>
                    <option value="hauling">Hauling Removal</option>
                    <option value="storage">Storage</option>
                    <option value="demolition">Demolition</option>
                    <option value="damage claim">Damage claim</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Message -->
                <div class="col-12">
                  <label class="form-label text-white fw-bold"
                    >Your Message <span class="text-orange">*</span></label
                  >
                  <textarea
                    v-model="form.message"
                    class="form-control"
                    :class="{ invalid: fieldTouched.message && fieldErrors.message }"
                    rows="6"
                    placeholder="Tell us about your project or question..."
                    @blur="validateField('message')"
                  ></textarea>
                  <div v-if="fieldTouched.message && fieldErrors.message" class="field-error">
                    {{ fieldErrors.message }}
                  </div>
                </div>

                <!-- Policy Agreement -->
                <div class="col-12">
                  <div class="policy-agreement">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="form.agreeToPolicy"
                        id="agreeToPolicyContact"
                        @change="clearFieldError('agreeToPolicy')"
                      />
                      <label class="form-check-label text-white" for="agreeToPolicyContact">
                        I agree to the Lift & Shift Privacy Policy and Terms of Service
                        <span class="text-orange">*</span>
                      </label>
                    </div>
                    <div
                      v-if="fieldTouched.agreeToPolicy && fieldErrors.agreeToPolicy"
                      class="field-error"
                    >
                      {{ fieldErrors.agreeToPolicy }}
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="col-12">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg w-100"
                    :disabled="isSubmitting"
                  >
                    <span v-if="!isSubmitting">
                      <i class="fas fa-paper-plane me-2"></i>Send Message
                    </span>
                    <span v-else> <i class="fas fa-spinner fa-spin me-2"></i>Sending... </span>
                  </button>
                </div>
              </div>
            </form>

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
          </div>
        </div>

        <!-- Contact Info Sidebar -->
        <div class="col-lg-4">
          <div class="card-dark shadow-lg mb-4">
            <h4 class="text-white mb-4">Contact Information</h4>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div>
                <h6 class="text-white mb-1">Phone</h6>
                <a href="tel:+18008899788" class="text-orange">(800) 889-9788</a>
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div>
                <h6 class="text-white mb-1">Email</h6>
                <a href="mailto:contact@liftshiftservices.com" class="text-orange"
                  >contact@liftshiftservices.com</a
                >
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h6 class="text-white mb-1">Service Area</h6>
                <p class="text-gray mb-0">Dallas-Fort Worth Metroplex</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div>
                <h6 class="text-white mb-1">Hours</h6>
                <p class="text-gray mb-0">Mon - Sat: 8am - 6pm<br /></p>
              </div>
            </div>
          </div>

          <!-- Quick Response -->
          <div class="card-dark shadow-lg">
            <div class="text-center">
              <div class="quick-response-icon mb-3">
                <i class="fas fa-bolt"></i>
              </div>
              <h5 class="text-white mb-2">Quick Response</h5>
              <p class="text-gray mb-0">
                We typically respond within 2-4 hours during business hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validators } from '../../utils/validators.js'

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        agreeToPolicy: false,
      },
      fieldErrors: {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        agreeToPolicy: '',
      },
      fieldTouched: {
        name: false,
        email: false,
        phone: false,
        service: false,
        message: false,
        agreeToPolicy: false,
      },
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false,
    }
  },
  methods: {
    validateField(field) {
      this.fieldTouched[field] = true

      switch (field) {
        case 'name':
          if (!this.form.name || this.form.name.trim().length < 2) {
            this.fieldErrors.name = 'Please enter your full name'
          } else {
            this.fieldErrors.name = ''
          }
          break
        case 'email':
          const emailResult = validators.email.validate(this.form.email, true)
          this.fieldErrors.email = emailResult.error
          break
        case 'phone':
          const phoneResult = validators.phone.validate(this.form.phone, true)
          this.fieldErrors.phone = phoneResult.error
          break
        case 'service':
          if (!this.form.service) {
            this.fieldErrors.service = 'Please select a service'
          } else {
            this.fieldErrors.service = ''
          }
          break
        case 'message':
          if (!this.form.message || this.form.message.trim().length < 10) {
            this.fieldErrors.message = 'Please enter a message (at least 10 characters)'
          } else {
            this.fieldErrors.message = ''
          }
          break
      }
    },
    clearFieldError(field) {
      this.fieldErrors[field] = ''
    },
    handlePhoneInput() {
      this.form.phone = validators.phone.format(this.form.phone)
      this.clearFieldError('phone')
    },
    validateAllFields() {
      let isValid = true

      // Validate name
      this.fieldTouched.name = true
      if (!this.form.name || this.form.name.trim().length < 2) {
        this.fieldErrors.name = 'Please enter your full name'
        isValid = false
      }

      // Validate email
      this.fieldTouched.email = true
      const emailResult = validators.email.validate(this.form.email, true)
      this.fieldErrors.email = emailResult.error
      if (!emailResult.valid) isValid = false

      // Validate phone (required)
      this.fieldTouched.phone = true
      const phoneResult = validators.phone.validate(this.form.phone, true)
      this.fieldErrors.phone = phoneResult.error
      if (!phoneResult.valid) isValid = false

      // Validate service (required)
      this.fieldTouched.service = true
      if (!this.form.service) {
        this.fieldErrors.service = 'Please select a service'
        isValid = false
      }

      // Validate message
      this.fieldTouched.message = true
      if (!this.form.message || this.form.message.trim().length < 10) {
        this.fieldErrors.message = 'Please enter a message (at least 10 characters)'
        isValid = false
      }

      // Validate policy agreement
      this.fieldTouched.agreeToPolicy = true
      if (!this.form.agreeToPolicy) {
        this.fieldErrors.agreeToPolicy = 'You must agree to the Privacy Policy and Terms of Service'
        isValid = false
      }

      return isValid
    },
    async handleSubmit() {
      if (!this.validateAllFields()) {
        this.submitSuccess = false
        this.submitMessage = 'Please fix the errors before submitting'
        return
      }

      if (this.isSubmitting) return

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        const formData = new FormData()
        formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
        formData.append('form', 'Contact Us')
        formData.append('name', this.form.name)
        formData.append('email', this.form.email)
        formData.append('phone', this.form.phone)
        formData.append('service', this.form.service)
        formData.append('message', this.form.message)

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          this.submitSuccess = true
          this.submitMessage = "Thank you for your message! We'll get back to you within 24 hours."

          setTimeout(() => {
            this.form = {
              name: '',
              email: '',
              phone: '',
              service: '',
              message: '',
              agreeToPolicy: false,
            }
            this.fieldErrors = {
              name: '',
              email: '',
              phone: '',
              service: '',
              message: '',
              agreeToPolicy: '',
            }
            this.fieldTouched = {
              name: false,
              email: false,
              phone: false,
              service: false,
              message: false,
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
  },
}
</script>

<style scoped>
/* Page Header */
.page-header {
  position: relative;
  padding: var(--gap-xxl) 0;
  overflow: hidden;
}

.page-header::before {
} /*cPolicy Agreement */
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
  margin-top: 0;
}

.policy-agreement .form-check-label {
  cursor: pointer;
  font-weight: 600;
  margin: 0;
  line-height: 1.25rem;
}

/* Field Errors */
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Success/Error Messages */
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

/* ontent: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--orange-10) 20%,
    var(--orange-20) 50%,
    var(--orange-10) 80%,
    transparent 100%
  );
  transform: translateY(-50%);
  z-index: 0;
}

.header-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--gap-xl);
  z-index: 1;
}

.header-badge {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--text-light);
  box-shadow: 0 10px 30px var(--orange-40);
  animation: float 3s ease-in-out infinite;
}

.header-text {
  flex: 1;
}

.display-4 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  position: relative;
}

.display-4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--accent-orange);
  border-radius: var(--radius-sm);
}

.lead {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-top: var(--gap-lg);
}

.header-decoration {
  position: absolute;
  top: 0;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--orange-10) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Form Styles */
h3,
h4,
h5,
h6 {
  font-weight: 700;
}

.form-label {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

textarea.form-control {
  resize: vertical;
}

/* Contact Items */
.contact-item {
  display: flex;
  gap: var(--gap-lg);
  align-items: flex-start;
}

.policy-agreement .form-check-label {
  cursor: pointer;
  font-weight: 600;
  margin: 0;
}
.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--text-light);
  flex-shrink: 0;
}

.contact-item a {
  text-decoration: none;
  transition: var(--transition-base);
}

.contact-item a:hover {
  opacity: 0.8;
}

.contact-item h6 {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Quick Response */
.quick-response-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 2rem;
  color: var(--text-light);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    gap: var(--gap-lg);
  }

  .header-badge {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .display-4 {
    font-size: 2rem;
  }

  .lead {
    font-size: 1rem;
  }

  .header-decoration {
    width: 150px;
    height: 150px;
    right: -30px;
  }
}
</style>
