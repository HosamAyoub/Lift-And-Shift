<template>
  <section class="section section-dark py-5">
    <div class="container-lg">
      <!-- Hero Section -->
      <div class="mb-5 pb-4">
        <h2 class="mb-3">Demolition</h2>
        <p class="text-gray mb-0">Plan your demolition with an instant scope + price ballpark.</p>
      </div>

      <!-- Main Instant Estimate Section -->
      <div class="row g-4 align-items-stretch">
        <!-- Left Column: Visual Controls -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <h3 class="text-white mb-4">Demolition Scope</h3>
            <p class="text-gray small mb-4">
              Select the structure and project details to generate a fast, transparent estimate.
              Your final quote is confirmed after we review your photos or complete a brief
              walkthrough.
            </p>

            <!-- Scope Selection -->
            <div class="mb-4">
              <label class="text-white fw-bold d-block mb-3">Select Structure Type</label>
              <div class="scope-buttons">
                <button
                  v-for="scope in scopes"
                  :key="scope"
                  class="scope-btn"
                  :class="{ active: selectedScope === scope }"
                  @click="selectScope(scope)"
                >
                  {{ scopeLabels[scope] }}
                </button>
              </div>
            </div>

            <!-- Area Slider -->
            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <label class="text-white fw-bold">{{ scopeLabels[selectedScope] }} Size</label>
                <div class="load-tier-display bg-secondary-dark px-3 py-2 rounded">
                  <span class="text-orange fw-bold">{{ area }} {{ currentUnit }}</span>
                </div>
              </div>

              <div class="slider-wrapper">
                <input
                  type="range"
                  class="slider"
                  :key="selectedScope"
                  :min="currentConfig.slider.min"
                  :max="currentConfig.slider.max"
                  :step="selectedScope === 'fence' || selectedScope === 'interiorWall' ? 2 : 5"
                  v-model.number="area"
                  @input="updateArea"
                  :style="sliderStyle"
                />
              </div>

              <div class="d-flex justify-content-between mt-3 text-small text-gray">
                <span>{{ currentConfig.slider.min }} {{ currentUnit }}</span>
                <span>{{ currentConfig.slider.max }} {{ currentUnit }}</span>
              </div>

              <div class="d-flex justify-content-between mt-2 text-small text-gray">
                <span>{{ sizeDescriptor }}</span>
              </div>

              <div class="d-flex justify-content-between mt-2 text-small text-gray">
                <span>Debris: ≈{{ debrisYards }} yd³</span>
                <span>{{ truckloadText }}</span>
              </div>
            </div>

            <!-- Material Selection -->
            <div class="mb-4">
              <label class="text-white fw-bold d-block mb-2">Material</label>
              <select v-model="material" class="form-control" @change="updateMaterial">
                <option
                  v-for="option in currentMaterialOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Checkbox Options -->
            <div class="mb-4">
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    v-model="includesConcrete"
                    @change="updateConcrete"
                    class="checkbox-input"
                  />
                  <span class="checkmark"></span>
                  Includes concrete/footings
                </label>
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    v-model="upstairsAccess"
                    @change="updateUpstairs"
                    class="checkbox-input"
                  />
                  <span class="checkmark"></span>
                  Upstairs / tight access
                </label>
              </div>
            </div>

            <!-- What Happens Next -->
            <div class="steps-section mb-4">
              <h5 class="text-white mb-3">What Happens Next?</h5>
              <ol class="steps-list">
                <li>A demolition specialist reviews your scope and photos the same day.</li>
                <li>You receive a confirmed, written quote with no hidden fees.</li>
                <li>We schedule your project with a guaranteed arrival window.</li>
              </ol>
            </div>

            <!-- How Range is Calculated -->
            <div class="explain-section">
              <h5 class="text-white mb-2">How This Range is Calculated</h5>
              <p class="text-gray small mb-0">
                Your range is generated using DFW-area standards and factors in: project size,
                debris volume, material type, access conditions, and disposal rates. Most projects
                fall within ±15% of this range once photos are reviewed.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Estimate & Booking -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <!-- Price Display -->
            <div class="price-display mb-4 pb-4">
              <p class="text-small text-gray mb-2">Estimated Project Range</p>
              <h2 class="h1 mb-2">
                $<span class="text-white">{{ priceLow }}</span> - $<span class="text-white">{{
                  priceHigh
                }}</span>
              </h2>
              <p class="text-small text-gray mb-0">
                This range includes demolition labor, equipment, load-up, and standard disposal
                fees. Final pricing is confirmed after reviewing your photos or completing a brief
                walkthrough.
              </p>
            </div>

            <!-- Project Summary -->
            <div class="project-details mb-4">
              <h5 class="text-white mb-3">Project Summary</h5>
              <div class="detail-item d-flex justify-content-between mb-2">
                <span class="text-gray">Scope:</span>
                <span class="text-white"
                  >{{ currentConfig.label }} — {{ area }} {{ currentUnit }}</span
                >
              </div>
              <div class="detail-item d-flex justify-content-between mb-2">
                <span class="text-gray">Size:</span>
                <span class="text-white">{{ sizeDescriptor }}</span>
              </div>
              <div class="detail-item d-flex justify-content-between mb-2">
                <span class="text-gray">Debris:</span>
                <span class="text-white">≈{{ debrisYards }} yd³ ({{ truckloadText }})</span>
              </div>
              <div class="detail-item d-flex justify-content-between mb-2">
                <span class="text-gray">Material:</span>
                <span class="text-white">{{ materialLabel }}</span>
              </div>
              <div class="detail-item d-flex justify-content-between mb-2" v-if="includesConcrete">
                <span class="text-gray">Concrete:</span>
                <span class="text-orange">✓ Included</span>
              </div>
              <div class="detail-item d-flex justify-content-between mb-2" v-if="upstairsAccess">
                <span class="text-gray">Access:</span>
                <span class="text-orange">✓ Upstairs/Tight</span>
              </div>
            </div>

            <!-- Booking Form -->
            <form @submit.prevent="handleSubmit" class="mb-4">
              <h5 class="text-white mb-3">Request Quote</h5>

              <!-- Name & Phone -->
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2"
                    >Name <span class="text-orange">*</span></label
                  >
                  <input
                    type="text"
                    v-model="formData.name"
                    @input="clearFieldError('name')"
                    @blur="validateField('name')"
                    class="form-control"
                    :class="{ invalid: fieldTouched.name && fieldErrors.name }"
                    placeholder="Your full name"
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
                    type="tel"
                    v-model="formData.phone"
                    @input="handlePhoneInput"
                    @blur="validateField('phone')"
                    class="form-control"
                    :class="{ invalid: fieldTouched.phone && fieldErrors.phone }"
                    placeholder="(555) 123-4567"
                  />
                  <div v-if="fieldTouched.phone && fieldErrors.phone" class="field-error">
                    {{ fieldErrors.phone }}
                  </div>
                </div>
              </div>

              <!-- Email & ZIP -->
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Email</label>
                  <input
                    type="email"
                    v-model="formData.email"
                    @input="clearFieldError('email')"
                    @blur="validateField('email')"
                    class="form-control"
                    :class="{ invalid: fieldTouched.email && fieldErrors.email }"
                    placeholder="your@email.com (optional)"
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
                    type="text"
                    v-model="formData.zip"
                    @input="clearFieldError('zip')"
                    @blur="validateField('zip')"
                    class="form-control"
                    :class="{ invalid: fieldTouched.zip && fieldErrors.zip }"
                    placeholder="75001"
                    maxlength="5"
                  />
                  <div v-if="fieldTouched.zip && fieldErrors.zip" class="field-error">
                    {{ fieldErrors.zip }}
                  </div>
                </div>
              </div>

              <!-- Photo Upload -->
              <FileUpload
                v-model="uploadedFiles"
                label="Upload Demo Photos"
                name="demo_photos"
                placeholder="Drag & drop or click to browse"
                accept="image/*,video/*,application/pdf"
                :required="true"
                :max-size="10 * 1024 * 1024"
                :max-files="10"
                :error-message="fieldErrors.files"
                :show-error="fieldTouched.files"
                @change="handleFilesChange"
                class="mb-4"
              />

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitting">
                <span v-if="!isSubmitting">
                  <i class="fas fa-paper-plane me-2"></i>Request Free Quote
                </span>
                <span v-else> <i class="fas fa-spinner fa-spin me-2"></i>Sending... </span>
              </button>

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
      <div class="mt-5 pt-5" style="border-top: 1px solid var(--orange-10); padding-top: 3rem">
        <h2 class="text-white mb-4">Why Choose <span class="text-orange">Us</span></h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="feature in features" :key="feature.title">
            <div class="text-center">
              <div class="mb-3">
                <i :class="feature.icon" style="font-size: 2.5rem; color: var(--accent-orange)"></i>
              </div>
              <h5 class="text-white mb-2">{{ feature.title }}</h5>
              <p class="text-gray small">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FileUpload from '../Shared/FileUpload.vue'
import { validators } from '../../utils/validators.js'

export default {
  name: 'Demolition',
  components: {
    FileUpload,
  },
  emits: ['update:scope', 'update:area', 'update:material', 'update:concrete', 'update:upstairs'],
  data() {
    return {
      scopes: ['bathroom', 'kitchen', 'interiorWall', 'shed', 'deck', 'fence'],
      scopeLabels: {
        bathroom: 'Bathroom',
        kitchen: 'Kitchen',
        interiorWall: 'Interior Wall',
        shed: 'Shed',
        deck: 'Deck',
        fence: 'Fence',
      },
      selectedScope: 'bathroom',
      area: 45,
      material: 'tile',
      includesConcrete: false,
      upstairsAccess: false,
      uploadedFiles: [],
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false,
      formData: {
        name: '',
        phone: '',
        email: '',
        zip: '',
      },
      fieldErrors: {
        name: '',
        phone: '',
        email: '',
        zip: '',
        files: '',
      },
      fieldTouched: {
        name: false,
        phone: false,
        email: false,
        zip: false,
        files: false,
      },
      config: {
        bathroom: {
          label: 'Bathroom demolition',
          unit: 'sq ft',
          lowRate: 18,
          highRate: 30,
          minLow: 550,
          minHigh: 900,
          slider: { min: 10, max: 80, defaultValue: 45 },
        },
        kitchen: {
          label: 'Kitchen demolition',
          unit: 'sq ft',
          lowRate: 20,
          highRate: 32,
          minLow: 900,
          minHigh: 1800,
          slider: { min: 25, max: 140, defaultValue: 90 },
        },
        interiorWall: {
          label: 'Interior wall removal',
          unit: 'linear ft',
          lowRate: 22,
          highRate: 38,
          minLow: 300,
          minHigh: 650,
          slider: { min: 6, max: 40, defaultValue: 24 },
        },
        shed: {
          label: 'Shed demolition',
          unit: 'sq ft',
          lowRate: 6,
          highRate: 9,
          minLow: 300,
          minHigh: 500,
          slider: { min: 40, max: 200, defaultValue: 80 },
        },
        deck: {
          label: 'Deck demolition',
          unit: 'sq ft',
          lowRate: 7,
          highRate: 11,
          minLow: 400,
          minHigh: 700,
          slider: { min: 60, max: 350, defaultValue: 140 },
        },
        fence: {
          label: 'Fence removal',
          unit: 'linear ft',
          lowRate: 3.2,
          highRate: 6,
          minLow: 250,
          minHigh: 600,
          slider: { min: 20, max: 220, defaultValue: 80 },
        },
      },
      materialMultipliers: {
        wood: 1.0,
        drywall: 1.05,
        tile: 1.25,
        brick: 1.25,
        concrete: 1.35,
        mixed: 1.2,
      },
      materialOptions: {
        bathroom: [
          { value: 'tile', label: 'Tile / Thinset' },
          { value: 'drywall', label: 'Drywall / Sheetrock' },
          { value: 'concrete', label: 'Concrete (pan / curb)' },
          { value: 'mixed', label: 'Mixed Materials' },
        ],
        kitchen: [
          { value: 'drywall', label: 'Drywall / Sheetrock' },
          { value: 'tile', label: 'Tile / Backsplash / Floor' },
          { value: 'brick', label: 'Brick / Masonry' },
          { value: 'concrete', label: 'Concrete' },
          { value: 'mixed', label: 'Mixed Materials' },
        ],
        interiorWall: [
          { value: 'drywall', label: 'Drywall / Sheetrock' },
          { value: 'wood', label: 'Wood / Framing' },
          { value: 'brick', label: 'Brick / Masonry' },
          { value: 'mixed', label: 'Mixed Materials' },
        ],
        shed: [
          { value: 'wood', label: 'Wood Framed Shed' },
          { value: 'mixed', label: 'Mixed / Wood & Metal' },
        ],
        deck: [
          { value: 'wood', label: 'Wood Decking' },
          { value: 'concrete', label: 'Concrete Footings' },
          { value: 'mixed', label: 'Mixed Materials' },
        ],
        fence: [
          { value: 'wood', label: 'Wood Fence' },
          { value: 'mixed', label: 'Wood & Metal / Mixed' },
        ],
      },
      features: [
        {
          icon: 'fas fa-shield-alt',
          title: 'Licensed & Insured',
          description: 'Fully licensed and insured for your peace of mind and protection.',
        },
        {
          icon: 'fas fa-truck-loading',
          title: 'Debris Haul-off',
          description: 'Complete debris removal and eco-friendly disposal included.',
        },
        {
          icon: 'fas fa-wind',
          title: 'Dust Control',
          description: 'Professional dust control and site protection measures.',
        },
        {
          icon: 'fas fa-file-alt',
          title: 'Permit Guidance',
          description: 'Expert assistance with permits and local regulations.',
        },
      ],
    }
  },
  computed: {
    currentConfig() {
      return this.config[this.selectedScope]
    },
    currentUnit() {
      return this.currentConfig.unit
    },
    currentMaterialOptions() {
      return this.materialOptions[this.selectedScope] || []
    },
    debrisYards() {
      let yardsPerUnit
      if (this.selectedScope === 'bathroom' || this.selectedScope === 'kitchen') {
        yardsPerUnit = 0.14
      } else if (this.selectedScope === 'deck' || this.selectedScope === 'shed') {
        yardsPerUnit = 0.09
      } else {
        yardsPerUnit = 0.06
      }
      return (this.area * yardsPerUnit).toFixed(1)
    },
    truckloadText() {
      const yards = parseFloat(this.debrisYards)
      if (yards <= 1.5) return '~½ truckload'
      if (yards <= 3) return '~1 truckload'
      if (yards <= 5) return '~2 truckloads'
      return 'Multiple truckloads'
    },
    sizeDescriptor() {
      const size = this.area
      const scope = this.selectedScope

      if (scope === 'bathroom') {
        if (size <= 30) return 'Small bathroom area'
        if (size <= 60) return 'Standard bathroom'
        return 'Large / primary bathroom'
      } else if (scope === 'kitchen') {
        if (size <= 60) return 'Compact kitchen'
        if (size <= 100) return 'Standard kitchen'
        return 'Large kitchen footprint'
      } else if (scope === 'interiorWall') {
        if (size <= 12) return 'Short interior wall'
        if (size <= 24) return 'Typical interior wall run'
        return 'Extended wall removal'
      } else if (scope === 'shed') {
        if (size <= 80) return 'Small shed'
        if (size <= 140) return 'Medium shed'
        return 'Large or heavy shed'
      } else if (scope === 'deck') {
        if (size <= 120) return 'Small deck'
        if (size <= 220) return 'Medium deck'
        return 'Large / multi-level deck'
      } else if (scope === 'fence') {
        if (size <= 60) return 'Short fence run'
        if (size <= 140) return 'Standard residential run'
        return 'Extended fence removal'
      }
      return ''
    },
    priceLow() {
      const cfg = this.currentConfig
      let low = this.area * cfg.lowRate
      const materialMult = this.materialMultipliers[this.material] || 1.0
      low *= materialMult

      if (this.includesConcrete) low *= 1.2
      if (this.upstairsAccess) low *= 1.15

      low = Math.max(low, cfg.minLow, 250)
      return this.formatCurrency(low)
    },
    priceHigh() {
      const cfg = this.currentConfig
      let high = this.area * cfg.highRate
      const materialMult = this.materialMultipliers[this.material] || 1.0
      high *= materialMult

      if (this.includesConcrete) high *= 1.25
      if (this.upstairsAccess) high *= 1.2

      high = Math.max(high, cfg.minHigh, 300)
      const low = parseFloat(this.priceLow.replace(/,/g, ''))
      high = Math.max(high, low + 100)

      if (high < low * 1.1) high = low * 1.15

      return this.formatCurrency(high)
    },
    materialLabel() {
      const option = this.currentMaterialOptions.find((opt) => opt.value === this.material)
      return option ? option.label : 'Mixed materials'
    },
    sliderStyle() {
      const min = this.currentConfig.slider.min
      const max = this.currentConfig.slider.max
      const value = this.area
      const percentage = ((value - min) / (max - min)) * 100
      return {
        background: `linear-gradient(to right, var(--accent-orange) 0%, var(--accent-orange) ${percentage}%, var(--white-10) ${percentage}%, var(--white-10) 100%)`,
      }
    },
  },
  methods: {
    formatCurrency(value) {
      const rounded = Math.round(value / 25) * 25
      return rounded.toLocaleString('en-US', { maximumFractionDigits: 0 })
    },
    selectScope(scope) {
      this.selectedScope = scope
      const cfg = this.config[scope]
      this.area = cfg.slider.defaultValue

      // Update material to first option for this scope
      const materials = this.materialOptions[scope]
      if (materials && materials.length > 0) {
        this.material = materials[0].value
      }

      this.$emit('update:scope', scope)
    },
    updateArea() {
      this.$emit('update:area', this.area)
    },
    updateMaterial() {
      this.$emit('update:material', this.material)
    },
    updateConcrete() {
      this.$emit('update:concrete', this.includesConcrete)
    },
    updateUpstairs() {
      this.$emit('update:upstairs', this.upstairsAccess)
    },
    handleFilesChange(files) {
      this.validateField('files')
    },
    validateField(fieldName) {
      this.fieldTouched[fieldName] = true

      if (fieldName === 'files') {
        const result = validators.files.validate(this.uploadedFiles, {
          required: false,
          maxSize: 10 * 1024 * 1024,
          maxFiles: 10,
        })
        this.fieldErrors.files = result.error
        return result.valid
      }

      if (fieldName === 'email') {
        const result = validators.email.validate(this.formData.email, false)
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
      this.formData.phone = validators.phone.format(this.formData.phone)
      this.clearFieldError('phone')
    },
    validateAllFields() {
      const fields = ['name', 'phone', 'email', 'zip']
      let isValid = true

      fields.forEach((field) => {
        if (!this.validateField(field)) {
          isValid = false
        }
      })

      return isValid
    },
    async handleSubmit(event) {
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
        formData.append('form', 'Demolition')
        formData.append('name', this.formData.name)
        formData.append('phone', this.formData.phone)
        formData.append('email', this.formData.email || '')
        formData.append('zip', this.formData.zip)
        formData.append('structure_type', this.scopeLabels[this.selectedScope])
        formData.append('area', `${this.area} ${this.currentUnit}`)
        formData.append('material', this.materialLabel)
        formData.append('concrete_footings', this.includesConcrete ? 'Yes' : 'No')
        formData.append('upstairs_access', this.upstairsAccess ? 'Yes' : 'No')
        formData.append('estimated_debris', `${this.debrisYards} yd³ (${this.truckloadText})`)
        formData.append('price_range', `$${this.priceLow} - $${this.priceHigh}`)

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
            "Thank you! Your demolition quote request has been submitted. We'll contact you within 24 hours."

          setTimeout(() => {
            this.formData = { name: '', phone: '', email: '', zip: '' }
            this.uploadedFiles = []
            this.submitMessage = ''
            this.fieldErrors = { name: '', phone: '', email: '', zip: '', files: '' }
            this.fieldTouched = {
              name: false,
              phone: false,
              email: false,
              zip: false,
              files: false,
            }
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
  },
  mounted() {
    this.$emit('update:scope', this.selectedScope)
    this.$emit('update:area', this.area)
    this.$emit('update:material', this.material)
    this.$emit('update:concrete', this.includesConcrete)
    this.$emit('update:upstairs', this.upstairsAccess)
  },
}
</script>

<style scoped>
.scope-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-sm);
}

.scope-btn {
  background: var(--primary-dark);
  border: 1px solid var(--orange-10);
  border-radius: var(--radius-md);
  padding: var(--gap-sm) var(--gap-lg);
  color: var(--text-gray);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition-fast);
  flex: 1;
  min-width: calc(33.333% - var(--gap-sm));
}

.scope-btn:hover {
  background: var(--orange-10);
  border-color: var(--accent-orange);
}

.scope-btn.active {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
  color: var(--bg-dark);
  font-weight: 600;
}

.slider-wrapper {
  position: relative;
}

.slider {
  width: 100%;
  height: 8px;
  border-radius: var(--radius-sm);
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
  border-radius: var(--radius-round);
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
  border-radius: var(--radius-round);
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

/* Component-specific styles use global variables from style.css */

.form-control {
  border: 1px solid var(--orange-10) !important;
  background-color: var(--primary-dark) !important;
  color: var(--text-light) !important;
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

.project-details {
  background: var(--primary-dark);
  border: 1px solid var(--orange-10);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
}

.price-display {
  border-bottom: 1px solid var(--orange-20);
}

.text-small {
  font-size: 0.875rem;
}

label {
  font-weight: 700;
}

/* Steps Section */
.steps-section {
  border-top: 1px solid var(--orange-10);
  padding-top: var(--gap-lg);
}

.steps-list {
  padding-left: 18px;
  margin: 0;
  color: var(--text-gray);
  font-size: 0.875rem;
  line-height: 1.6;
}

.steps-list li {
  margin-bottom: 8px;
}

/* Explain Section */
.explain-section {
  border-top: 1px dashed var(--orange-10);
  padding-top: var(--gap-md);
}

.explain-section h6 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.explain-section p {
  line-height: 1.5;
}

@media (max-width: 768px) {
  .scope-btn {
    min-width: calc(50% - var(--gap-sm));
  }

  .d-flex.gap-2 {
    flex-direction: column;
  }
}
</style>
