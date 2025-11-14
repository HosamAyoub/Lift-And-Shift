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
                    background: `linear-gradient(to right, var(--accent-orange) 0%, var(--accent-orange) ${(currentTierIndex / 4) * 100}%, var(--secondary-dark) ${(currentTierIndex / 4) * 100}%, var(--secondary-dark) 100%)`,
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
                  :class="{ selected: currentTierIndex >= 1 }"
                  @click="setBed(1)"
                >
                  1/4
                </button>
                <button
                  class="tier-btn"
                  :class="{ selected: currentTierIndex >= 2 }"
                  @click="setBed(2)"
                >
                  1/2
                </button>
                <button
                  class="tier-btn"
                  :class="{ selected: currentTierIndex >= 3 }"
                  @click="setBed(3)"
                >
                  3/4
                </button>
                <button
                  class="tier-btn"
                  :class="{ selected: currentTierIndex >= 4 }"
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
              <h2 class="h1 text-orange mb-2">${{ estimatedPrice }}</h2>
              <p class="text-small text-gray mb-0">
                Starting price for {{ currentTier }}. Final pricing may vary based on item type,
                accessibility, stairs, and disposal requirements. Minimum charge $125.
              </p>
            </div>

            <!-- Photo Upload -->
            <div class="photo-upload mb-4 pb-4">
              <label class="text-white fw-bold d-block mb-3"
                >Upload Photos for Accurate Pricing (Optional)</label
              >
              <div
                class="upload-area position-relative rounded"
                :class="{ dragging: isDragging }"
                @click="triggerFileInput"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleFileDrop"
              >
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
                  <p class="text-gray mt-3 mb-0">Drag & drop photos or click to browse</p>
                  <p class="text-gray text-small mt-2 mb-0">
                    Help us provide the most accurate quote
                  </p>
                </div>
              </div>
              <p v-if="uploadedFiles.length > 0" class="text-success text-small mt-2">
                <i class="fas fa-check-circle me-1"></i>{{ uploadedFiles.length }} file(s) uploaded
              </p>
            </div>

            <!-- Location Input -->
            <div class="mb-4">
              <label class="text-white fw-bold d-block mb-2">Your Location</label>
              <input
                v-model="location"
                type="text"
                class="form-control"
                placeholder="Enter your city or ZIP code"
              />
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-2">
              <button class="btn btn-primary flex-grow-1">Book Now</button>
              <button class="btn btn-outline-primary">View All Tiers</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Tiers Section -->
      <div class="mt-5 pt-5">
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
        <h2 class="text-white mb-5 text-center">Why Choose Our Hauling Service?</h2>
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

export default {
  name: 'Hauling',
  components: {
    PageHeader,
    PricingCard,
    BenefitCard,
  },
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
          description:
            'Quick turnaround with same-day pickup available. Fast space clearing.',
        },
        {
          icon: 'fas fa-hand-holding-heart',
          title: 'Co-Conscious',
          description:
            'We donate usable items to local charities before recycling or disposal.',
        },
        {
          icon: 'fas fa-tag',
          title: 'Transparent Pricing',
          description: 'No hidden fees or surprises. What you see is what you pay—guaranteed.',
        },
        {
          icon: 'fas fa-users',
          title: 'Expert Crew',
          description:
            'Licensed, insured professionals who treat your property with care.',
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
    selectTier(index) {
      this.currentTierIndex = index
      // Scroll to the estimate section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
/* Font weights matching home page */
h2 {
  font-weight: 800;
}
h3 {
  font-weight: 700;
}

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

/* Photo Upload */
.photo-upload {
  border-bottom: 1px solid var(--orange-10);
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

.upload-area.dragging {
  border-color: var(--accent-orange);
  background: var(--orange-20);
  transform: scale(1.02);
}

/* Form Controls */
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
