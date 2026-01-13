<template>
  <div class="tab-content-wrapper">
    <h4 class="text-white mb-2">Location Details</h4>
    <p class="text-gray small mb-4">Tell us where we're picking up and dropping off your items.</p>

    <div class="row g-4">
      <!-- Pickup Location -->
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="text-white mb-0">
            <i class="fas fa-arrow-up text-orange me-2"></i>Pickup Location
          </h5>
          <button
            type="button"
            @click="useMyLocation"
            :disabled="isLoadingLocation"
            class="btn btn-outline-orange btn-sm"
          >
            <i
              class="fas"
              :class="isLoadingLocation ? 'fa-spinner fa-spin' : 'fa-location-crosshairs'"
            ></i>
            {{ isLoadingLocation ? 'Getting location...' : 'Use my location' }}
          </button>
        </div>
        <div class="row g-3">
          <div class="col-md-8">
            <label class="text-white fw-bold d-block mb-2">
              Street Address <span class="text-orange">*</span>
            </label>
            <input
              type="text"
              :value="formData.pickupStreet"
              @input="updateFormField('pickupStreet', $event.target.value)"
              @blur="handleBlur('pickupStreet')"
              class="form-control"
              :class="{ invalid: fieldTouched.pickupStreet && fieldErrors.pickupStreet }"
              placeholder="Enter street address"
            />
            <div v-if="fieldTouched.pickupStreet && fieldErrors.pickupStreet" class="field-error">
              {{ fieldErrors.pickupStreet }}
            </div>
          </div>

          <div class="col-md-4">
            <label class="text-white fw-bold d-block mb-2">Unit</label>
            <input
              type="text"
              :value="formData.pickupFloor"
              @input="updateFormField('pickupFloor', $event.target.value)"
              class="form-control"
              placeholder="Unit (optional)"
            />
          </div>

          <div class="col-md-4">
            <label class="text-white fw-bold d-block mb-2">
              City <span class="text-orange">*</span>
            </label>
            <input
              type="text"
              :value="formData.pickupCity"
              @input="updateFormField('pickupCity', $event.target.value)"
              @blur="handleBlur('pickupCity')"
              class="form-control"
              :class="{ invalid: fieldTouched.pickupCity && fieldErrors.pickupCity }"
              placeholder="Enter city"
            />
            <div v-if="fieldTouched.pickupCity && fieldErrors.pickupCity" class="field-error">
              {{ fieldErrors.pickupCity }}
            </div>
          </div>

          <div class="col-md-5">
            <label class="text-white fw-bold d-block mb-2">
              State <span class="text-orange">*</span>
            </label>
            <select
              :value="formData.pickupState"
              @change="updateFormField('pickupState', $event.target.value)"
              @blur="handleBlur('pickupState')"
              class="form-control form-select"
              :class="{ invalid: fieldTouched.pickupState && fieldErrors.pickupState }"
            >
              <option value="">Select State</option>
              <option
                v-for="(state, index) in stateNames"
                :key="'pickup-state-' + index"
                :value="state"
              >
                {{ state }}
              </option>
            </select>
            <div v-if="fieldTouched.pickupState && fieldErrors.pickupState" class="field-error">
              {{ fieldErrors.pickupState }}
            </div>
          </div>

          <div class="col-md-3">
            <label class="text-white fw-bold d-block mb-2">
              ZIP Code <span class="text-orange">*</span>
            </label>
            <input
              type="text"
              :value="formData.pickupZip"
              @input="updateFormField('pickupZip', $event.target.value)"
              @blur="handleBlur('pickupZip')"
              class="form-control"
              :class="{ invalid: fieldTouched.pickupZip && fieldErrors.pickupZip }"
              placeholder="75001"
              maxlength="5"
            />
            <div v-if="fieldTouched.pickupZip && fieldErrors.pickupZip" class="field-error">
              {{ fieldErrors.pickupZip }}
            </div>
          </div>

          <div class="col-md-8">
            <label class="text-white fw-bold d-block mb-2">Organization / Building</label>
            <input
              type="text"
              :value="formData.pickupBuilding"
              @input="updateFormField('pickupBuilding', $event.target.value)"
              class="form-control"
              placeholder="Building name or organization (optional)"
            />
          </div>

          <div class="col-md-4">
            <label class="text-white fw-bold d-block mb-2">Floor</label>
            <input
              type="number"
              :value="formData.pickupBuildingFloor"
              @input="updateFormField('pickupBuildingFloor', $event.target.value)"
              class="form-control"
              placeholder="Floor (optional)"
              min="0"
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
          <div class="col-md-8">
            <label class="text-white fw-bold d-block mb-2">
              Street Address <span class="text-orange">*</span>
            </label>
            <input
              type="text"
              :value="formData.dropoffStreet"
              @input="updateFormField('dropoffStreet', $event.target.value)"
              @blur="handleBlur('dropoffStreet')"
              class="form-control"
              :class="{ invalid: fieldTouched.dropoffStreet && fieldErrors.dropoffStreet }"
              placeholder="Enter street address"
            />
            <div v-if="fieldTouched.dropoffStreet && fieldErrors.dropoffStreet" class="field-error">
              {{ fieldErrors.dropoffStreet }}
            </div>
          </div>

          <div class="col-md-4">
            <label class="text-white fw-bold d-block mb-2">Unit</label>
            <input
              type="text"
              :value="formData.dropoffFloor"
              @input="updateFormField('dropoffFloor', $event.target.value)"
              class="form-control"
              placeholder="Unit (optional)"
            />
          </div>

          <div class="col-md-4">
            <label class="text-white fw-bold d-block mb-2">
              City <span class="text-orange">*</span>
            </label>
            <input
              type="text"
              :value="formData.dropoffCity"
              @input="updateFormField('dropoffCity', $event.target.value)"
              @blur="handleBlur('dropoffCity')"
              class="form-control"
              :class="{ invalid: fieldTouched.dropoffCity && fieldErrors.dropoffCity }"
              placeholder="Enter city"
            />
            <div v-if="fieldTouched.dropoffCity && fieldErrors.dropoffCity" class="field-error">
              {{ fieldErrors.dropoffCity }}
            </div>
          </div>

          <div class="col-md-5">
            <label class="text-white fw-bold d-block mb-2">
              State <span class="text-orange">*</span>
            </label>
            <select
              :value="formData.dropoffState"
              @change="updateFormField('dropoffState', $event.target.value)"
              @blur="handleBlur('dropoffState')"
              class="form-control form-select"
              :class="{ invalid: fieldTouched.dropoffState && fieldErrors.dropoffState }"
            >
              <option value="">Select State</option>
              <option
                v-for="(state, index) in stateNames"
                :key="'dropoff-state-' + index"
                :value="state"
              >
                {{ state }}
              </option>
            </select>
            <div v-if="fieldTouched.dropoffState && fieldErrors.dropoffState" class="field-error">
              {{ fieldErrors.dropoffState }}
            </div>
          </div>

          <div class="col-md-3">
            <label class="text-white fw-bold d-block mb-2">
              ZIP Code <span class="text-orange">*</span>
            </label>
            <input
              type="text"
              :value="formData.dropoffZip"
              @input="updateFormField('dropoffZip', $event.target.value)"
              @blur="handleBlur('dropoffZip')"
              class="form-control"
              :class="{ invalid: fieldTouched.dropoffZip && fieldErrors.dropoffZip }"
              placeholder="75001"
              maxlength="5"
            />
            <div v-if="fieldTouched.dropoffZip && fieldErrors.dropoffZip" class="field-error">
              {{ fieldErrors.dropoffZip }}
            </div>
          </div>

          <div class="col-md-8">
            <label class="text-white fw-bold d-block mb-2">Organization / Building</label>
            <input
              type="text"
              :value="formData.dropoffBuilding"
              @input="updateFormField('dropoffBuilding', $event.target.value)"
              class="form-control"
              placeholder="Enter building name (optional)"
            />
          </div>

          <div class="col-md-4">
            <label class="text-white fw-bold d-block mb-2">Floor</label>
            <input
              type="number"
              :value="formData.dropoffBuildingFloor"
              @input="updateFormField('dropoffBuildingFloor', $event.target.value)"
              class="form-control"
              placeholder="Floor (optional)"
              min="0"
            />
          </div>
        </div>
      </div>

      <!-- Schedule -->
      <div class="col-12">
        <h5 class="text-white mb-3"><i class="fas fa-calendar text-orange me-2"></i>Schedule</h5>
        <div class="row g-3">
          <div class="col-md-3">
            <label class="text-white fw-bold d-block mb-2">
              Preferred Date <span class="text-orange">*</span>
            </label>
            <input
              type="date"
              :value="formData.pickupDate"
              @input="updateFormField('pickupDate', $event.target.value)"
              @blur="handleBlur('pickupDate')"
              :min="minDate"
              class="form-control"
              :class="{ invalid: fieldTouched.pickupDate && fieldErrors.pickupDate }"
            />
            <div v-if="fieldTouched.pickupDate && fieldErrors.pickupDate" class="field-error">
              {{ fieldErrors.pickupDate }}
            </div>
          </div>
          <div class="col-md-9">
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
                  :value="time.value"
                  :checked="formData.pickupTime === time.value"
                  @change="updateFormField('pickupTime', time.value)"
                  class="time-radio"
                />
                <div class="time-card">
                  <i :class="time.icon" class="time-icon"></i>
                  <div class="time-label">{{ time.label }}</div>
                </div>
              </label>
            </div>
            <div v-if="fieldTouched.pickupTime && fieldErrors.pickupTime" class="field-error">
              {{ fieldErrors.pickupTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Close row g-4 -->
  </div>
  <!-- Close tab-content-wrapper -->
</template>

<script>
import { USE_MOCK_LOCATION, MOCK_COORDINATES } from '../../utils/mockLocation.js'

export default {
  name: 'LocationDetailsTab',
  props: {
    formData: {
      type: Object,
      required: true,
    },
    fieldErrors: {
      type: Object,
      required: true,
    },
    fieldTouched: {
      type: Object,
      required: true,
    },
    citiesByState: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:formData', 'update:fieldErrors', 'update:fieldTouched'],
  data() {
    return {
      timeOptions: [
        { value: 'morning', label: 'Morning (8AM - 12PM)', icon: 'fas fa-sun' },
        { value: 'midday', label: 'Mid-day (12PM - 3PM)', icon: 'fas fa-cloud-sun' },
        { value: 'afternoon', label: 'Afternoon (3PM - 6PM)', icon: 'fas fa-cloud' },
      ],
      isLoadingLocation: false,
    }
  },
  computed: {
    stateNames() {
      return Object.keys(this.citiesByState).sort()
    },
    pickupCities() {
      const state = this.formData.pickupState
      return state && this.citiesByState[state] ? this.citiesByState[state] : []
    },
    dropoffCities() {
      const state = this.formData.dropoffState
      return state && this.citiesByState[state] ? this.citiesByState[state] : []
    },
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
  },
  methods: {
    updateFormField(field, value) {
      const updated = { ...this.formData, [field]: value }
      this.$emit('update:formData', updated)
      // Clear error when user starts typing/selecting
      this.clearFieldError(field)
    },
    handleBlur(field) {
      const updatedTouched = { ...this.fieldTouched, [field]: true }
      this.$emit('update:fieldTouched', updatedTouched)
    },
    clearFieldError(field) {
      const updatedErrors = { ...this.fieldErrors, [field]: '' }
      this.$emit('update:fieldErrors', updatedErrors)
    },
    async useMyLocation() {
      if (!USE_MOCK_LOCATION && !navigator.geolocation) {
        alert('Geolocation is not supported by your browser')
        return
      }

      this.isLoadingLocation = true

      try {
        let latitude, longitude

        if (USE_MOCK_LOCATION) {
          // Use mock coordinates for testing
          latitude = MOCK_COORDINATES.latitude
          longitude = MOCK_COORDINATES.longitude
        } else {
          // Use actual geolocation
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            })
          })
          latitude = position.coords.latitude
          longitude = position.coords.longitude
        }

        // Use Nominatim (OpenStreetMap) for reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en',
            },
          },
        )

        if (!response.ok) {
          throw new Error('Failed to get address from coordinates')
        }

        const data = await response.json()
        const address = data.address

        // Extract address components
        const street = [address.house_number, address.road || address.street]
          .filter(Boolean)
          .join(' ')

        const city = address.city || address.town || address.village || address.municipality || ''

        const state = address.state || ''
        const zip = address.postcode || ''

        // Batch update all form fields at once to prevent overwriting
        const updated = {
          ...this.formData,
          ...(street && { pickupStreet: street }),
          ...(city && { pickupCity: city }),
          ...(state && { pickupState: state }),
          ...(zip && { pickupZip: zip }),
        }

        this.$emit('update:formData', updated)
      } catch (error) {
        if (error.code === 1) {
          alert('Location access denied. Please enable location services and try again.')
        } else if (error.code === 2) {
          alert('Location information unavailable. Please enter your address manually.')
        } else if (error.code === 3) {
          alert('Location request timed out. Please try again or enter manually.')
        } else {
          alert('Failed to get your location. Please enter your address manually.')
        }
        console.error('Geolocation error:', error)
      } finally {
        this.isLoadingLocation = false
      }
    },
  },
}
</script>

<style scoped>
.tab-content-wrapper {
  padding: var(--gap-lg);
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
  background: #f2f0ef;
  color: #2d3748;
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
  /* background: var(--orange-10); */
  color: var(--accent-orange);
  border-color: var(--accent-orange);
}

.time-option.selected .time-card {
  /* background: var(--orange-20); */
  color: var(--accent-orange);
  border-color: var(--accent-orange);
  box-shadow: 0 0 20px var(--orange-20);
}

.time-icon {
  font-size: var(--font-2xl);
  color: var(--accent-orange);
}

.time-label {
  color: #2d3748;
  font-weight: 500;
  font-size: var(--font-sm);
}

@media (max-width: 768px) {
  .time-options {
    grid-template-columns: 1fr;
  }
}

.btn-outline-orange {
  color: var(--accent-orange);
  border: 2px solid var(--accent-orange);
  background: transparent;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline-orange:hover:not(:disabled) {
  background: var(--accent-orange);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--orange-20);
}

.btn-outline-orange:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
