<template>
  <section class="section section-dark py-5">
    <div class="container-lg">
      <div class="mb-5 pb-4 text-center">
        <h2 class="display-4 mb-3">Professional Moving Services</h2>
        <p class="lead text-gray mb-0">
          Your trusted partner for seamless relocations. From packing to delivery, we handle it all.
        </p>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card-dark shadow-xl">
            <!-- Tab Navigation -->
            <div class="d-flex justify-content-center mb-4">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                :class="['btn', currentTab === tab.id ? 'btn-primary' : 'btn-outline-primary']"
                @click="goToTab(tab.id)"
              >
                <i :class="tab.icon" class="me-2"></i>{{ tab.label }}
              </button>
            </div>
            <form @submit.prevent="handleSubmit" class="mt-4">
              <!-- Tab 1: Personal Info -->
              <div v-if="currentTab === 1">
                <!-- First Name -->
                <div class="mb-3">
                  <label>First Name *</label>
                  <input
                    type="text"
                    v-model="formData.firstName"
                    class="form-control"
                    :class="{ invalid: fieldTouched.firstName && fieldErrors.firstName }"
                    @blur="fieldTouched.firstName = true"
                    placeholder="John"
                  />
                  <div v-if="fieldTouched.firstName && fieldErrors.firstName" class="field-error">
                    {{ fieldErrors.firstName }}
                  </div>
                </div>
                <!-- Last Name -->
                <div class="mb-3">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    v-model="formData.lastName"
                    class="form-control"
                    :class="{ invalid: fieldTouched.lastName && fieldErrors.lastName }"
                    @blur="fieldTouched.lastName = true"
                    placeholder="Doe"
                  />
                  <div v-if="fieldTouched.lastName && fieldErrors.lastName" class="field-error">
                    {{ fieldErrors.lastName }}
                  </div>
                </div>
                <!-- Phone -->
                <div class="mb-3">
                  <label>Phone Number *</label>
                  <input
                    type="text"
                    v-model="formData.phone"
                    class="form-control"
                    :class="{ invalid: fieldTouched.phone && fieldErrors.phone }"
                    @blur="fieldTouched.phone = true"
                    placeholder="(555) 123-4567"
                  />
                  <div v-if="fieldTouched.phone && fieldErrors.phone" class="field-error">
                    {{ fieldErrors.phone }}
                  </div>
                </div>
                <!-- Email -->
                <div class="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    v-model="formData.email"
                    class="form-control"
                    :class="{ invalid: fieldTouched.email && fieldErrors.email }"
                    @blur="fieldTouched.email = true"
                    placeholder="john@example.com"
                  />
                  <div v-if="fieldTouched.email && fieldErrors.email" class="field-error">
                    {{ fieldErrors.email }}
                  </div>
                </div>
                <!-- Service Type -->
                <div class="mb-3">
                  <label>Service Type *</label>
                  <div>
                    <label v-for="type in serviceTypes" :key="type.value" class="me-3">
                      <input type="radio" v-model="formData.helpType" :value="type.value" />
                      {{ type.label }}
                    </label>
                  </div>
                  <div v-if="fieldTouched.helpType && fieldErrors.helpType" class="field-error">
                    {{ fieldErrors.helpType }}
                  </div>
                </div>
              </div>
              <!-- Tab 2: Location Details -->
              <div v-if="currentTab === 2">
                <h5>Pickup Address</h5>
                <div class="mb-3">
                  <label>City *</label>
                  <input
                    type="text"
                    v-model="formData.pickupCity"
                    class="form-control"
                    :class="{ invalid: fieldTouched.pickupCity && fieldErrors.pickupCity }"
                    @blur="fieldTouched.pickupCity = true"
                    placeholder="Dallas"
                  />
                  <div v-if="fieldTouched.pickupCity && fieldErrors.pickupCity" class="field-error">
                    {{ fieldErrors.pickupCity }}
                  </div>
                </div>
                <div class="mb-3">
                  <label>State *</label>
                  <select
                    v-model="formData.pickupState"
                    class="form-control"
                    @blur="fieldTouched.pickupState = true"
                  >
                    <option value="">Select State</option>
                    <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                  </select>
                  <div
                    v-if="fieldTouched.pickupState && fieldErrors.pickupState"
                    class="field-error"
                  >
                    {{ fieldErrors.pickupState }}
                  </div>
                </div>
                <div class="mb-3">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    v-model="formData.pickupZip"
                    class="form-control"
                    :class="{ invalid: fieldTouched.pickupZip && fieldErrors.pickupZip }"
                    @blur="fieldTouched.pickupZip = true"
                    maxlength="5"
                    placeholder="75001"
                  />
                  <div v-if="fieldTouched.pickupZip && fieldErrors.pickupZip" class="field-error">
                    {{ fieldErrors.pickupZip }}
                  </div>
                </div>
                <div class="mb-3">
                  <label>Building</label>
                  <input
                    type="text"
                    v-model="formData.pickupBuilding"
                    class="form-control"
                    placeholder="Building name or organization (optional)"
                  />
                </div>
                <div class="mb-3">
                  <label>Floor</label>
                  <input
                    type="text"
                    v-model="formData.pickupFloor"
                    class="form-control"
                    placeholder="Floor (optional)"
                  />
                </div>
                <div class="mb-3">
                  <label>Pickup Date *</label>
                  <input
                    type="date"
                    v-model="formData.pickupDate"
                    class="form-control"
                    :class="{ invalid: fieldTouched.pickupDate && fieldErrors.pickupDate }"
                    @blur="fieldTouched.pickupDate = true"
                    :min="minDate"
                  />
                  <div v-if="fieldTouched.pickupDate && fieldErrors.pickupDate" class="field-error">
                    {{ fieldErrors.pickupDate }}
                  </div>
                </div>
                <div class="mb-3">
                  <label>Preferred Time *</label>
                  <div>
                    <label v-for="time in timeOptions" :key="time.value" class="me-3">
                      <input type="radio" v-model="formData.pickupTime" :value="time.value" />
                      {{ time.label }}
                    </label>
                  </div>
                  <div v-if="fieldTouched.pickupTime && fieldErrors.pickupTime" class="field-error">
                    {{ fieldErrors.pickupTime }}
                  </div>
                </div>
                <h5>Drop-off Address</h5>
                <div class="mb-3">
                  <label>City *</label>
                  <input
                    type="text"
                    v-model="formData.dropoffCity"
                    class="form-control"
                    :class="{ invalid: fieldTouched.dropoffCity && fieldErrors.dropoffCity }"
                    @blur="fieldTouched.dropoffCity = true"
                    placeholder="Fort Worth"
                  />
                  <div
                    v-if="fieldTouched.dropoffCity && fieldErrors.dropoffCity"
                    class="field-error"
                  >
                    {{ fieldErrors.dropoffCity }}
                  </div>
                </div>
                <div class="mb-3">
                  <label>State *</label>
                  <select
                    v-model="formData.dropoffState"
                    class="form-control"
                    @blur="fieldTouched.dropoffState = true"
                  >
                    <option value="">Select State</option>
                    <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                  </select>
                  <div
                    v-if="fieldTouched.dropoffState && fieldErrors.dropoffState"
                    class="field-error"
                  >
                    {{ fieldErrors.dropoffState }}
                  </div>
                </div>
                <div class="mb-3">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    v-model="formData.dropoffZip"
                    class="form-control"
                    :class="{ invalid: fieldTouched.dropoffZip && fieldErrors.dropoffZip }"
                    @blur="fieldTouched.dropoffZip = true"
                    maxlength="5"
                    placeholder="76001"
                  />
                  <div v-if="fieldTouched.dropoffZip && fieldErrors.dropoffZip" class="field-error">
                    {{ fieldErrors.dropoffZip }}
                  </div>
                </div>
                <div class="mb-3">
                  <label>Building</label>
                  <input
                    type="text"
                    v-model="formData.dropoffBuilding"
                    class="form-control"
                    placeholder="Building name or organization (optional)"
                  />
                </div>
                <div class="mb-3">
                  <label>Floor</label>
                  <input
                    type="text"
                    v-model="formData.dropoffFloor"
                    class="form-control"
                    placeholder="Floor (optional)"
                  />
                </div>
              </div>
              <!-- Tab 3: Additional Info -->
              <div v-if="currentTab === 3">
                <div class="mb-4">
                  <label>Upload Photos</label>
                  <!-- FileUpload component can be added here if needed -->
                </div>
                <div class="mb-4">
                  <label>Additional Details</label>
                  <textarea
                    v-model="formData.description"
                    class="form-control"
                    rows="5"
                    placeholder="Tell us more about your move (optional)"
                  ></textarea>
                </div>
                <div class="mb-4">
                  <label>How Did You Hear About Us?</label>
                  <select v-model="formData.hearAboutUs" class="form-control">
                    <option value="">Select an option (optional)</option>
                    <option v-for="source in referralSources" :key="source" :value="source">
                      {{ source }}
                    </option>
                  </select>
                </div>
                <!-- Summary Card -->
                <div class="summary-card">
                  <h5>Request Summary</h5>
                  <div><strong>Name:</strong> {{ formData.firstName }} {{ formData.lastName }}</div>
                  <div><strong>Phone:</strong> {{ formData.phone }}</div>
                  <div><strong>Service:</strong> {{ formData.helpType }}</div>
                  <div>
                    <strong>From:</strong> {{ formData.pickupCity }}, {{ formData.pickupState }}
                    {{ formData.pickupZip }}
                  </div>
                  <div>
                    <strong>To:</strong> {{ formData.dropoffCity }}, {{ formData.dropoffState }}
                    {{ formData.dropoffZip }}
                  </div>
                  <div><strong>Date:</strong> {{ formData.pickupDate }}</div>
                  <div><strong>Time:</strong> {{ formData.pickupTime }}</div>
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
                <div v-if="currentTab === 1" style="width: 1px"></div>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nextTab"
                  v-if="currentTab < 3"
                >
                  Next<i class="fas fa-arrow-right ms-2"></i>
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  v-if="currentTab === 3"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">
                    <i class="fas fa-paper-plane me-2"></i>Submit Request
                  </span>
                  <span v-else> <i class="fas fa-spinner fa-spin me-2"></i>Sending... </span>
                </button>
              </div>
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
</template>

<script>
export default {
  name: 'MovingForm',
  data() {
    return {
      currentTab: 1,
      tabs: [
        { id: 1, label: 'Personal Info', icon: 'fas fa-user' },
        { id: 2, label: 'Location Details', icon: 'fas fa-map-marker-alt' },
        { id: 3, label: 'Additional Info', icon: 'fas fa-clipboard-list' },
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
      serviceTypes: [
        { value: 'packing', label: 'Packing Only' },
        { value: 'moving', label: 'Moving Only' },
        { value: 'storage', label: 'Storage Only' },
        { value: 'packing-moving', label: 'Packing & Moving' },
        { value: 'full-service', label: 'Full Service (All)' },
      ],
      states: ['TX', 'OK', 'AR', 'LA', 'NM', 'CO', 'KS', 'MO'],
      timeOptions: [
        { value: 'morning', label: 'Morning' },
        { value: 'afternoon', label: 'Afternoon' },
      ],
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
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
  },
  methods: {
    goToTab(tabId) {
      this.currentTab = tabId
    },
    nextTab() {
      let isValid = true
      if (this.currentTab === 1) isValid = this.validateTab1()
      else if (this.currentTab === 2) isValid = this.validateTab2()
      if (isValid) this.currentTab++
      else {
        this.submitMessage = 'Please fill in all required fields correctly'
        this.submitSuccess = false
        setTimeout(() => {
          this.submitMessage = ''
        }, 3000)
      }
    },
    previousTab() {
      if (this.currentTab > 1) this.currentTab--
    },
    validateTab1() {
      // ...same validation logic as before
      const requiredFields = ['firstName', 'lastName', 'phone', 'helpType']
      let isValid = true
      const newErrors = { ...this.fieldErrors }
      const newTouched = { ...this.fieldTouched }
      requiredFields.forEach((field) => {
        newTouched[field] = true
        if (field === 'phone') {
          newErrors[field] = this.formData[field] ? '' : 'Phone is required'
          if (!this.formData[field]) isValid = false
        } else if (field === 'helpType') {
          newErrors[field] = this.formData[field] ? '' : 'Please select a service type'
          if (!this.formData[field]) isValid = false
        } else {
          newErrors[field] = this.formData[field] ? '' : 'This field is required'
          if (!this.formData[field]) isValid = false
        }
      })
      if (!isValid) {
        this.fieldErrors = newErrors
        this.fieldTouched = newTouched
      }
      return isValid
    },
    validateTab2() {
      // ...same validation logic as before
      const requiredFields = [
        'pickupCity',
        'pickupState',
        'pickupZip',
        'pickupDate',
        'pickupTime',
        'dropoffCity',
        'dropoffState',
        'dropoffZip',
      ]
      let isValid = true
      const newErrors = { ...this.fieldErrors }
      const newTouched = { ...this.fieldTouched }
      requiredFields.forEach((field) => {
        newTouched[field] = true
        newErrors[field] = this.formData[field] ? '' : 'This field is required'
        if (!this.formData[field]) isValid = false
      })
      if (!isValid) {
        this.fieldErrors = newErrors
        this.fieldTouched = newTouched
      }
      return isValid
    },
    async handleSubmit() {
      // ...same as before, can be copied from Moving.vue
      this.isSubmitting = true
      this.submitMessage = ''
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false
        this.submitSuccess = true
        this.submitMessage = 'Thank you! Your moving service request has been submitted.'
        setTimeout(() => {
          this.currentTab = 1
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
        }, 4000)
      }, 2000)
    },
  },
}
</script>

<style scoped>
/* ...existing styles... */
</style>
