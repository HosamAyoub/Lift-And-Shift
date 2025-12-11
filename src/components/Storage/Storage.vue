<template>
  <!-- Hero Landing Section -->
  <SharedPageHero
    title="Secure <span class='text-orange'>Storage</span> Solutions"
    subtitle="Climate-controlled, secure storage facilities for your belongings. Short-term or long-term, we've got the perfect space for you."
    badge="24/7 Security"
    badgeIcon="fas fa-shield-alt"
    :features="[
      'Climate Controlled',
      '24/7 Access Available',
      'Video Surveillance',
      'Month-to-Month Plans',
    ]"
    :primaryButton="{
      text: 'View Pricing',
      icon: 'fas fa-arrow-down',
      scrollTo: '.pricing-section',
    }"
    :secondaryButton="{
      text: 'Call Us Now',
      icon: 'fas fa-phone',
    }"
    :stats="[
      { number: '5K+', label: 'Units Rented' },
      { number: '99.9%', label: 'Security Rate' },
      { number: '24/7', label: 'Surveillance' },
    ]"
    @secondary-click="callNow"
  />

  <!-- Pricing Tiers Section -->
  <section class="pricing-section my-5">
    <PricingTiers
      title="Storage <span class='text-orange'>Pricing Plans</span>"
      subtitle="Flexible month-to-month storage solutions with no long-term commitment required"
      :tiers="pricingTiers"
      :columnSize="4"
      sectionClass="section section-dark"
      @tier-select="handleTierSelect"
    />
  </section>

  <!-- Storage Form Section -->
  <section class="section section-dark py-5 storage-form-section">
    <div class="container">
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

              <!-- Tab 2: Storage Duration & Unit Details -->
              <StorageLocationTab
                v-show="currentTab === 2"
                :formData="formData"
                :fieldErrors="fieldErrors"
                :fieldTouched="fieldTouched"
                :citiesByState="citiesByState"
                @update:formData="formData = $event"
                @update:fieldErrors="fieldErrors = $event"
                @update:fieldTouched="fieldTouched = $event"
              />

              <!-- Tab 3: Additional Information -->
              <StorageAdditionalTab
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
                    <i class="fas fa-paper-plane me-2"></i>Reserve Storage Unit
                  </span>
                  <span v-show="isSubmitting">
                    <i class="fas fa-spinner fa-spin me-2"></i>Sending...
                  </span>
                </button>
              </div>

              <!-- Success/Error Message -->
              <div
                v-if="submitMessage"
                class="mt-3 p-3 rounded"
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
    </div>
  </section>

  <!-- Storage Features with Images -->
  <section class="section section-darker">
    <div class="container">
      <div class="row align-items-center g-5 mb-5">
        <div class="col-lg-6">
          <div class="feature-image-wrapper">
            <div class="feature-image-decoration"></div>
            <i class="fas fa-thermometer-half feature-image-icon"></i>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-content">
            <span class="feature-badge">
              <i class="fas fa-snowflake"></i>
              Climate Control
            </span>
            <h2 class="feature-title">
              Temperature & Humidity <span class="text-orange">Controlled</span>
            </h2>
            <p class="feature-description">
              Our climate-controlled units maintain optimal temperature and humidity levels
              year-round, protecting your belongings from extreme weather conditions, moisture
              damage, and mold growth. Perfect for storing furniture, electronics, documents, and
              sensitive items.
            </p>
            <ul class="feature-list">
              <li><i class="fas fa-check"></i> Temperature maintained 55°-85°F</li>
              <li><i class="fas fa-check"></i> Humidity controlled 30%-50%</li>
              <li><i class="fas fa-check"></i> Protection from extreme weather</li>
              <li><i class="fas fa-check"></i> Ideal for valuables & electronics</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row align-items-center g-5 mb-5 flex-lg-row-reverse">
        <div class="col-lg-6">
          <div class="feature-image-wrapper">
            <div class="feature-image-decoration"></div>
            <i class="fas fa-video feature-image-icon"></i>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-content">
            <span class="feature-badge">
              <i class="fas fa-shield-alt"></i>
              Advanced Security
            </span>
            <h2 class="feature-title"><span class="text-orange">24/7</span> Monitored Security</h2>
            <p class="feature-description">
              Your belongings are protected by state-of-the-art security systems including 24/7
              video surveillance, individual unit alarms, electronic gate access, and on-site
              management. Rest easy knowing your items are safe and secure at all times.
            </p>
            <ul class="feature-list">
              <li><i class="fas fa-check"></i> 24/7 HD video surveillance</li>
              <li><i class="fas fa-check"></i> Electronic gate access codes</li>
              <li><i class="fas fa-check"></i> Individual unit alarms</li>
              <li><i class="fas fa-check"></i> Well-lit facilities</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <div class="feature-image-wrapper">
            <div class="feature-image-decoration"></div>
            <i class="fas fa-truck-loading feature-image-icon"></i>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-content">
            <span class="feature-badge">
              <i class="fas fa-dolly"></i>
              Easy Access
            </span>
            <h2 class="feature-title">
              Convenient <span class="text-orange">Move-In & Access</span>
            </h2>
            <p class="feature-description">
              Wide driveways, ground-level units, loading docks, and complimentary carts make moving
              in and accessing your storage unit effortless. Choose from 24/7 access or business
              hours based on your needs. We provide everything you need for a smooth storage
              experience.
            </p>
            <ul class="feature-list">
              <li><i class="fas fa-check"></i> Ground-level units available</li>
              <li><i class="fas fa-check"></i> Wide drive-up access</li>
              <li><i class="fas fa-check"></i> Free moving carts & dollies</li>
              <li><i class="fas fa-check"></i> Extended access hours</li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="section section-darker">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">Frequently Asked <span class="text-orange">Questions</span></h2>
        <p class="section-subtitle">Everything you need to know about our storage services</p>
      </div>

      <div class="row g-4">
        <div v-for="(faq, index) in faqs" :key="index" class="col-lg-6">
          <div class="faq-item" :class="{ active: activeFaq === index }">
            <div class="faq-question" @click="toggleFaq(index)">
              <h5>{{ faq.question }}</h5>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer" v-show="activeFaq === index">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SharedPageHero from '../Shared/SharedPageHero.vue'
import BenefitCards from '../Shared/BenefitCards.vue'
import PricingTiers from './PricingTiers.vue'
import TabNavigation from '../Moving/TabNavigation.vue'
import PersonalInfoTab from '../Moving/PersonalInfoTab.vue'
import StorageLocationTab from './StorageLocationTab.vue'
import StorageAdditionalTab from './StorageAdditionalTab.vue'
import citiesByStateData from '../../../public/assets/JSON/US_CitiesByState.json'
import { validators } from '../../utils/validators.js'

export default {
  name: 'Storage',
  components: {
    SharedPageHero,
    BenefitCards,
    PricingTiers,
    TabNavigation,
    PersonalInfoTab,
    StorageLocationTab,
    StorageAdditionalTab,
  },
  data() {
    return {
      citiesByState: citiesByStateData,
      storageBenefits: [
        {
          icon: 'fas fa-lock',
          title: 'Secure Facilities',
          description:
            '24/7 video surveillance, electronic gate access, and individual unit alarms keep your belongings safe.',
        },
        {
          icon: 'fas fa-temperature-high',
          title: 'Climate Controlled',
          description:
            'Temperature and humidity controlled units protect your items from extreme weather and moisture.',
        },
        {
          icon: 'fas fa-calendar-alt',
          title: 'Flexible Terms',
          description:
            'Month-to-month leases with no long-term commitment. Move in and out on your schedule.',
        },
        {
          icon: 'fas fa-hand-holding-usd',
          title: 'Affordable Rates',
          description:
            'Competitive pricing with various unit sizes to fit your budget and storage needs perfectly.',
        },
      ],
      pricingTiers: [
        {
          title: '5x10',
          icon: 'fas fa-box',
          price: 100,
          size: '5x10 ft',
          description: 'Perfect for seasonal items, sports equipment, or small apartment storage',
          features: [
            'Climate controlled option',
            'Ground floor access',
            '24/7 video surveillance',
            '4 month minimum',
            'Free lock included',
          ],
          featured: false,
        },
        {
          title: '10x10',
          icon: 'fas fa-boxes',
          price: 150,
          size: '10x10 ft',
          description: 'Ideal for 1 bedroom apartment furniture and boxes',
          features: [
            'Climate controlled option',
            'Drive-up access available',
            '24/7 video surveillance',
            '4 month minimum',
            'Free moving cart access',
          ],
          featured: true,
        },
        {
          title: '10x15',
          icon: 'fas fa-warehouse',
          price: 200,
          size: '10x15 ft',
          description: 'Great for 2 bedroom homes with moderate furniture',
          features: [
            'Climate controlled option',
            'Drive-up access',
            'Advanced security system',
            '4 month minimum',
            'Loading dock access',
          ],
          featured: false,
        },
        {
          title: '10x20',
          icon: 'fas fa-warehouse',
          price: 250,
          size: '10x20 ft',
          description: 'Perfect for 3-4 bedroom homes or commercial inventory',
          features: [
            'Climate controlled option',
            'Drive-up access',
            'Advanced security system',
            '4 month minimum',
            'Premium support',
          ],
          featured: false,
        },
      ],
      currentTab: 1,
      completedTabs: [],
      tabs: [
        { id: 1, label: 'Personal Info', icon: 'fas fa-user' },
        { id: 2, label: 'Storage Details', icon: 'fas fa-warehouse' },
        { id: 3, label: 'Additional Info', icon: 'fas fa-clipboard-list' },
      ],
      formData: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        pickupState: '',
        pickupCity: '',
        pickupZip: '',
        pickupBuilding: '',
        pickupFloor: '',
        dropoffState: '',
        dropoffCity: '',
        dropoffZip: '',
        unitSize: '',
        moveInDate: '',
        moveInTime: '',
        storageDuration: '',
        climateControl: false,
        notes: '',
      },
      uploadedFiles: [],
      fieldErrors: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        pickupState: '',
        pickupCity: '',
        pickupZip: '',
        dropoffState: '',
        dropoffCity: '',
        dropoffZip: '',
        unitSize: '',
        moveInDate: '',
        storageDuration: '',
      },
      fieldTouched: {
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        pickupState: false,
        pickupCity: false,
        pickupZip: false,
        dropoffState: false,
        dropoffCity: false,
        dropoffZip: false,
        unitSize: false,
        moveInDate: false,
        storageDuration: false,
      },
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false,
      activeFaq: null,
      faqs: [
        {
          question: 'What sizes of storage units do you offer?',
          answer:
            'We offer units ranging from 5x5 (small closet size) up to 20x20+ (large garage size). Our most popular sizes are 5x10, 10x10, and 10x20. Contact us for a consultation to determine the best size for your needs.',
        },
        {
          question: 'Can I access my storage unit anytime?',
          answer:
            'Yes! We offer 24/7 access to your storage unit with your personal electronic gate code. Some facilities have specific access hours, but most provide round-the-clock access for your convenience.',
        },
        {
          question: 'What is climate-controlled storage?',
          answer:
            'Climate-controlled storage maintains a consistent temperature (55-85°F) and humidity level (30-50%) year-round. This protects sensitive items like electronics, furniture, documents, and artwork from extreme temperatures, moisture, and mold.',
        },
        {
          question: 'Do you require a long-term contract?',
          answer:
            'No, we offer flexible month-to-month leases with no long-term commitment. You can rent for as long as you need and cancel with just 30 days notice. Perfect for short-term or long-term storage needs.',
        },
        {
          question: 'Is insurance required for stored items?',
          answer:
            'While not required, we strongly recommend insurance for your stored belongings. We can help you arrange affordable storage insurance, or you can check if your homeowners or renters insurance covers stored items.',
        },
        {
          question: 'What security measures are in place?',
          answer:
            'Our facilities feature 24/7 HD video surveillance, electronic gate access codes, individual unit alarms, well-lit premises, and on-site management. Your belongings are monitored and protected around the clock.',
        },
      ],
    }
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
  },
  methods: {
    callNow() {
      window.location.href = 'tel:+18008899788'
    },
    handleTierSelect(tier) {
      // Scroll to form and pre-select unit size
      const formSection = document.querySelector('.storage-form-section')
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      // Pre-fill unit size based on selected tier
      const sizeMap = {
        '5x10': 'small',
        '10x10': 'medium',
        '10x15': 'large',
        '10x20': 'extra-large',
      }
      this.formData.unitSize = sizeMap[tier.title] || ''
    },
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

      this.fieldErrors = errors
      this.fieldTouched = touched
      return isValid
    },
    validateTab2() {
      let isValid = true
      const errors = { ...this.fieldErrors }
      const touched = { ...this.fieldTouched }

      // Validate pickup location
      touched.pickupState = true
      if (!this.formData.pickupState) {
        errors.pickupState = 'Pickup state is required'
        isValid = false
      } else {
        errors.pickupState = ''
      }

      touched.pickupCity = true
      if (!this.formData.pickupCity) {
        errors.pickupCity = 'Pickup city is required'
        isValid = false
      } else {
        errors.pickupCity = ''
      }

      touched.pickupZip = true
      if (!this.formData.pickupZip) {
        errors.pickupZip = 'Pickup ZIP code is required'
        isValid = false
      } else if (!/^\d{5}$/.test(this.formData.pickupZip)) {
        errors.pickupZip = 'ZIP code must be 5 digits'
        isValid = false
      } else {
        errors.pickupZip = ''
      }

      // Validate dropoff location
      touched.dropoffState = true
      if (!this.formData.dropoffState) {
        errors.dropoffState = 'Dropoff state is required'
        isValid = false
      } else {
        errors.dropoffState = ''
      }

      touched.dropoffCity = true
      if (!this.formData.dropoffCity) {
        errors.dropoffCity = 'Dropoff city is required'
        isValid = false
      } else {
        errors.dropoffCity = ''
      }

      touched.dropoffZip = true
      if (!this.formData.dropoffZip) {
        errors.dropoffZip = 'Dropoff ZIP code is required'
        isValid = false
      } else if (!/^\d{5}$/.test(this.formData.dropoffZip)) {
        errors.dropoffZip = 'ZIP code must be 5 digits'
        isValid = false
      } else {
        errors.dropoffZip = ''
      }

      // Validate storage duration (custom validation with minimum 4 months)
      touched.storageDuration = true
      if (!this.formData.storageDuration) {
        errors.storageDuration = 'Storage duration is required'
        isValid = false
      } else if (
        typeof this.formData.storageDuration !== 'number' ||
        this.formData.storageDuration < 4
      ) {
        errors.storageDuration = 'Minimum 4 months required'
        isValid = false
      } else {
        errors.storageDuration = ''
      }

      // Validate unit size (required field)
      touched.unitSize = true
      if (!this.formData.unitSize) {
        errors.unitSize = 'Please select a unit size'
        isValid = false
      } else {
        errors.unitSize = ''
      }

      // Validate move-in date (required field)
      touched.moveInDate = true
      if (!this.formData.moveInDate) {
        errors.moveInDate = 'Move-in date is required'
        isValid = false
      } else {
        // Validate date is not in the past
        const selectedDate = new Date(this.formData.moveInDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          errors.moveInDate = 'Move-in date cannot be in the past'
          isValid = false
        } else {
          errors.moveInDate = ''
        }
      }

      this.fieldErrors = errors
      this.fieldTouched = touched
      return isValid
    },
    nextTab() {
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
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index
    },
    validateField(fieldName) {
      this.fieldTouched[fieldName] = true

      // Email validation (optional)
      if (fieldName === 'email') {
        const result = validators.email.validate(this.formData.email, false)
        this.fieldErrors.email = result.error
        return result.valid
      }

      // Storage duration validation (custom - minimum 4 months)
      if (fieldName === 'storageDuration') {
        if (!this.formData.storageDuration) {
          this.fieldErrors.storageDuration = 'Storage duration is required'
          return false
        } else if (
          typeof this.formData.storageDuration !== 'number' ||
          this.formData.storageDuration < 4
        ) {
          this.fieldErrors.storageDuration = 'Minimum 4 months required'
          return false
        }
        this.fieldErrors.storageDuration = ''
        return true
      }

      // Unit size validation
      if (fieldName === 'unitSize') {
        if (!this.formData.unitSize) {
          this.fieldErrors.unitSize = 'Please select a unit size'
          return false
        }
        this.fieldErrors.unitSize = ''
        return true
      }

      // Move-in date validation
      if (fieldName === 'moveInDate') {
        if (!this.formData.moveInDate) {
          this.fieldErrors.moveInDate = 'Move-in date is required'
          return false
        }
        const selectedDate = new Date(this.formData.moveInDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          this.fieldErrors.moveInDate = 'Move-in date cannot be in the past'
          return false
        }
        this.fieldErrors.moveInDate = ''
        return true
      }

      // Use validators for name and phone fields
      if (validators[fieldName]) {
        const result = validators[fieldName].validate(this.formData[fieldName])
        this.fieldErrors[fieldName] = result.error
        return result.valid
      }

      return true
    },
    clearFieldError(fieldName) {
      this.fieldErrors[fieldName] = ''
    },
    handlePhoneInput() {
      this.formData.phone = validators.phone.format(this.formData.phone)
      this.clearFieldError('phone')
    },
    validateAllFields() {
      const tab1Valid = this.validateTab1()
      const tab2Valid = this.validateTab2()

      if (!tab1Valid) {
        this.currentTab = 1
        return false
      }
      if (!tab2Valid) {
        this.currentTab = 2
        return false
      }

      return true
    },
    async handleSubmit() {
      if (!this.validateAllFields()) {
        this.submitSuccess = false
        this.submitMessage = 'Please fix the errors before submitting'
        return
      }

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        const formData = new FormData()
        formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
        formData.append('form', 'Storage')
        formData.append('first_name', this.formData.firstName)
        formData.append('last_name', this.formData.lastName)
        formData.append('phone', this.formData.phone)
        formData.append('email', this.formData.email || '')
        formData.append('unit_size', this.formData.unitSize)
        formData.append('move_in_date', this.formData.moveInDate)
        formData.append('move_in_time', this.formData.moveInTime || 'Not specified')
        formData.append('storage_duration_months', this.formData.storageDuration)
        formData.append('climate_control', this.formData.climateControl ? 'Yes (+$25/month)' : 'No')
        formData.append('notes', this.formData.notes)

        // Append uploaded files
        this.uploadedFiles.forEach((file, index) => {
          formData.append(`file_${index}`, file)
        })

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          this.submitSuccess = true
          this.submitMessage =
            "Thank you! Your storage reservation has been submitted. We'll contact you within 24 hours."

          setTimeout(() => {
            this.currentTab = 1
            this.completedTabs = []
            this.uploadedFiles = []
            this.formData = {
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              unitSize: '',
              moveInDate: '',
              moveInTime: '',
              storageDuration: '',
              climateControl: false,
              notes: '',
            }
            this.fieldErrors = {
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              unitSize: '',
              moveInDate: '',
              storageDuration: '',
            }
            this.fieldTouched = {
              firstName: false,
              lastName: false,
              phone: false,
              email: false,
              unitSize: false,
              moveInDate: false,
              storageDuration: false,
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
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto;
}

/* Feature Image Sections */
.feature-image-wrapper {
  position: relative;
  height: 400px;
  background: linear-gradient(135deg, var(--secondary-dark), var(--primary-dark));
  border-radius: var(--radius-xl);
  border: 2px solid var(--orange-10);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.4s ease;
}

.feature-image-wrapper:hover {
  border-color: var(--accent-orange);
  box-shadow: 0 20px 60px var(--orange-20);
  transform: scale(1.02);
}

.feature-image-decoration {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--orange-10), transparent 70%);
  opacity: 0.3;
  transition: opacity 0.4s ease;
}

.feature-image-wrapper:hover .feature-image-decoration {
  opacity: 0.5;
}

.feature-image-icon {
  font-size: 10rem;
  color: var(--orange-20);
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.feature-image-wrapper:hover .feature-image-icon {
  color: var(--accent-orange);
  transform: scale(1.1) rotate(5deg);
}

.feature-content {
  padding: 2rem 0;
}

.feature-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--orange-10);
  color: var(--accent-orange);
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.feature-description {
  font-size: 1.1rem;
  color: var(--text-gray);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: var(--text-light);
  font-size: 1rem;
  border-bottom: 1px solid var(--orange-10);
}

.feature-list li:last-child {
  border-bottom: none;
}

.feature-list li i {
  color: var(--accent-orange);
  font-size: 1.2rem;
}

/* FAQ Accordion */
.faq-item {
  background: var(--secondary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover,
.faq-item.active {
  border-color: var(--accent-orange);
  box-shadow: 0 10px 30px var(--orange-20);
}

.faq-question {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: var(--orange-10);
}

.faq-question h5 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-light);
}

.faq-question i {
  color: var(--accent-orange);
  transition: transform 0.3s ease;
  font-size: 1.2rem;
}

.faq-item.active .faq-question i {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 2rem 1.5rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-answer p {
  margin: 0;
  color: var(--text-gray);
  line-height: 1.8;
  font-size: 1rem;
}

/* Form Styles */
.form-label {
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-control {
  background-color: var(--primary-dark) !important;
  border: 1px solid var(--orange-10) !important;
  color: var(--text-light) !important;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  transition: var(--transition-base);
}

.form-control:focus {
  border-color: var(--accent-orange) !important;
  box-shadow: 0 0 0 0.2rem var(--orange-20) !important;
  background-color: var(--primary-dark) !important;
}

.form-control::placeholder {
  color: var(--text-gray) !important;
}

.form-check-input {
  background-color: var(--primary-dark);
  border-color: var(--orange-10);
}

.form-check-input:checked {
  background-color: var(--accent-orange);
  border-color: var(--accent-orange);
}

.form-check-label {
  color: var(--text-light);
  margin-left: 0.5rem;
}

@media (max-width: 992px) {
  .feature-title {
    font-size: 2rem;
  }

  .feature-image-wrapper {
    height: 300px;
    margin-bottom: 2rem;
  }

  .feature-image-icon {
    font-size: 6rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .feature-title {
    font-size: 1.75rem;
  }
}
</style>
