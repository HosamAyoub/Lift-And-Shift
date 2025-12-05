<template>
  <section class="section section-dark py-5">
    <div class="container-lg">
      <!-- Hero Section -->
      <div class="mb-5 pb-4 text-center">
        <h2 class="display-4 mb-3">Professional Moving Services</h2>
        <p class="lead text-gray mb-0">
          Your trusted partner for seamless relocations. From packing to delivery, we handle it all.
        </p>
      </div>

      <!-- Moving Form Card -->
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card-dark shadow-xl">
            <!-- Tab Navigation -->
            <TabNavigation
              :currentTab="currentTab"
              :tabs="tabs"
              :completedTabs="completedTabs"
              @update:tab="handleTabChange"
            />

            <!-- Form Content -->
            <form @submit.prevent="handleSubmit" class="mt-4">
              <!-- Tab 1: Personal Info -->
              <div v-show="currentTab === 1" class="tab-content-wrapper">
                <h4 class="text-white mb-4">
                  <i class="fas fa-user text-orange me-2"></i>Personal Information
                </h4>
                <p class="text-gray small mb-4">Let us know who you are and how to reach you.</p>

                <div class="row g-3">
                  <!-- First Name -->
                  <div class="col-md-6">
                    <label class="text-white fw-bold d-block mb-2">
                      First Name <span class="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="formData.firstName"
                      class="form-control"
                      placeholder="John"
                      required
                    />
                  </div>

                  <!-- Last Name -->
                  <div class="col-md-6">
                    <label class="text-white fw-bold d-block mb-2">
                      Last Name <span class="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="formData.lastName"
                      class="form-control"
                      placeholder="Doe"
                      required
                    />
                  </div>

                  <!-- Phone -->
                  <div class="col-md-6">
                    <label class="text-white fw-bold d-block mb-2">
                      Phone Number <span class="text-orange">*</span>
                    </label>
                    <input
                      type="tel"
                      :value="formData.phone"
                      @input="handlePhoneInput"
                      class="form-control"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <!-- Email -->
                  <div class="col-md-6">
                    <label class="text-white fw-bold d-block mb-2">Email</label>
                    <input
                      type="email"
                      v-model="formData.email"
                      class="form-control"
                      placeholder="john.doe@example.com (optional)"
                    />
                  </div>

                  <!-- Type of Help -->
                  <div class="col-12">
                    <label class="text-white fw-bold d-block mb-3">
                      Type of Service <span class="text-orange">*</span>
                    </label>
                    <div class="service-options">
                      <label
                        v-for="service in services"
                        :key="service.value"
                        class="service-option"
                        :class="{ selected: formData.helpType === service.value }"
                      >
                        <input
                          type="radio"
                          name="helpType"
                          v-model="formData.helpType"
                          :value="service.value"
                          class="service-radio"
                        />
                        <div class="service-card">
                          <i :class="service.icon" class="service-icon"></i>
                          <div class="service-label">{{ service.label }}</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 2: Location Details -->
              <div v-show="currentTab === 2" class="tab-content-wrapper">
                <h4 class="text-white mb-4">
                  <i class="fas fa-map-marker-alt text-orange me-2"></i>Location Details
                </h4>
                <p class="text-gray small mb-4">
                  Tell us where we're picking up and dropping off your items.
                </p>

                <div class="row g-4">
                  <!-- Pickup Location -->
                  <div class="col-12">
                    <h5 class="text-white mb-3">
                      <i class="fas fa-arrow-up text-orange me-2"></i>Pickup Location
                    </h5>
                    <div class="row g-3">
                      <div class="col-md-5">
                        <label class="text-white fw-bold d-block mb-2">
                          City <span class="text-orange">*</span>
                        </label>
                        <input
                          type="text"
                          v-model="formData.pickupCity"
                          class="form-control"
                          placeholder="Enter city"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label class="text-white fw-bold d-block mb-2">
                          State <span class="text-orange">*</span>
                        </label>
                        <select v-model="formData.pickupState" class="form-control" required>
                          <option value="">Select state</option>
                          <option v-for="state in states" :key="state" :value="state">
                            {{ state }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label class="text-white fw-bold d-block mb-2">
                          ZIP Code <span class="text-orange">*</span>
                        </label>
                        <input
                          type="text"
                          v-model="formData.pickupZip"
                          class="form-control"
                          placeholder="75001"
                          maxlength="5"
                          required
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="text-white fw-bold d-block mb-2">Building/Complex</label>
                        <input
                          type="text"
                          v-model="formData.pickupBuilding"
                          class="form-control"
                          placeholder="Enter building name (optional)"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="text-white fw-bold d-block mb-2">Floor/Unit</label>
                        <input
                          type="text"
                          v-model="formData.pickupFloor"
                          class="form-control"
                          placeholder="Enter floor/unit (optional)"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Dropoff Location -->
                  <div class="col-12">
                    <h5 class="text-white mb-3">
                      <i class="fas fa-arrow-down text-orange me-2"></i>Dropoff Location
                    </h5>
                    <div class="row g-3">
                      <div class="col-md-5">
                        <label class="text-white fw-bold d-block mb-2">
                          City <span class="text-orange">*</span>
                        </label>
                        <input
                          type="text"
                          v-model="formData.dropoffCity"
                          class="form-control"
                          placeholder="Enter city"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label class="text-white fw-bold d-block mb-2">
                          State <span class="text-orange">*</span>
                        </label>
                        <select v-model="formData.dropoffState" class="form-control" required>
                          <option value="">Select state</option>
                          <option v-for="state in states" :key="state" :value="state">
                            {{ state }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label class="text-white fw-bold d-block mb-2">
                          ZIP Code <span class="text-orange">*</span>
                        </label>
                        <input
                          type="text"
                          v-model="formData.dropoffZip"
                          class="form-control"
                          placeholder="75001"
                          maxlength="5"
                          required
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="text-white fw-bold d-block mb-2">Building/Complex</label>
                        <input
                          type="text"
                          v-model="formData.dropoffBuilding"
                          class="form-control"
                          placeholder="Enter building name (optional)"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="text-white fw-bold d-block mb-2">Floor/Unit</label>
                        <input
                          type="text"
                          v-model="formData.dropoffFloor"
                          class="form-control"
                          placeholder="Enter floor/unit (optional)"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Moving Date & Time -->
                  <div class="col-12">
                    <h5 class="text-white mb-3">
                      <i class="fas fa-calendar text-orange me-2"></i>Schedule
                    </h5>
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="text-white fw-bold d-block mb-2">
                          Preferred Date <span class="text-orange">*</span>
                        </label>
                        <input
                          type="date"
                          v-model="formData.pickupDate"
                          :min="minDate"
                          class="form-control"
                          required
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="text-white fw-bold d-block mb-2">
                          Preferred Time <span class="text-orange">*</span>
                        </label>
                        <div class="time-options">
                          <label
                            v-for="time in timeOptions"
                            :key="time.value"
                            class="time-option"
                            :class="{ selected: formData.pickupTime === time.value }"
                          >
                            <input
                              type="radio"
                              name="pickupTime"
                              v-model="formData.pickupTime"
                              :value="time.value"
                              class="time-radio"
                            />
                            <div class="time-card">
                              <i :class="time.icon" class="time-icon"></i>
                              <div class="time-label">{{ time.label }}</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 3: Additional Info -->
              <div v-show="currentTab === 3" class="tab-content-wrapper">
                <h4 class="text-white mb-4">
                  <i class="fas fa-clipboard-list text-orange me-2"></i>Additional Information
                </h4>
                <p class="text-gray small mb-4">
                  Help us serve you better by providing more details about your move.
                </p>

                <!-- Photo Upload -->
                <div class="mb-4">
                  <FileUpload
                    v-model="uploadedFiles"
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
                    Photos help us provide a more accurate quote. Include furniture, rooms, and
                    access points.
                  </p>
                </div>

                <!-- Description -->
                <div class="mb-4">
                  <label class="text-white fw-bold d-block mb-2"> Additional Details </label>
                  <textarea
                    v-model="formData.description"
                    class="form-control"
                    rows="5"
                    placeholder="Tell us more about your move: number of rooms, special items, stairs, parking restrictions, etc. (optional)"
                  ></textarea>
                  <p class="text-gray small mt-2">
                    <i class="fas fa-lightbulb text-orange me-1"></i>
                    Include: Number of bedrooms, heavy/fragile items, stairs, elevator access,
                    parking info
                  </p>
                </div>

                <!-- How did you hear about us -->
                <div class="mb-4">
                  <label class="text-white fw-bold d-block mb-2">
                    How Did You Hear About Us?
                  </label>
                  <select v-model="formData.hearAboutUs" class="form-control">
                    <option value="">Select an option (optional)</option>
                    <option value="google">Google Search</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Family</option>
                    <option value="repeat">Previous Customer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Summary Card -->
                <div class="summary-card">
                  <h5 class="text-white mb-3">
                    <i class="fas fa-file-alt text-orange me-2"></i>Request Summary
                  </h5>
                  <div class="summary-grid">
                    <div class="summary-item">
                      <div class="summary-label">Name</div>
                      <div class="summary-value">{{ fullName || 'Not provided' }}</div>
                    </div>
                    <div class="summary-item">
                      <div class="summary-label">Service Type</div>
                      <div class="summary-value">{{ serviceLabel || 'Not selected' }}</div>
                    </div>
                    <div class="summary-item">
                      <div class="summary-label">From</div>
                      <div class="summary-value">{{ pickupAddress || 'Not provided' }}</div>
                    </div>
                    <div class="summary-item">
                      <div class="summary-label">To</div>
                      <div class="summary-value">{{ dropoffAddress || 'Not provided' }}</div>
                    </div>
                    <div class="summary-item">
                      <div class="summary-label">Date</div>
                      <div class="summary-value">{{ formattedDate || 'Not selected' }}</div>
                    </div>
                    <div class="summary-item">
                      <div class="summary-label">Time</div>
                      <div class="summary-value">{{ timeLabel || 'Not selected' }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div
                class="d-flex justify-content-between mt-4 pt-4"
                style="border-top: 1px solid var(--orange-10)"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="previousTab"
                  :disabled="currentTab === 1"
                  v-show="currentTab > 1"
                >
                  <i class="fas fa-arrow-left me-2"></i>Previous
                </button>
                <div v-show="currentTab === 1" style="width: 1px"></div>

                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nextTab"
                  v-show="currentTab < 3"
                >
                  Next<i class="fas fa-arrow-right ms-2"></i>
                </button>

                <button
                  type="submit"
                  class="btn btn-primary"
                  v-show="currentTab === 3"
                  :disabled="isSubmitting"
                >
                  <span v-show="!isSubmitting">
                    <i class="fas fa-paper-plane me-2"></i>Submit Request
                  </span>
                  <span v-show="isSubmitting">
                    <i class="fas fa-spinner fa-spin me-2"></i>Sending...
                  </span>
                </button>
              </div>

              <!-- Success/Error Messages -->
              <div
                v-show="submitMessage"
                class="mt-4 p-3 rounded"
                :class="
                  submitSuccess
                    ? 'bg-success bg-opacity-10 border border-success'
                    : 'bg-danger bg-opacity-10 border border-danger'
                "
              >
                <p class="mb-0" :class="submitSuccess ? 'text-success' : 'text-danger'">
                  <i
                    :class="submitSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"
                  ></i>
                  {{ submitMessage }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <FeaturesSection />
    </div>
  </section>
</template>

<script>
import TabNavigation from './TabNavigation.vue'
import FeaturesSection from './FeaturesSection.vue'
import FileUpload from '../Shared/FileUpload.vue'
import { validators } from '../../utils/validators.js'

export default {
  name: 'Moving',
  components: {
    TabNavigation,
    FeaturesSection,
    FileUpload,
  },
  data() {
    return {
      currentTab: 1,
      completedTabs: [],
      tabs: [
        { id: 1, label: 'Personal Info', icon: 'fas fa-user' },
        { id: 2, label: 'Location Details', icon: 'fas fa-map-marker-alt' },
        { id: 3, label: 'Additional Info', icon: 'fas fa-clipboard-list' },
      ],
      services: [
        { value: 'packing', label: 'Packing Only', icon: 'fas fa-box' },
        { value: 'moving', label: 'Moving Only', icon: 'fas fa-truck' },
        { value: 'storage', label: 'Storage Only', icon: 'fas fa-warehouse' },
        { value: 'packing-moving', label: 'Packing & Moving', icon: 'fas fa-boxes' },
        { value: 'full-service', label: 'Full Service (All)', icon: 'fas fa-star' },
      ],
      states: ['TX', 'OK', 'AR', 'LA', 'NM', 'CO', 'KS', 'MO'],
      timeOptions: [
        { value: 'morning', label: 'Morning (8AM - 12PM)', icon: 'fas fa-sun' },
        { value: 'midday', label: 'Mid-day (12PM - 3PM)', icon: 'fas fa-cloud-sun' },
        { value: 'afternoon', label: 'Afternoon (3PM - 6PM)', icon: 'fas fa-cloud' },
      ],
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        helpType: '',
        pickupCity: '',
        pickupState: '',
        pickupZip: '',
        pickupBuilding: '',
        pickupFloor: '',
        pickupDate: '',
        pickupTime: '',
        dropoffCity: '',
        dropoffState: '',
        dropoffZip: '',
        dropoffBuilding: '',
        dropoffFloor: '',
        description: '',
        hearAboutUs: '',
      },
      uploadedFiles: [],
      fieldErrors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        helpType: '',
        pickupCity: '',
        pickupState: '',
        pickupZip: '',
        pickupDate: '',
        pickupTime: '',
        dropoffCity: '',
        dropoffState: '',
        dropoffZip: '',
      },
      fieldTouched: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        helpType: false,
        pickupCity: false,
        pickupState: false,
        pickupZip: false,
        pickupDate: false,
        pickupTime: false,
        dropoffCity: false,
        dropoffState: false,
        dropoffZip: false,
      },
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false,
    }
  },
  methods: {
    handleTabChange(tabId) {
      if (tabId < this.currentTab || this.completedTabs.includes(this.currentTab)) {
        this.currentTab = tabId
      }
    },
    validateTab1() {
      // Check if first name is valid (at least 2 chars)
      if (!this.formData.firstName || this.formData.firstName.trim().length < 2) {
        return false
      }

      // Check if last name is valid (at least 2 chars)
      if (!this.formData.lastName || this.formData.lastName.trim().length < 2) {
        return false
      }

      // Check if phone is valid (exactly 10 digits when cleaned)
      const phoneDigits = this.formData.phone.replace(/\D/g, '')
      if (phoneDigits.length !== 10) {
        return false
      }

      // Check if service type is selected
      if (!this.formData.helpType) {
        return false
      }

      // All validations passed
      return true
    },
    validateTab2() {
      // Check pickup location
      if (!this.formData.pickupCity || this.formData.pickupCity.trim().length < 2) {
        return false
      }
      if (!this.formData.pickupState) {
        return false
      }
      if (!this.formData.pickupZip || this.formData.pickupZip.length !== 5) {
        return false
      }

      // Check dropoff location
      if (!this.formData.dropoffCity || this.formData.dropoffCity.trim().length < 2) {
        return false
      }
      if (!this.formData.dropoffState) {
        return false
      }
      if (!this.formData.dropoffZip || this.formData.dropoffZip.length !== 5) {
        return false
      }

      // Check date and time
      if (!this.formData.pickupDate) {
        return false
      }
      if (!this.formData.pickupTime) {
        return false
      }

      // All validations passed
      return true
    },
    nextTab() {
      // Validate current tab
      let isValid = false

      if (this.currentTab === 1) {
        isValid = this.validateTab1()
      } else if (this.currentTab === 2) {
        isValid = this.validateTab2()
      } else {
        isValid = true
      }

      if (isValid) {
        // Mark current tab as completed
        if (!this.completedTabs.includes(this.currentTab)) {
          this.completedTabs.push(this.currentTab)
        }
        // Move to next tab
        this.currentTab++
        // Clear any error messages
        this.submitMessage = ''
      } else {
        // Show validation error
        this.submitMessage = 'Please fill in all required fields correctly'
        this.submitSuccess = false
        setTimeout(() => {
          this.submitMessage = ''
        }, 3000)
      }
    },
    previousTab() {
      if (this.currentTab > 1) {
        this.currentTab--
      }
    },
    async handleSubmit() {
      // Validate all tabs
      const tab1Valid = this.validateTab1()
      const tab2Valid = this.validateTab2()

      if (!tab1Valid || !tab2Valid) {
        this.submitSuccess = false
        this.submitMessage = 'Please complete all required fields in previous tabs'
        return
      }

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        const formData = new FormData()
        formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
        formData.append('form', 'Moving')
        formData.append('first_name', this.formData.firstName)
        formData.append('last_name', this.formData.lastName)
        formData.append('email', this.formData.email || 'Not provided')
        formData.append('phone', this.formData.phone)
        formData.append('service_type', this.formData.helpType)
        formData.append('pickup_city', this.formData.pickupCity)
        formData.append('pickup_state', this.formData.pickupState)
        formData.append('pickup_zip', this.formData.pickupZip)
        formData.append('pickup_building', this.formData.pickupBuilding || 'N/A')
        formData.append('pickup_floor', this.formData.pickupFloor || 'N/A')
        formData.append('pickup_date', this.formData.pickupDate)
        formData.append('pickup_time', this.formData.pickupTime)
        formData.append('dropoff_city', this.formData.dropoffCity)
        formData.append('dropoff_state', this.formData.dropoffState)
        formData.append('dropoff_zip', this.formData.dropoffZip)
        formData.append('dropoff_building', this.formData.dropoffBuilding || 'N/A')
        formData.append('dropoff_floor', this.formData.dropoffFloor || 'N/A')
        formData.append('description', this.formData.description || 'No additional details')
        formData.append('hear_about_us', this.formData.hearAboutUs || 'Not specified')

        const fileList = this.uploadedFiles
          .map(
            (file, index) =>
              `File ${index + 1}: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
          )
          .join(' | ')
        formData.append('attachments', fileList || 'No files uploaded')

        this.uploadedFiles.forEach((file) => {
          formData.append('attachment', file)
        })

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          this.submitSuccess = true
          this.submitMessage =
            "Thank you! Your moving service request has been submitted. We'll contact you within 24 hours."

          setTimeout(() => {
            // Reset form
            this.currentTab = 1
            this.completedTabs = []
            this.formData = {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              helpType: '',
              pickupCity: '',
              pickupState: '',
              pickupZip: '',
              pickupBuilding: '',
              pickupFloor: '',
              pickupDate: '',
              pickupTime: '',
              dropoffCity: '',
              dropoffState: '',
              dropoffZip: '',
              dropoffBuilding: '',
              dropoffFloor: '',
              description: '',
              hearAboutUs: '',
            }
            this.uploadedFiles = []
            this.submitMessage = ''
            this.fieldErrors = {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              helpType: '',
              pickupCity: '',
              pickupState: '',
              pickupZip: '',
              pickupDate: '',
              pickupTime: '',
              dropoffCity: '',
              dropoffState: '',
              dropoffZip: '',
            }
            this.fieldTouched = {
              firstName: false,
              lastName: false,
              email: false,
              phone: false,
              helpType: false,
              pickupCity: false,
              pickupState: false,
              pickupZip: false,
              pickupDate: false,
              pickupTime: false,
              dropoffCity: false,
              dropoffState: false,
              dropoffZip: false,
            }
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
    handlePhoneInput(event) {
      const formatted = validators.phone.format(event.target.value)
      this.formData.phone = formatted
    },
    handleFilesChange(files) {
      this.uploadedFiles = files
    },
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    fullName() {
      return `${this.formData.firstName} ${this.formData.lastName}`.trim()
    },
    serviceLabel() {
      const service = this.services.find((s) => s.value === this.formData.helpType)
      return service ? service.label : ''
    },
    pickupAddress() {
      const parts = [
        this.formData.pickupCity,
        this.formData.pickupState,
        this.formData.pickupZip,
      ].filter(Boolean)
      return parts.join(', ')
    },
    dropoffAddress() {
      const parts = [
        this.formData.dropoffCity,
        this.formData.dropoffState,
        this.formData.dropoffZip,
      ].filter(Boolean)
      return parts.join(', ')
    },
    formattedDate() {
      if (!this.formData.pickupDate) return ''
      const date = new Date(this.formData.pickupDate)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    timeLabel() {
      const time = this.timeOptions.find((t) => t.value === this.formData.pickupTime)
      return time ? time.label : ''
    },
  },
}
</script>

<style scoped>
.display-4 {
  font-size: var(--font-3xl);
  font-weight: 800;
}

.lead {
  font-size: var(--font-lg);
  line-height: 1.8;
}

.tab-content-wrapper {
  padding: var(--gap-lg);
}

/* Service Options */
.service-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--gap-md);
}

.service-option {
  position: relative;
  cursor: pointer;
}

.service-radio {
  display: none;
}

.service-card {
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  padding: var(--gap-lg);
  text-align: center;
  transition: var(--transition-base);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap-md);
}

.service-option:hover .service-card {
  background: var(--orange-10);
  border-color: var(--accent-orange);
  transform: translateY(-3px);
}

.service-option.selected .service-card {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 20px var(--orange-20);
}

.service-icon {
  font-size: var(--font-3xl);
  color: var(--accent-orange);
  transition: var(--transition-base);
}

.service-option.selected .service-icon {
  transform: scale(1.1);
}

.service-label {
  color: var(--text-light);
  font-weight: 600;
  font-size: var(--font-sm);
}

/* Time Options */
.time-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--gap-md);
}

.time-option {
  position: relative;
  cursor: pointer;
}

.time-radio {
  display: none;
}

.time-card {
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  text-align: center;
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}

.time-option:hover .time-card {
  background: var(--orange-10);
  border-color: var(--accent-orange);
}

.time-option.selected .time-card {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 20px var(--orange-20);
}

.time-icon {
  font-size: var(--font-2xl);
  color: var(--accent-orange);
}

.time-label {
  color: var(--text-light);
  font-weight: 500;
  font-size: var(--font-sm);
}

/* Summary Card */
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
  .display-4 {
    font-size: var(--font-2xl);
  }

  .lead {
    font-size: var(--font-base);
  }

  .service-options {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .time-options {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
