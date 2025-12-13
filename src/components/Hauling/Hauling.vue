<template>
  <section class="section section-dark py-5">
    <div class="container-lg">
      <!-- Hero Section -->
      <PageHeader>
        <template #title>Hauling</template>
        <template #subtitle
          >Fast, affordable, and eco-friendly junk removal services. From single items to full
          truckloads—get your instant quote in seconds.</template
        >
      </PageHeader>

      <!-- Main Instant Estimate Section -->
      <div class="row g-4 align-items-stretch">
        <!-- Left Column: Visual Slider -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <h3 class="text-white mb-4">Get Your Instant Estimate</h3>
            <p class="text-gray small mb-4">
              Adjust the slider to match your load size or click the truck segments. Upload photos
              for a more accurate quote.
            </p>

            <!-- Truck Container Visualization -->
            <div class="truck-container mb-4">
              <div class="truck-area">
                <!-- Tractor -->
                <div class="tractor">
                  <div class="hood"></div>
                  <div class="cab-body">
                    <div class="cab-window"></div>
                  </div>
                  <div class="exhaust"></div>
                </div>
                <!-- Trailer with interactive segments -->
                <div class="trailer">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="trailer-segment"
                    :class="{ active: i <= currentTierIndex }"
                    @click="onSegmentClick(i)"
                  ></div>
                </div>
                <!-- Wheels -->
                <div class="wheels">
                  <div class="wheel front"></div>
                  <div class="wheel back"></div>
                  <div class="wheel trailer1"></div>
                  <div class="wheel trailer2"></div>
                  <div class="wheel trailer3"></div>
                </div>
              </div>
            </div>
            <!-- Load Slider -->
            <div class="load-slider-container">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <label class="text-white fw-bold">Load Control</label>
                <div class="load-tier-display bg-secondary-dark px-3 py-2 rounded">
                  <span class="text-orange fw-bold">{{ currentTier }}</span>
                </div>
              </div>

              <div class="slider-wrapper mb-3">
                <input
                  type="range"
                  class="slider"
                  min="0"
                  max="4"
                  :value="currentTierIndex"
                  @input="handleSliderInput"
                  :style="{
                    background: `linear-gradient(to right, var(--accent-orange) 0%, var(--accent-orange) ${(currentTierIndex / 4) * 100}%, var(--white-10) ${(currentTierIndex / 4) * 100}%, var(--white-10) 100%)`,
                  }"
                />
              </div>

              <!-- Tier Buttons -->
              <div class="tier-buttons mb-3">
                <button
                  class="tier-btn"
                  :class="{ selected: currentTierIndex === 0 }"
                  @click="setBed(0)"
                >
                  Pickup Bed
                </button>
                <button
                  class="tier-btn"
                  :class="{ selected: currentTierIndex === 1 }"
                  @click="setBed(1)"
                >
                  1/4
                </button>
                <button
                  class="tier-btn"
                  :class="{ selected: currentTierIndex === 2 }"
                  @click="setBed(2)"
                >
                  1/2
                </button>
                <button
                  class="tier-btn"
                  :class="{ selected: currentTierIndex === 3 }"
                  @click="setBed(3)"
                >
                  3/4
                </button>
                <button
                  class="tier-btn"
                  :class="{ selected: currentTierIndex === 4 }"
                  @click="setBed(4)"
                >
                  Full
                </button>
                <button class="tier-btn clear-btn" @click="setBed(0)">Clear</button>
              </div>

              <div class="d-flex justify-content-between text-small text-gray">
                <span>Load: {{ loadPercentage }}%</span>
                <span>Tier: {{ tierName }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Estimate & Booking -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <!-- Price Display -->
            <div class="price-display mb-4 pb-4">
              <p class="text-small text-gray mb-2">Your Estimated Price</p>
              <h2 class="h1 mb-2">${{ estimatedPrice }}</h2>
              <p class="text-small text-gray mb-0">
                Starting price for {{ currentTier }}. Final pricing may vary based on item type,
                accessibility, stairs, and disposal requirements. Minimum charge $125.
              </p>
            </div>

            <!-- Booking Form -->
            <form @submit.prevent="handleSubmit">
              <input type="hidden" name="load_size" :value="currentTier" />
              <input type="hidden" name="estimated_price" :value="estimatedPrice" />

              <!-- Name & Phone -->
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2"
                    >Name <span class="text-orange">*</span></label
                  >
                  <input
                    v-model="formData.name"
                    type="text"
                    name="name"
                    class="form-control"
                    :class="{ invalid: fieldTouched.name && fieldErrors.name }"
                    placeholder="John Doe"
                    @blur="validateField('name')"
                    @input="clearFieldError('name')"
                  />
                  <div v-if="fieldTouched.name && fieldErrors.name" class="field-error">
                    {{ fieldErrors.name }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2"
                    >Phone <span class="text-orange">*</span></label
                  >
                  <input
                    v-model="formData.phone"
                    type="tel"
                    name="phone"
                    class="form-control"
                    :class="{ invalid: fieldTouched.phone && fieldErrors.phone }"
                    placeholder="(555) 123-4567"
                    @blur="validateField('phone')"
                    @input="handlePhoneInput"
                  />
                  <div v-if="fieldTouched.phone && fieldErrors.phone" class="field-error">
                    {{ fieldErrors.phone }}
                  </div>
                </div>
              </div>

              <!-- Email & ZIP -->
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">
                    Email <span class="text-orange">*</span>
                  </label>
                  <input
                    v-model="formData.email"
                    type="email"
                    name="email"
                    class="form-control"
                    :class="{ invalid: fieldTouched.email && fieldErrors.email }"
                    placeholder="john@example.com"
                    @blur="validateField('email')"
                    @input="clearFieldError('email')"
                  />
                  <div v-if="fieldTouched.email && fieldErrors.email" class="field-error">
                    {{ fieldErrors.email }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2"
                    >ZIP Code <span class="text-orange">*</span></label
                  >
                  <input
                    v-model="formData.zip"
                    type="text"
                    name="zip"
                    class="form-control"
                    :class="{ invalid: fieldTouched.zip && fieldErrors.zip }"
                    placeholder="75001"
                    maxlength="10"
                    @blur="validateField('zip')"
                    @input="clearFieldError('zip')"
                  />
                  <div v-if="fieldTouched.zip && fieldErrors.zip" class="field-error">
                    {{ fieldErrors.zip }}
                  </div>
                </div>
              </div>

              <!-- Photo Upload -->
              <FileUpload
                v-model="uploadedFiles"
                label="Upload Photos"
                name="attachments"
                placeholder="Drag & drop or click to browse"
                accept="image/*,application/pdf"
                :required="true"
                :max-size="10 * 1024 * 1024"
                :max-files="10"
                :error-message="fieldErrors.files"
                :show-error="fieldTouched.files"
                @change="handleFilesChange"
                class="py-3"
              />

              <!-- Policy Agreement -->
              <div class="policy-agreement mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="formData.agreeToPolicy"
                    @change="clearFieldError('agreeToPolicy')"
                    id="agreeToPolicyHauling"
                  />
                  <label class="form-check-label text-white" for="agreeToPolicyHauling">
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

              <!-- Action Buttons -->
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary flex-grow-1" :disabled="isSubmitting">
                  <span v-if="!isSubmitting">
                    <i class="fas fa-paper-plane me-2"></i>Book Now - ${{ estimatedPrice }}
                  </span>
                  <span v-else> <i class="fas fa-spinner fa-spin me-2"></i>Sending... </span>
                </button>
                <button type="button" class="btn btn-outline-primary" @click="scrollToPricingTiers">
                  <span>View All Tiers</span>
                </button>
              </div>

              <!-- Success/Error Messages -->
              <div
                v-if="submitMessage"
                class="mt-3 p-3 rounded"
                :class="
                  submitSuccess
                    ? 'bg-success bg-opacity-10 border border-success'
                    : 'bg-danger bg-opacity-10 border border-danger'
                "
              >
                <p class="mb-0 small" :class="submitSuccess ? 'text-success' : 'text-danger'">
                  <i
                    :class="submitSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"
                    class="me-2"
                  ></i>
                  {{ submitMessage }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Pricing Tiers Section -->
      <div class="mt-5 pt-5" id="pricingTiers">
        <h2 class="text-white mb-4 text-center">Our Pricing Tiers</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(tier, index) in pricingTiers" :key="tier.id">
            <PricingCard
              :title="tier.name"
              :description="tier.description"
              :price="tier.price"
              :features="tier.features"
              button-text="Choose this tier"
              @select="selectTier(index)"
            />
          </div>
        </div>
      </div>

      <!-- Why Choose Us Section -->
      <div class="mt-5 pt-5" style="border-top: 1px solid var(--orange-10)">
        <h2 class="text-white mb-4">Why Choose <span class="text-orange">Us</span></h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="benefit in benefits" :key="benefit.title">
            <BenefitCard
              :icon="benefit.icon"
              :title="benefit.title"
              :description="benefit.description"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PageHeader from './PageHeader.vue'
import PricingCard from './PricingCard.vue'
import BenefitCard from './BenefitCard.vue'
import FileUpload from '../Shared/FileUpload.vue'
import { validators } from '../../utils/validators.js'

export default {
  name: 'Hauling',
  components: {
    PageHeader,
    PricingCard,
    BenefitCard,
    FileUpload,
  },
  data() {
    return {
      currentTierIndex: 0,
      uploadedFiles: [],
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false,
      formData: {
        name: '',
        phone: '',
        email: '',
        zip: '',
        agreeToPolicy: false,
      },
      fieldErrors: {
        name: '',
        phone: '',
        email: '',
        zip: '',
        files: '',
        agreeToPolicy: '',
      },
      fieldTouched: {
        name: false,
        phone: false,
        email: false,
        zip: false,
        files: false,
        agreeToPolicy: false,
      },
      pricingTiers: [
        {
          id: 1,
          name: 'Pickup Bed',
          description: 'Perfect for small cleanups—a few items or bags',
          price: 125,
          features: [
            'Pickup truck bed capacity',
            'Ideal for 1-3 small items',
            'Same-day service available',
            'Eco-friendly disposal included',
          ],
        },
        {
          id: 2,
          name: '1/4 Truck Load',
          description: 'Great for minor cleanouts and small furniture',
          price: 200,
          features: [
            '1/4 of a full truck load',
            'Perfect for appliance removal',
            'Fast scheduling',
            'Responsible recycling & donation',
          ],
        },
        {
          id: 3,
          name: '1/2 Truck Load',
          description: 'Ideal for room cleanouts and medium projects',
          price: 400,
          features: [
            '1/2 of a full truck load',
            'Garage or basement cleanouts',
            'Furniture & mattress removal',
            'Sorting and recycling included',
          ],
        },
        {
          id: 4,
          name: '3/4 Truck Load',
          description: 'Best for multi-room cleanouts and large items',
          price: 600,
          features: [
            '3/4 of a full truck load',
            'Multiple large furniture pieces',
            'Professional 2-person crew',
            'Same-day pickup available',
          ],
        },
        {
          id: 5,
          name: 'Full Truck Load',
          description: 'Complete estate or property cleanouts',
          price: 800,
          features: [
            'Entire truck bed capacity',
            'Full home or office cleanouts',
            'Multiple trips if needed',
            'Premium white-glove service',
          ],
        },
      ],
      benefits: [
        {
          icon: 'fas fa-bolt',
          title: 'Same-Day Service',
          description: 'Quick turnaround with same-day pickup available. Fast space clearing.',
        },
        {
          icon: 'fas fa-hand-holding-heart',
          title: 'Co-Conscious',
          description: 'We donate usable items to local charities before recycling or disposal.',
        },
        {
          icon: 'fas fa-tag',
          title: 'Transparent Pricing',
          description: 'No hidden fees or surprises. What you see is what you pay—guaranteed.',
        },
        {
          icon: 'fas fa-users',
          title: 'Expert Crew',
          description: 'Licensed, insured professionals who treat your property with care.',
        },
      ],
    }
  },
  computed: {
    tiers() {
      return ['Pickup Bed', '1/4', '1/2', '3/4', 'Full']
    },
    tierPrices() {
      return [125, 200, 400, 600, 800]
    },
    currentTier() {
      return this.tiers[this.currentTierIndex]
    },
    tierName() {
      const names = ['Pickup Bed', 'Quarter Load', 'Half Load', 'Three-Quarter Load', 'Full Load']
      return names[this.currentTierIndex]
    },
    estimatedPrice() {
      return this.tierPrices[this.currentTierIndex]
    },
    loadPercentage() {
      return Math.round((this.currentTierIndex / 4) * 100)
    },
  },
  methods: {
    handleSliderInput(event) {
      this.currentTierIndex = parseInt(event.target.value)
    },
    setBed(n) {
      this.currentTierIndex = Math.min(4, Math.max(0, n))
    },
    onSegmentClick(i) {
      // Toggle segment: if clicking the last active segment, decrease by 1, otherwise set to that segment
      if (this.currentTierIndex === i) {
        this.setBed(i - 1)
      } else {
        this.setBed(i)
      }
    },
    handleFilesChange(files) {
      this.validateField('files')
    },
    validateField(fieldName) {
      this.fieldTouched[fieldName] = true

      if (fieldName === 'files') {
        const result = validators.files.validate(this.uploadedFiles, {
          required: true,
          maxSize: 10 * 1024 * 1024, // 10MB
          maxFiles: 10,
        })
        this.fieldErrors.files = result.error
        return result.valid
      }

      if (fieldName === 'email') {
        const result = validators.email.validate(this.formData.email, true)
        this.fieldErrors.email = result.error
        return result.valid
      }

      const result = validators[fieldName].validate(this.formData[fieldName])
      this.fieldErrors[fieldName] = result.error
      return result.valid
    },
    clearFieldError(fieldName) {
      this.fieldErrors[fieldName] = ''
    },
    handlePhoneInput() {
      // Format phone number as user types
      this.formData.phone = validators.phone.format(this.formData.phone)
      this.clearFieldError('phone')
    },
    validateAllFields() {
      const fields = ['name', 'phone', 'email', 'zip', 'files']
      let isValid = true

      fields.forEach((field) => {
        if (!this.validateField(field)) {
          isValid = false
        }
      })

      // Validate policy agreement
      if (!this.formData.agreeToPolicy) {
        this.fieldTouched.agreeToPolicy = true
        this.fieldErrors.agreeToPolicy = 'You must agree to the Privacy Policy and Terms of Service'
        isValid = false
      }

      return isValid
    },
    async handleSubmit(event) {
      // Validate all fields before submitting
      if (!this.validateAllFields()) {
        this.submitSuccess = false
        this.submitMessage = 'Please fix the errors before submitting'
        return
      }

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        // Build FormData with all form fields and files
        const formData = new FormData()
        formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
        formData.append('form', 'Hauling')
        formData.append('name', this.formData.name)
        formData.append('phone', this.formData.phone)
        formData.append('email', this.formData.email || '')
        formData.append('zip', this.formData.zip)
        formData.append('load_size', this.currentTier)
        formData.append('estimated_price', '$' + this.estimatedPrice)

        // Create a text field with file information for Google Sheets
        const fileList = this.uploadedFiles
          .map(
            (file, index) =>
              `File ${index + 1}: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
          )
          .join(' | ')
        formData.append('attachments', fileList || 'No files uploaded')

        // Add all uploaded files as attachment
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
            "Thank you! Your booking request has been submitted. We'll contact you within 24 hours."

          // Reset form after 3 seconds
          setTimeout(() => {
            this.formData = {
              name: '',
              phone: '',
              email: '',
              zip: '',
            }
            this.uploadedFiles = []
            this.submitMessage = ''
            this.fieldErrors = {
              name: '',
              phone: '',
              email: '',
              zip: '',
              files: '',
            }
            this.fieldTouched = {
              name: false,
              phone: false,
              email: false,
              zip: false,
              files: false,
            }
            this.$refs.fileInput.value = ''
          }, 3000)
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
    // Smooth-scroll to the pricing tiers section
    scrollToPricingTiers() {
      const el = document.getElementById('pricingTiers')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    selectTier(index) {
      this.currentTierIndex = index
      // Scroll to the estimate section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
label {
  font-weight: 700;
}

.text-small {
  font-size: 0.875rem;
}

/* Truck Container */
.truck-container {
  background: var(--primary-dark);
  padding: 2rem;
  border-radius: var(--radius-xl);
  border: 2px solid var(--orange-10);
}

.truck-area {
  position: relative;
  height: 230px;
  width: 100%;
}

/* Tractor */
.tractor {
  position: absolute;
  left: 0;
  bottom: 30px;
  width: 28%;
  height: 90px;
  display: flex;
  align-items: flex-end;
}

.hood {
  position: relative;
  left: 3%;
  width: 40%;
  height: 69px;
  background: var(--primary-dark);
  border: 2px solid var(--text-gray);
  border-radius: 6px;
  border-right: none;
}

.cab-body {
  position: relative;
  width: 60%;
  height: 85px;
  background: var(--primary-dark);
  border: 2px solid var(--text-gray);
  border-left: none;
  border-radius: 6px 6px 4px 0;
}

.cab-body::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 10%;
  width: 80%;
  height: 36px;
  background: var(--primary-dark);
  border: 2px solid var(--text-gray);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.cab-window {
  position: absolute;
  top: 5px;
  left: 22%;
  width: 50%;
  height: 30px;
  background: var(--secondary-dark);
  border: 2px solid var(--orange-10);
  border-radius: 4px;
}

.exhaust {
  position: absolute;
  right: -6px;
  bottom: 60px;
  width: 8px;
  height: 50px;
  background: var(--primary-dark);
  border: 2px solid var(--text-gray);
  border-radius: 4px;
}

/* Trailer */
.trailer {
  position: absolute;
  left: 28%;
  bottom: 30px;
  width: 72%;
  height: 90px;
  background: var(--primary-dark);
  border: 2px solid var(--text-gray);
  border-radius: 4px;
  display: flex;
  overflow: hidden;
}

.trailer-segment {
  flex: 1;
  border-right: 1px dashed var(--orange-10);
  background: var(--secondary-dark);
  transition:
    background 0.25s,
    box-shadow 0.25s;
  cursor: pointer;
}

.trailer-segment:last-child {
  border-right: none;
}

.trailer-segment.active {
  background: var(--orange-20);
  box-shadow:
    inset 0 0 0 0.1px var(--accent-orange),
    0 0 10px var(--orange-20);
}

.trailer-segment:hover {
  background: var(--orange-10);
}

/* Wheels */
.wheels {
  position: absolute;
  bottom: 0;
  left: 7%;
  width: 100%;
  height: 40px;
}

.wheel {
  position: absolute;
  bottom: 0;
  width: 32px;
  height: 32px;
  background: var(--secondary-dark);
  border: 4px solid var(--text-gray);
  border-radius: 50%;
  box-shadow: inset 0 0 0 3px var(--primary-dark);
}

.wheel.front {
  left: 28%;
}

.wheel.trailer1 {
  left: 35%;
}

.wheel.trailer2 {
  left: 70%;
}

.wheel.trailer3 {
  left: 77%;
}

/* Slider */
.slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  transition: var(--transition-base);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent-orange);
  cursor: pointer;
  box-shadow: 0 0 10px var(--orange-20);
  transition: var(--transition-base);
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 15px var(--orange-20);
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent-orange);
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px var(--orange-20);
  transition: var(--transition-base);
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 15px var(--orange-20);
}

/* Load Display */
.load-tier-display {
  background-color: var(--secondary-dark);
  border: 1px solid var(--orange-10);
}

/* Tier Buttons */
.tier-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tier-btn {
  padding: 6px 12px;
  border: 1px solid var(--orange-10);
  border-radius: 6px;
  background: var(--secondary-dark);
  color: var(--text-light);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-base);
  flex: 1;
  min-width: 60px;
}

.tier-btn:hover {
  background: var(--orange-10);
  border-color: var(--accent-orange);
}

.tier-btn.selected {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 8px var(--orange-20);
}

.tier-btn.clear-btn {
  opacity: 0.8;
  flex: 0 0 auto;
}

.tier-btn.clear-btn:hover {
  opacity: 1;
  background: var(--orange-10);
}

/* Price Display */
.price-display {
  border-bottom: 1px solid var(--orange-20);
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

/* Responsive */
@media (max-width: 768px) {
  .truck-area {
    height: 180px;
  }

  .tractor {
    width: 30%;
    height: 70px;
  }

  .exhaust {
    height: 40px;
    bottom: 45px;
  }

  .trailer {
    left: 30%;
    width: 70%;
    height: 70px;
  }

  .wheel {
    width: 24px;
    height: 24px;
  }

  .d-flex.gap-2 {
    flex-direction: column;
  }
}
</style>
