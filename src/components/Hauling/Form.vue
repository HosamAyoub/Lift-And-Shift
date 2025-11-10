<template>
  <section class="section section-dark py-5">
    <div class="container-lg">
      <!-- Hero Section -->
      <div class="mb-5 pb-4">
        <h1 class="h2 text-white mb-3">Hauling Removal</h1>
        <p class="text-gray mb-0">Fast, reliable, and eco-friendly hauling removal services. Get an instant quote today.</p>
      </div>

      <!-- Main Instant Estimate Section -->
      <div class="row g-4 align-items-stretch">
        <!-- Left Column: Visual Slider -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <h3 class="text-white mb-4">Instant Estimate</h3>
            <p class="text-gray small mb-4">Drag the slider (snaps to tiers). Add photos for a faster quote.</p>

<!-- Truck Container Visualization -->
<div class="truck-container mb-4">
  <div class="truck-visualization position-relative">
    <svg viewBox="0 0 600 400" class="w-100">
      <!-- Truck cabin -->
      <rect x="120" y="160" width="80" height="30" fill="var(--primary-dark)" stroke="var(--accent-orange)" stroke-width="2" />

      <!-- Truck wheels -->
      <circle cx="140" cy="250" r="20" fill="var(--primary-dark)" stroke="var(--accent-orange)" stroke-width="2" />
      <circle cx="380" cy="250" r="20" fill="var(--primary-dark)" stroke="var(--accent-orange)" stroke-width="2" />
      
      <!-- Truck bed base (same Y level as cabin) -->
      <rect x="160" y="160" width="200" height="80" fill="var(--primary-dark)" stroke="var(--accent-orange)" stroke-width="2" />
      
      <!-- Truck bed sections - dynamic fill based on current tier -->
      <!-- Section 1 (1/4) -->
      <rect 
        x="160" y="160" 
        width="50" height="80" 
        :fill="currentTierIndex >= 1 ? 'var(--accent-orange)' : 'var(--primary-dark)'" 
        stroke="var(--accent-orange)" 
        stroke-width="1" 
      />
      
      <!-- Section 2 (1/2) -->
      <rect 
        x="210" y="160" 
        width="50" height="80" 
        :fill="currentTierIndex >= 2 ? 'var(--accent-orange)' : 'var(--primary-dark)'" 
        stroke="var(--accent-orange)" 
        stroke-width="1" 
      />
      
      <!-- Section 3 (3/4) -->
      <rect 
        x="260" y="160" 
        width="50" height="80" 
        :fill="currentTierIndex >= 3 ? 'var(--accent-orange)' : 'var(--primary-dark)'" 
        stroke="var(--accent-orange)" 
        stroke-width="1" 
      />
      
      <!-- Section 4 (Full) -->
      <rect 
        x="310" y="160" 
        width="50" height="80" 
        :fill="currentTierIndex >= 4 ? 'var(--accent-orange)' : 'var(--primary-dark)'" 
        stroke="var(--accent-orange)" 
        stroke-width="1" 
      />
      
      <!-- Section dividers -->
      <line x1="210" y1="160" x2="210" y2="240" stroke="var(--accent-orange)" stroke-width="1" />
      <line x1="260" y1="160" x2="260" y2="240" stroke="var(--accent-orange)" stroke-width="1" />
      <line x1="310" y1="160" x2="310" y2="240" stroke="var(--accent-orange)" stroke-width="1" />
      

    </svg>
  </div>
</div>
            <!-- Load Slider -->
            <div class="load-slider-container">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <label class="text-white fw-bold">Pickup Bed</label>
                <div class="load-tier-display bg-secondary-dark px-3 py-2 rounded">
                  <span class="text-orange fw-bold">{{ currentTier }}</span>
                </div>
              </div>

              <div class="slider-wrapper">
                <input
                  type="range"
                  class="slider"
                  min="0"
                  max="4"
                  :value="currentTierIndex"
                  @input="handleSliderInput"
                  :style="{ background: `linear-gradient(to right, var(--accent-orange) 0%, var(--accent-orange) ${(currentTierIndex / 4) * 100}%, var(--secondary-dark) ${(currentTierIndex / 4) * 100}%, var(--secondary-dark) 100%)` }"
                />
              </div>

              <div class="d-flex justify-content-between mt-3 text-small text-gray">
                <span>Pickup Bed</span>
                  <span style="transform: translateX(-35px);">1/4</span>
          <span style="transform: translateX(-25px);">1/2</span>
             <span style="transform: translateX(-10px);">3/4</span>
                <span>Full</span>
              </div>

              <div class="d-flex justify-content-between mt-2 text-small text-gray">
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
            <div class="mb-4 pb-4 border-bottom" style="border-bottom: 1px solid rgba(221, 150, 63, 0.25)">
              <p class="text-small text-gray mb-2">Estimated price</p>
              <h2 class="h1 text-orange mb-2">${{ estimatedPrice }}</h2>
              <p class="text-small text-gray mb-0">
                Minimum charge is $125. Final quote may vary by material, access, stairs, and disposal fees.
              </p>
            </div>

            <!-- Photo Upload -->
            <div class="mb-4 pb-4" style="border-bottom: 1px solid rgba(221, 150, 63, 0.1)">
              <label class="text-white fw-bold d-block mb-3">Upload photos (optional)</label>
              <div class="upload-area position-relative rounded" @click="triggerFileInput" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleFileDrop">
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handleFileSelect"
                  style="display: none"
                />
                <div class="text-center py-5">
                  <i class="fas fa-cloud-upload text-orange" style="font-size: 2.5rem"></i>
                  <p class="text-gray mt-3 mb-0">Drag & drop or click to upload</p>
                </div>
              </div>
              <p v-if="uploadedFiles.length > 0" class="text-success text-small mt-2">{{ uploadedFiles.length }} file(s) uploaded</p>
            </div>

            <!-- Location Input -->
            <div class="mb-4">
              <label class="text-white fw-bold d-block mb-2">Address or general location</label>
              <input
                v-model="location"
                type="text"
                class="form-control"
                placeholder="City / ZIP"
              />
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-2">
              <button class="btn btn-primary flex-grow-1">Book this</button>
              <button class="btn btn-outline-primary">See tiers</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Tiers Section -->
      <div class="mt-5 pt-5">
        <h2 class="text-white mb-4">Our Pricing Tiers</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="tier in pricingTiers" :key="tier.id">
            <div class="card-dark hover-translate-y transition-all">
              <h5 class="text-orange mb-3">{{ tier.name }}</h5>
              <p class="text-gray small mb-3">{{ tier.description }}</p>
              <div class="mb-3">
                <p class="text-white fw-bold mb-2">Starting at</p>
                <p class="h4 text-orange mb-0">${{ tier.price }}</p>
              </div>
              <ul class="list-unstyled text-gray small mb-4">
                <li v-for="feature in tier.features" :key="feature" class="mb-2">
                  <i class="fas fa-check-circle text-orange me-2"></i>{{ feature }}
                </li>
              </ul>
              <button class="btn btn-outline-primary w-100">Choose this tier</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Choose Us Section -->
      <div class="mt-5 pt-5" style="border-top: 1px solid rgba(221, 150, 63, 0.1); padding-top: 3rem">
        <h2 class="text-white mb-4">Why Choose Our hauling Removal Service?</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="benefit in benefits" :key="benefit.title">
            <div class="text-center">
              <div class="mb-3">
                <i :class="benefit.icon" style="font-size: 2.5rem; color: var(--accent-orange)"></i>
              </div>
              <h5 class="text-white mb-2">{{ benefit.title }}</h5>
              <p class="text-gray small">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HaulingForm',
  data() {
    return {
      currentTierIndex: 0,
      location: '',
      uploadedFiles: [],
      isDragging: false,
      pricingTiers: [
        {
          id: 1,
          name: 'Pickup Bed',
          description: 'Perfect for small cleanups and light hauling removal',
          price: 125,
          features: ['Up to 1/4 truck bed', 'Same-day service available', 'Eco-friendly disposal', 'Free quote'],
        },
        {
          id: 2,
          name: '1/2 Truck Bed',
          description: 'Ideal for small to medium hauling removal projects',
          price: 200,
          features: ['1/2 truck bed capacity', 'Fast scheduling', 'Responsible disposal', 'Photo estimates'],
        },
        {
          id: 3,
          name: 'Full Service',
          description: 'Complete hauling removal for large projects',
          price: 350,
          features: ['Full truck load', 'Sorting & recycling', 'Furniture removal', 'Priority support'],
        },
      ],
      benefits: [
        {
          icon: 'fas fa-bolt',
          title: 'Fast Service',
          description: 'Same-day pickup available. Get your space cleaned up quickly.',
        },
        {
          icon: 'fas fa-leaf',
          title: 'Eco-Friendly',
          description: 'We recycle and donate responsibly. Protecting the environment.',
        },
        {
          icon: 'fas fa-tag',
          title: 'Best Prices',
          description: 'Transparent pricing with no hidden fees. Instant quotes.',
        },
        {
          icon: 'fas fa-users',
          title: 'Professional Team',
          description: 'Trained professionals handle your hauling with care.',
        },
      ],
    }
  },
  computed: {
    tiers() {
      return ['Pickup Bed', '1/4', '1/2', '3/4', 'Full']
    },
    tierPrices() {
      return [125, 150, 200, 275, 350]
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
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileSelect(event) {
      const files = Array.from(event.target.files)
      this.uploadedFiles = [...this.uploadedFiles, ...files]
    },
    handleFileDrop(event) {
      this.isDragging = false
      const files = Array.from(event.dataTransfer.files)
      this.uploadedFiles = [...this.uploadedFiles, ...files]
    },
  },
}
</script>

<style scoped>
.truck-container {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary-dark) 100%);
  padding: 2rem;
  border-radius: var(--radius-xl);
  border: 2px solid var(--orange-10);
}

.truck-visualization {
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-wrapper {
  position: relative;
}

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

.upload-area {
  background: var(--primary-dark);
  border: 2px dashed var(--orange-20);
  cursor: pointer;
  transition: var(--transition-base);
}

.upload-area:hover {
  border-color: var(--accent-orange);
  background: var(--orange-10);
}

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

.text-small {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .truck-visualization {
    min-height: 180px;
  }

  .d-flex.gap-2 {
    flex-direction: column;
  }

  .slider-wrapper input {
    width: 100%;
  }
}
</style>
