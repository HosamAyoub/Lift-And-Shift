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
              <PersonalInfoTab
                v-show="currentTab === 1"
                :formData="formData"
                :fieldErrors="fieldErrors"
                :fieldTouched="fieldTouched"
                @update:formData="formData = $event"
                @update:fieldErrors="fieldErrors = $event"
                @update:fieldTouched="fieldTouched = $event"
              />

              <!-- Tab 2: Location Details -->
              <LocationDetailsTab
                v-show="currentTab === 2"
                :formData="formData"
                :fieldErrors="fieldErrors"
                :fieldTouched="fieldTouched"
                :citiesByState="citiesByState"
                @update:formData="formData = $event"
                @update:fieldErrors="fieldErrors = $event"
                @update:fieldTouched="fieldTouched = $event"
              />

              <!-- Tab 3: Additional Info -->
              <AdditionalInfoTab
                v-show="currentTab === 3"
                :formData="formData"
                :uploadedFiles="uploadedFiles"
                :fieldErrors="fieldErrors"
                :fieldTouched="fieldTouched"
                @update:formData="formData = $event"
                @update:uploadedFiles="uploadedFiles = $event"
                @update:fieldErrors="fieldErrors = $event"
                @update:fieldTouched="fieldTouched = $event"
              />

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
import PersonalInfoTab from './PersonalInfoTab.vue'
import LocationDetailsTab from './LocationDetailsTab.vue'
import AdditionalInfoTab from './AdditionalInfoTab.vue'
import FeaturesSection from './FeaturesSection.vue'
import citiesByStateData from '../../../public/assets/JSON/US_CitiesByState.json'
import { validators } from '../../utils/validators.js'

export default {
  name: 'Moving',
  components: {
    TabNavigation,
    PersonalInfoTab,
    LocationDetailsTab,
    AdditionalInfoTab,
    FeaturesSection,
  },
  data() {
    return {
      citiesByState: citiesByStateData,
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

      // Validate phone
      touched.phone = true
      const phoneResult = validators.phone.validate(this.formData.phone)
      errors.phone = phoneResult.error
      if (!phoneResult.valid) isValid = false

      // Validate email (optional)
      if (this.formData.email) {
        touched.email = true
        const emailResult = validators.email.validate(this.formData.email, false)
        errors.email = emailResult.error
        if (!emailResult.valid) isValid = false
      } else {
        errors.email = ''
      }

      // Validate service type
      touched.helpType = true
      if (!this.formData.helpType) {
        errors.helpType = 'Please select a service type'
        isValid = false
      } else {
        errors.helpType = ''
      }

      // Update state
      this.fieldErrors = errors
      this.fieldTouched = touched

      return isValid
    },
    validateTab2() {
      let isValid = true
      const errors = { ...this.fieldErrors }
      const touched = { ...this.fieldTouched }

      // Validate pickup state
      touched.pickupState = true
      if (!this.formData.pickupState) {
        errors.pickupState = 'State is required'
        isValid = false
      } else {
        errors.pickupState = ''
      }

      // Validate pickup city
      touched.pickupCity = true
      if (!this.formData.pickupCity || this.formData.pickupCity.trim().length < 2) {
        errors.pickupCity = 'City is required'
        isValid = false
      } else {
        errors.pickupCity = ''
      }

      // Validate pickup ZIP
      touched.pickupZip = true
      const pickupZipResult = validators.zip.validate(this.formData.pickupZip)
      errors.pickupZip = pickupZipResult.error
      if (!pickupZipResult.valid) isValid = false

      // Validate dropoff state
      touched.dropoffState = true
      if (!this.formData.dropoffState) {
        errors.dropoffState = 'State is required'
        isValid = false
      } else {
        errors.dropoffState = ''
      }

      // Validate dropoff city
      touched.dropoffCity = true
      if (!this.formData.dropoffCity || this.formData.dropoffCity.trim().length < 2) {
        errors.dropoffCity = 'City is required'
        isValid = false
      } else {
        errors.dropoffCity = ''
      }

      // Validate dropoff ZIP
      touched.dropoffZip = true
      const dropoffZipResult = validators.zip.validate(this.formData.dropoffZip)
      errors.dropoffZip = dropoffZipResult.error
      if (!dropoffZipResult.valid) isValid = false

      // Validate date
      touched.pickupDate = true
      if (!this.formData.pickupDate) {
        errors.pickupDate = 'Date is required'
        isValid = false
      } else {
        errors.pickupDate = ''
      }

      // Validate time
      touched.pickupTime = true
      if (!this.formData.pickupTime) {
        errors.pickupTime = 'Time is required'
        isValid = false
      } else {
        errors.pickupTime = ''
      }

      // Update state
      this.fieldErrors = errors
      this.fieldTouched = touched

      return isValid
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
        if (!this.completedTabs.includes(this.currentTab)) {
          this.completedTabs.push(this.currentTab)
        }
        this.currentTab++
        this.submitMessage = ''
      } else {
        this.submitSuccess = false
        this.submitMessage = 'Please fill in all required fields correctly'
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
      // Prevent double submission
      if (this.isSubmitting) return
      
      // Validate all tabs
      const tab1Valid = this.validateTab1()
      const tab2Valid = this.validateTab2()

      if (!tab1Valid || !tab2Valid) {
        this.submitSuccess = false
        if (!tab1Valid) {
          this.submitMessage = 'Please complete all required fields in Personal Info tab'
          this.currentTab = 1
        } else if (!tab2Valid) {
          this.submitMessage = 'Please complete all required fields in Location Details tab'
          this.currentTab = 2
        }

        // Scroll to top to show error message
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        const formDataToSend = new FormData()
        formDataToSend.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
        formDataToSend.append('form', 'Moving')
        formDataToSend.append('first_name', this.formData.firstName)
        formDataToSend.append('last_name', this.formData.lastName)
        formDataToSend.append('email', this.formData.email)
        formDataToSend.append('phone', this.formData.phone)
        formDataToSend.append('service_type', this.formData.helpType)
        formDataToSend.append('pickup_state', this.formData.pickupState)
        formDataToSend.append('pickup_city', this.formData.pickupCity)
        formDataToSend.append('pickup_zip', this.formData.pickupZip)
        formDataToSend.append('pickup_building', this.formData.pickupBuilding)
        formDataToSend.append('pickup_floor', this.formData.pickupFloor)
        formDataToSend.append('pickup_date', this.formData.pickupDate || '')
        formDataToSend.append('pickup_time', this.formData.pickupTime)
        formDataToSend.append('dropoff_state', this.formData.dropoffState)
        formDataToSend.append('dropoff_city', this.formData.dropoffCity)
        formDataToSend.append('dropoff_zip', this.formData.dropoffZip)
        formDataToSend.append('dropoff_building', this.formData.dropoffBuilding)
        formDataToSend.append('dropoff_floor', this.formData.dropoffFloor)
        formDataToSend.append('description', this.formData.description)
        formDataToSend.append('hear_about_us', this.formData.hearAboutUs)

        this.uploadedFiles.forEach((file, index) => {
          formDataToSend.append(`file_${index}`, file)
        })

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formDataToSend,
        })

        const data = await response.json()

        if (data.success) {
          this.submitSuccess = true
          this.submitMessage =
            'Thank you! Your moving service request has been submitted. We will contact you shortly.'
          setTimeout(() => {
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

@media (max-width: 768px) {
  .display-4 {
    font-size: var(--font-2xl);
  }

  .lead {
    font-size: var(--font-base);
  }
}
</style>
