<template>
  <section class="section section-dark py-5">
    <div class="container-lg">
      <!-- Hero Section -->
      <div class="mb-5 pb-4">
        <h1 class="h2 text-white mb-3">Storage Solutions</h1>
        <p class="text-gray mb-0">
          Secure, flexible storage with free pickup and delivery options.
        </p>
      </div>

      <!-- Storage Pricing Cards -->
      <div class="row g-4 mb-5">
        <!-- Small Storage Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card-dark shadow-lg h-100">
            <div class="card-header-dark text-center">
              <h4 class="text-white mb-2">Small</h4>
              <div class="price-display">
                <span class="text-orange h3 fw-bold">$22</span>
                <span class="text-gray small d-block">per item monthly</span>
              </div>
            </div>
            <div class="card-body">
              <h6 class="text-white mb-3">Common Small Items</h6>
              <ul class="item-list">
                <li v-for="item in smallItems" :key="item" class="text-gray small mb-2">
                  {{ item }}
                </li>
              </ul>
              <button class="btn btn-primary w-100 mt-3" @click="selectSize('small')">
                Choose Small
              </button>
            </div>
          </div>
        </div>

        <!-- Medium Storage Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card-dark shadow-lg h-100">
            <div class="card-header-dark text-center">
              <h4 class="text-white mb-2">Medium</h4>
              <div class="price-display">
                <span class="text-orange h3 fw-bold">$44</span>
                <span class="text-gray small d-block">per item monthly</span>
              </div>
            </div>
            <div class="card-body">
              <h6 class="text-white mb-3">Common Medium Items</h6>
              <ul class="item-list">
                <li v-for="item in mediumItems" :key="item" class="text-gray small mb-2">
                  {{ item }}
                </li>
              </ul>
              <button class="btn btn-primary w-100 mt-3" @click="selectSize('medium')">
                Choose Medium
              </button>
            </div>
          </div>
        </div>

        <!-- Large Storage Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card-dark shadow-lg h-100">
            <div class="card-header-dark text-center">
              <h4 class="text-white mb-2">Large</h4>
              <div class="price-display">
                <span class="text-orange h3 fw-bold">$66</span>
                <span class="text-gray small d-block">per item monthly</span>
              </div>
            </div>
            <div class="card-body">
              <h6 class="text-white mb-3">Common Large Items</h6>
              <ul class="item-list">
                <li v-for="item in largeItems" :key="item" class="text-gray small mb-2">
                  {{ item }}
                </li>
              </ul>
              <button class="btn btn-primary w-100 mt-3" @click="selectSize('large')">
                Choose Large
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Storage Process Section -->
      <div class="row g-4 align-items-stretch mb-5">
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <h3 class="text-white mb-4">Storage Process</h3>
            <p class="text-gray small mb-4">Simple steps to get your items into secure storage.</p>

            <!-- Process Steps -->
            <div class="process-steps">
              <div class="process-step d-flex align-items-start mb-4">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h5 class="text-white mb-2">Free Boxes & Supplies</h5>
                  <p class="text-gray small mb-0">
                    Box size 24x18x18 • 9% larger than others • Reusable boxes with no size
                    restrictions
                  </p>
                </div>
              </div>

              <div class="process-step d-flex align-items-start mb-4">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h5 class="text-white mb-2">Pickup & Start</h5>
                  <p class="text-gray small mb-0">
                    Free pickup • Scheduled dates that work for you
                  </p>
                </div>
              </div>

              <div class="process-step d-flex align-items-start mb-4">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h5 class="text-white mb-2">Delivery Available</h5>
                  <p class="text-gray small mb-0">
                    We deliver when you need (Price may vary by location)
                  </p>
                </div>
              </div>
            </div>

            <!-- Storage Terms -->
            <div class="mt-4">
              <h5 class="text-white mb-3">Storage Terms</h5>
              <p class="text-gray small mb-0">4 months minimum storage • Free estimate available</p>
            </div>
          </div>
        </div>

        <!-- Storage Quote Form -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <h3 class="text-white mb-4">Get Storage Quote</h3>

            <form @submit.prevent="submitForm">
              <!-- Selected Size Display -->
              <div class="mb-4" v-if="selectedSize">
                <label class="text-white fw-bold d-block mb-2">Selected Plan</label>
                <div
                  class="selected-plan-display p-3 rounded"
                  style="background: var(--orange-10); border: 1px solid var(--accent-orange)"
                >
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-white fw-bold text-capitalize"
                      >{{ selectedSize }} Storage</span
                    >
                    <span class="text-orange fw-bold">${{ getPrice(selectedSize) }}/month</span>
                  </div>
                </div>
              </div>

              <!-- Organization Type -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-2">Organization Type</label>
                <select v-model="form.organizationType" class="form-control" required>
                  <option value="" disabled selected>Select organization type</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="campus">Campus</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <!-- Organization Name -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-2">Organization Name</label>
                <input
                  v-model="form.organizationName"
                  type="text"
                  class="form-control"
                  placeholder="Enter organization name"
                  required
                />
              </div>

              <!-- Pickup Details -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-2">Pickup Details</label>
                <input
                  v-model="form.pickupAddress"
                  type="text"
                  class="form-control mb-2"
                  placeholder="Pickup Address"
                  required
                />
                <input v-model="form.pickupDate" type="date" class="form-control" required />
              </div>

              <!-- Drop-off Details -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-2">Drop-off Details</label>
                <input
                  v-model="form.dropoffAddress"
                  type="text"
                  class="form-control mb-2"
                  placeholder="Drop-off Address"
                />
                <input v-model="form.dropoffDate" type="date" class="form-control" />
              </div>

              <!-- Storage Duration & Floor -->
              <div class="row mb-4">
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Storage Duration</label>
                  <select v-model="form.duration" class="form-control" required>
                    <option value="4">4 months (minimum)</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="custom">Custom duration</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Floor Level</label>
                  <select v-model="form.floor" class="form-control">
                    <option value="ground">Ground Floor</option>
                    <option value="1">1st Floor</option>
                    <option value="2">2nd Floor</option>
                    <option value="3">3rd Floor+</option>
                    <option value="elevator">Elevator Access</option>
                  </select>
                </div>
              </div>

              <!-- Referral Source -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-2">How did you hear about us?</label>
                <select v-model="form.referralSource" class="form-control" required>
                  <option value="" disabled selected>Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Friend Referral</option>
                  <option value="ad">Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <!-- Additional Notes -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-2">Additional Notes (Optional)</label>
                <textarea
                  v-model="form.notes"
                  class="form-control"
                  rows="3"
                  placeholder="Any special requirements or notes..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary w-100" :disabled="!selectedSize">
                {{
                  selectedSize ? 'Get Free Storage Estimate' : 'Please Select a Storage Size First'
                }}
              </button>
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
export default {
  name: 'Storage',
  data() {
    return {
      selectedSize: null,
      form: {
        organizationType: '',
        organizationName: '',
        pickupAddress: '',
        pickupDate: '',
        dropoffAddress: '',
        dropoffDate: '',
        duration: '4',
        floor: 'ground',
        referralSource: '',
        notes: '',
      },
      smallItems: [
        'Art portfolio, poster tube',
        'Picture frame, whiteboard',
        'Folding chair, step stool',
        'Desk lamp, small fan',
        'Guitar, violin, skateboard',
        'Small rug, trash can',
        'Laundry basket, duffle bag',
      ],
      mediumItems: [
        'Storage boxes (24x18x18)',
        'Nightstand, end table',
        'Ottoman, floor lamp',
        'Kitchen chair, stool',
        'Computer monitor, TV',
        'Microwave, small printer',
        'Bicycle, large suitcase',
      ],
      largeItems: [
        'Mini fridge, water cooler',
        'Mattress, box spring',
        'Desk, bookcase, cabinet',
        'Coffee table, TV stand',
        'Dresser, armchair',
        'Couch, sofa pieces',
        'Large mirrors, rugs',
      ],
      features: [
        {
          icon: 'fas fa-boxes',
          title: 'Free Supplies',
          description: 'Get free boxes and packing materials tailored to your storage needs.',
        },
        {
          icon: 'fas fa-truck-moving',
          title: 'Free Pickup',
          description: 'We pick up your items at no extra cost on your scheduled date.',
        },
        {
          icon: 'fas fa-warehouse',
          title: 'Secure Storage',
          description: 'Climate-controlled, secure facilities with 24/7 monitoring.',
        },
        {
          icon: 'fas fa-redo',
          title: 'Flexible Delivery',
          description: 'Get your items back whenever you need them with flexible delivery options.',
        },
      ],
    }
  },
  methods: {
    selectSize(size) {
      this.selectedSize = size
    },
    getPrice(size) {
      const prices = {
        small: 22,
        medium: 44,
        large: 66,
      }
      return prices[size]
    },
    submitForm() {
      if (!this.selectedSize) {
        alert('Please select a storage size first.')
        return
      }

      if (
        !this.form.organizationType ||
        !this.form.organizationName ||
        !this.form.pickupAddress ||
        !this.form.pickupDate ||
        !this.form.referralSource
      ) {
        alert('Please fill in all required fields.')
        return
      }

      // Add selected size to form data
      const formData = {
        ...this.form,
        selectedSize: this.selectedSize,
        monthlyPrice: this.getPrice(this.selectedSize),
      }

      console.log('Storage form submitted:', formData)

      // Show success message
      alert(
        `Thank you! Your ${this.selectedSize} storage estimate request has been submitted. We will contact you shortly with your free estimate.`,
      )

      // Reset form
      this.resetForm()
    },
    resetForm() {
      this.selectedSize = null
      this.form = {
        organizationType: '',
        organizationName: '',
        pickupAddress: '',
        pickupDate: '',
        dropoffAddress: '',
        dropoffDate: '',
        duration: '4',
        floor: 'ground',
        referralSource: '',
        notes: '',
      }
    },
  },
}
</script>

<style scoped>
.card-header-dark {
  background: var(--orange-10);
  border-bottom: 1px solid var(--orange-20);
  padding: 1.5rem;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.price-display {
  padding: 0.5rem 0;
}

.item-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.item-list li {
  padding-left: 1rem;
  position: relative;
}

.item-list li::before {
  content: '•';
  color: var(--accent-orange);
  position: absolute;
  left: 0;
}

.selected-plan-display {
  background: var(--orange-10);
  border: 1px solid var(--accent-orange);
}

.process-steps {
  border-left: 2px solid var(--orange-20);
  margin-left: 1rem;
  padding-left: 1.5rem;
}

.process-step {
  position: relative;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--accent-orange);
  color: var(--bg-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  margin-right: 1rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.step-content {
  flex: 1;
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

.btn-primary {
  background: var(--accent-orange) !important;
  border: 1px solid var(--accent-orange) !important;
  color: var(--bg-dark) !important;
  padding: 12px 30px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}

.btn-primary:hover:not(:disabled) {
  background: var(--accent-orange-dark) !important;
  border-color: var(--accent-orange-dark) !important;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px var(--orange-20);
}

.btn-primary:disabled {
  background: var(--text-gray) !important;
  border-color: var(--text-gray) !important;
  color: var(--primary-dark) !important;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .process-steps {
    margin-left: 0.5rem;
    padding-left: 1rem;
  }

  .step-number {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
    margin-right: 0.75rem;
  }
}
</style>
