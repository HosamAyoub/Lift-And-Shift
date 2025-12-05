<template>
  <div class="tab-content-wrapper">
    <h4 class="text-white mb-4">
      <i class="fas fa-map-marker-alt text-orange me-2"></i>Location Details
    </h4>
    <p class="text-gray small mb-4">Tell us where we're picking up and dropping off your items.</p>

    <div class="row g-4">
      <!-- Pickup Location -->
      <div class="col-12">
        <h5 class="text-white mb-3">
          <i class="fas fa-arrow-up text-orange me-2"></i>Pickup Location
        </h5>
        <div class="row g-3">
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

          <div class="col-md-4">
            <label class="text-white fw-bold d-block mb-2">
              City <span class="text-orange">*</span>
            </label>
            <select
              :value="formData.pickupCity"
              @change="updateFormField('pickupCity', $event.target.value)"
              @blur="handleBlur('pickupCity')"
              class="form-control form-select"
              :class="{ invalid: fieldTouched.pickupCity && fieldErrors.pickupCity }"
              :disabled="!formData.pickupState || !pickupCities.length"
            >
              <option value="">
                {{ formData.pickupState ? 'Select City' : 'Select state first' }}
              </option>
              <option v-for="city in pickupCities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
            <div v-if="fieldTouched.pickupCity && fieldErrors.pickupCity" class="field-error">
              {{ fieldErrors.pickupCity }}
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
            <label class="text-white fw-bold d-block mb-2">Floor/Unit</label>
            <input
              type="text"
              :value="formData.pickupFloor"
              @input="updateFormField('pickupFloor', $event.target.value)"
              class="form-control"
              placeholder="Floor # (optional)"
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

          <div class="col-md-4">
            <label class="text-white fw-bold d-block mb-2">
              City <span class="text-orange">*</span>
            </label>
            <select
              :value="formData.dropoffCity"
              @change="updateFormField('dropoffCity', $event.target.value)"
              @blur="handleBlur('dropoffCity')"
              class="form-control form-select"
              :class="{ invalid: fieldTouched.dropoffCity && fieldErrors.dropoffCity }"
              :disabled="!formData.dropoffState || !dropoffCities.length"
            >
              <option value="">
                {{ formData.dropoffState ? 'Select City' : 'Select state first' }}
              </option>
              <option
                v-for="(city, index) in dropoffCities"
                :key="'dropoff-city-' + index"
                :value="city"
              >
                {{ city }}
              </option>
            </select>
            <div v-if="fieldTouched.dropoffCity && fieldErrors.dropoffCity" class="field-error">
              {{ fieldErrors.dropoffCity }}
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
          <div class="col-md-6">
            <label class="text-white fw-bold d-block mb-2">Building/Complex</label>
            <input
              type="text"
              :value="formData.dropoffBuilding"
              @input="updateFormField('dropoffBuilding', $event.target.value)"
              class="form-control"
              placeholder="Enter building name (optional)"
            />
          </div>
          <div class="col-md-6">
            <label class="text-white fw-bold d-block mb-2">Floor/Unit</label>
            <input
              type="text"
              :value="formData.dropoffFloor"
              @input="updateFormField('dropoffFloor', $event.target.value)"
              class="form-control"
              placeholder="Enter floor/unit (optional)"
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
  background: var(--primary-dark);
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
  background: var(--orange-10);
  border-color: var(--accent-orange);
}

.time-option.selected .time-card {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 20px var(--orange-20);
}

.time-icon {
  font-size: var(--font-2xl);
  color: var(--accent-orange);
}

.time-label {
  color: var(--text-light);
  font-weight: 500;
  font-size: var(--font-sm);
}

@media (max-width: 768px) {
  .time-options {
    grid-template-columns: 1fr;
  }
}
</style>
