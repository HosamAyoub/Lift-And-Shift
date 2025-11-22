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
            <p class="text-gray small mb-4">Select your project type and adjust the parameters for an instant estimate.</p>

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
                  {{ scope }}
                </button>
              </div>
            </div>

            <!-- Area Slider -->
            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <label class="text-white fw-bold">Area / length</label>
                <div class="load-tier-display bg-secondary-dark px-3 py-2 rounded">
                  <span class="text-orange fw-bold">{{ area }} sq ft</span>
                </div>
              </div>

              <div class="slider-wrapper">
                <input
                  type="range"
                  class="slider"
                  min="10"
                  max="200"
                  step="5"
                  v-model="area"
                  @input="updateArea"
                  :style="{ background: `linear-gradient(to right, var(--accent-orange) 0%, var(--accent-orange) ${area / 2.0}%, var(--secondary-dark) ${area / 2.0}%, var(--secondary-dark) 100%)` }"
                />
              </div>

              <div class="d-flex justify-content-between mt-3 text-small text-gray">
                <span>10 sq ft</span>
                <span>200 sq ft</span>
              </div>

              <div class="d-flex justify-content-between mt-2 text-small text-gray">
                <span>Debris: {{ debrisYards }} yd³</span>
                <span>Tier: {{ currentTier }}</span>
              </div>
            </div>

            <!-- Material Selection -->
            <div class="mb-4">
              <label class="text-white fw-bold d-block mb-2">Material</label>
              <select v-model="material" class="form-control" @change="updateMaterial">
                <option value="Wood">Wood</option>
                <option value="Drywall">Drywall</option>
                <option value="Tile">Tile</option>
                <option value="Concrete">Concrete</option>
                <option value="Mixed">Mixed</option>
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

            <!-- Photo Upload -->
            <div>
              <label class="text-white fw-bold d-block mb-3">Upload demo photos <span class="text-orange">*</span></label>
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
          </div>
        </div>

        <!-- Right Column: Estimate & Booking -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <!-- Price Display -->
            <div class="mb-4 pb-4 border-bottom" style="border-bottom: 1px solid rgba(221, 150, 63, 0.25)">
              <p class="text-small text-gray mb-2">Ballpark Price</p>
              <h2 class="h1 mb-2">${{ computedPrice }}</h2>
              <p class="text-small text-gray mb-0">
                Includes demo labor + haul-off. Disposal fees may vary by material and site rules.
              </p>
            </div>

            <!-- Project Details -->
            <div class="mb-4">
              <h4 class="text-white mb-3">Project Details</h4>
              <div class="project-details">
                <div class="detail-item d-flex justify-content-between mb-2">
                  <span class="text-gray">Scope:</span>
                  <span class="text-white">{{ selectedScope }} = {{ area }} sq ft</span>
                </div>
                <div class="detail-item d-flex justify-content-between mb-2">
                  <span class="text-gray">Debris:</span>
                  <span class="text-white">≥ {{ debrisYards }} cubic yards</span>
                </div>
                <div class="detail-item d-flex justify-content-between mb-2">
                  <span class="text-gray">Material:</span>
                  <span class="text-white">{{ material }}</span>
                </div>
                <div class="detail-item d-flex justify-content-between mb-2" v-if="includesConcrete">
                  <span class="text-gray">Concrete:</span>
                  <span class="text-white">Included</span>
                </div>
                <div class="detail-item d-flex justify-content-between mb-2" v-if="upstairsAccess">
                  <span class="text-gray">Access:</span>
                  <span class="text-white">Upstairs/Tight</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-2 mb-4">
              <!-- <button class="btn btn-primary flex-grow-1" @click="lockInQuote">Lock this in</button>
              <button class="btn btn-outline-primary" @click="showDisposalTiers">See disposal tiers</button> -->
              <button class="btn btn-primary flex-grow-1">Lock this in</button>
              <button class="btn btn-outline-primary">See disposal tiers</button>
            </div>

            <p class="text-small text-gray mb-0 text-center">
              Final quote confirmed after a quick walkthrough or photo review.
            </p>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="mt-5 pt-5" style="border-top: 1px solid rgba(221, 150, 63, 0.1); padding-top: 3rem">
        <h2 class="text-white mb-4">Before / After Preview</h2>
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
export default {
  name: 'Demolition',
  emits: ['update:scope', 'update:area', 'update:material', 'update:concrete', 'update:upstairs'],
  data() {
    return {
      scopes: ['Shed', 'Deck', 'Fence', 'Bathroom', 'Kitchen', 'Interior wall'],
      selectedScope: 'Bathroom',
      area: 20,
      material: 'Wood',
      includesConcrete: false,
      upstairsAccess: false,
      uploadedFiles: [],
      isDragging: false,
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
    debrisYards() {
      return (this.area / 7).toFixed(1)
    },
    currentTier() {
      if (this.area <= 50) return 'Small'
      if (this.area <= 100) return 'Medium'
      return 'Large'
    },
    computedPrice() {
      const basePrices = {
        'Shed': 250,
        'Deck': 300,
        'Fence': 180,
        'Bathroom': 120,
        'Kitchen': 180,
        'Interior wall': 140
      }
      
      let price = basePrices[this.selectedScope] || 120
      
      if (this.area > 20) {
        price += Math.floor((this.area - 20) / 10) * 25
      }
      
      const materialMultipliers = {
        'Wood': 1.0,
        'Drywall': 0.9,
        'Tile': 1.25,
        'Concrete': 1.6,
        'Mixed': 1.1
      }
      price *= materialMultipliers[this.material] || 1.0
      
      if (this.includesConcrete) price += 40
      if (this.upstairsAccess) price += 25
      
      return Math.max(125, Math.round(price))
    }
  },
  methods: {
    selectScope(scope) {
      this.selectedScope = scope
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
    lockInQuote() {
      alert('Quote locked! Redirecting to booking...')
    },
    showDisposalTiers() {
      alert('Showing disposal tiers...')
    }
  },
  mounted() {
    this.$emit('update:scope', this.selectedScope)
    this.$emit('update:area', this.area)
    this.$emit('update:material', this.material)
    this.$emit('update:concrete', this.includesConcrete)
    this.$emit('update:upstairs', this.upstairsAccess)
  }
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
  color: #000000;
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

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  color: var(--text-gray);
  font-size: 0.875rem;
  cursor: pointer;
}

.checkbox-input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 1px solid var(--orange-10);
  border-radius: var(--radius-sm);
  background: var(--primary-dark);
  position: relative;
  transition: var(--transition-fast);
}

.checkbox-input:checked + .checkmark {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
}

.checkbox-input:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid #000000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
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

.project-details {
  background: var(--primary-dark);
  border: 1px solid var(--orange-10);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
}

.text-small {
  font-size: 0.875rem;
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
