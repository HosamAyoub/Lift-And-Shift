<template>
  <div class="tab-content-wrapper">
    <h4 class="text-white mb-2">Storage Details & Locations</h4>
    <p class="text-gray small mb-4">
      Tell us about your storage needs and where we should pick up and deliver your items.
    </p>

    <div class="row g-4">
      <!-- Pickup Location -->
      <div class="col-12">
        <h5 class="text-white mb-3">
          <i class="fas fa-arrow-up text-orange me-2"></i>Pickup Location
        </h5>
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
              placeholder="Unit # (optional)"
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

          <div class="col-md-12">
            <label class="text-white fw-bold d-block mb-2">Organization / Building</label>
            <input
              type="text"
              :value="formData.pickupBuilding"
              @input="updateFormField('pickupBuilding', $event.target.value)"
              class="form-control"
              placeholder="Building name or organization (optional)"
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
              placeholder="Unit # (optional)"
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
        </div>
      </div>

      <!-- Storage Duration & Unit Details -->
      <div class="col-12">
        <h5 class="text-white mb-3">
          <i class="fas fa-warehouse text-orange me-2"></i>Storage Requirements
        </h5>
        <div class="row g-3">
          <!-- Storage Duration -->
          <div class="col-md-6">
            <label class="text-white fw-bold d-block mb-2">
              Storage Duration (Months) <span class="text-orange">*</span>
            </label>
            <input
              type="number"
              :value="formData.storageDuration"
              @input="updateFormField('storageDuration', Number($event.target.value))"
              @blur="handleBlur('storageDuration')"
              class="form-control"
              :class="{ invalid: fieldTouched.storageDuration && fieldErrors.storageDuration }"
              placeholder="Enter number of months"
              min="4"
            />
            <small class="text-gray d-block mt-1">
              <i class="fas fa-info-circle text-orange me-1"></i>Minimum 4 months required
            </small>
            <div
              v-if="fieldTouched.storageDuration && fieldErrors.storageDuration"
              class="field-error"
            >
              {{ fieldErrors.storageDuration }}
            </div>
          </div>

          <!-- Number of Boxes -->
          <div class="col-md-6">
            <label class="text-white fw-bold d-block mb-2"> Number of Boxes </label>
            <input
              type="number"
              :value="formData.numberOfBoxes"
              @input="updateFormField('numberOfBoxes', Number($event.target.value))"
              class="form-control"
              placeholder="Enter number of boxes (optional)"
              min="0"
            />
          </div>

          <!-- Move-In Date -->
          <div class="col-md-3">
            <label class="text-white fw-bold d-block mb-2">
              Preferred Date <span class="text-orange">*</span>
            </label>
            <input
              type="date"
              :value="formData.moveInDate"
              @change="updateFormField('moveInDate', $event.target.value)"
              @blur="handleBlur('moveInDate')"
              class="form-control"
              :class="{ invalid: fieldTouched.moveInDate && fieldErrors.moveInDate }"
              :min="minDate"
            />
            <div v-if="fieldTouched.moveInDate && fieldErrors.moveInDate" class="field-error">
              {{ fieldErrors.moveInDate }}
            </div>
          </div>

          <!-- Move-In Time -->
        <div class="col-9">
            <label class="text-white fw-bold d-block mb-2">Preferred Time</label>
            <div class="time-options">
              <label
                v-for="time in timeOptions"
                :key="time.value"
                class="time-option"
                :class="{ selected: formData.moveInTime === time.value }"
              >
                <input
                  type="radio"
                  name="moveInTime"
                  :value="time.value"
                  :checked="formData.moveInTime === time.value"
                  @change="updateFormField('moveInTime', time.value)"
                  class="time-radio"
                />
                <div class="time-card">
                  <i :class="time.icon" class="time-icon"></i>
                  <div class="time-label">{{ time.label }}</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Climate Control -->
      <!-- <div class="col-12">
        <div class="climate-control-option">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :checked="formData.climateControl"
              @change="updateFormField('climateControl', $event.target.checked)"
              id="climateControl"
            />
            <label class="form-check-label text-white" for="climateControl">
              <i class="fas fa-temperature-high text-orange me-2"></i>
              I need climate-controlled storage
              <span class="badge bg-orange-10 text-orange ms-2">+$25/month</span>
            </label>
          </div>
          <p class="text-gray small mb-0 mt-2 ms-4">
            Temperature and humidity controlled units protect sensitive items from extreme weather.
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'StorageLocationTab',
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
        { value: 'afternoon', label: 'Afternoon (12PM - 5PM)', icon: 'fas fa-cloud-sun' },
        { value: 'evening', label: 'Evening (5PM - 8PM)', icon: 'fas fa-cloud' },
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

.climate-control-option {
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  padding: var(--gap-lg);
  transition: var(--transition-base);
}

.climate-control-option:hover {
  border-color: var(--accent-orange);
  background: var(--orange-10);
}

.form-check-input {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  cursor: pointer;
}

.form-check-label {
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.badge.bg-orange-10 {
  background: var(--orange-10) !important;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-md);
  font-weight: 700;
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
  border-color: var(--accent-orange);
}

.time-option.selected .time-card {
  border-color: var(--accent-orange);
  box-shadow: 0 0 20px var(--orange-20);
}

.time-icon {
  font-size: var(--font-2xl);
  color: #2d3748;
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
</style>
