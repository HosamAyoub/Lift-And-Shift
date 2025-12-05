<template>
  <div class="tab-content-wrapper">
    <h4 class="text-white mb-4">
      <i class="fas fa-map-marker-alt text-orange me-2"></i>Location Details
    </h4>
    <p class="text-gray small mb-4">Tell us where to pick up and drop off your items.</p>

    <!-- Pickup Address Section -->
    <div class="location-section mb-5">
      <h5 class="text-white mb-3">
        <i class="fas fa-arrow-up text-orange me-2"></i>Pickup Address
      </h5>

      <div class="row g-3">
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
            placeholder="Dallas"
          />
          <div v-if="fieldTouched.pickupCity && fieldErrors.pickupCity" class="field-error">
            {{ fieldErrors.pickupCity }}
          </div>
        </div>

        <div class="col-md-4">
          <label class="text-white fw-bold d-block mb-2">
            State <span class="text-orange">*</span>
          </label>
          <select
            :value="formData.pickupState"
            @change="updateFormField('pickupState', $event.target.value)"
            @blur="handleBlur('pickupState')"
            class="form-control"
            :class="{ invalid: fieldTouched.pickupState && fieldErrors.pickupState }"
          >
            <option value="">Select State</option>
            <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
          </select>
          <div v-if="fieldTouched.pickupState && fieldErrors.pickupState" class="field-error">
            {{ fieldErrors.pickupState }}
          </div>
        </div>

        <div class="col-md-4">
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
            type="text"
            :value="formData.pickupFloor"
            @input="updateFormField('pickupFloor', $event.target.value)"
            class="form-control"
            placeholder="Floor # (optional)"
          />
        </div>
      </div>
    </div>

    <!-- Pickup Date & Time -->
    <div class="datetime-section mb-5">
      <h5 class="text-white mb-3">
        <i class="fas fa-calendar-alt text-orange me-2"></i>Pickup Date & Time
      </h5>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="text-white fw-bold d-block mb-2">
            Pickup Date <span class="text-orange">*</span>
          </label>
          <input
            type="date"
            :value="formData.pickupDate"
            @input="updateFormField('pickupDate', $event.target.value)"
            @blur="handleBlur('pickupDate')"
            class="form-control"
            :class="{ invalid: fieldTouched.pickupDate && fieldErrors.pickupDate }"
            :min="minDate"
          />
          <div v-if="fieldTouched.pickupDate && fieldErrors.pickupDate" class="field-error">
            {{ fieldErrors.pickupDate }}
          </div>
        </div>

        <div class="col-md-6">
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
                <span>{{ time.label }}</span>
              </div>
            </label>
          </div>
          <div v-if="fieldTouched.pickupTime && fieldErrors.pickupTime" class="field-error">
            {{ fieldErrors.pickupTime }}
          </div>
        </div>
      </div>
    </div>

    <!-- Dropoff Address Section -->
    <div class="location-section">
      <h5 class="text-white mb-3">
        <i class="fas fa-arrow-down text-orange me-2"></i>Drop-off Address
      </h5>

      <div class="row g-3">
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
            placeholder="Fort Worth"
          />
          <div v-if="fieldTouched.dropoffCity && fieldErrors.dropoffCity" class="field-error">
            {{ fieldErrors.dropoffCity }}
          </div>
        </div>

        <div class="col-md-4">
          <label class="text-white fw-bold d-block mb-2">
            State <span class="text-orange">*</span>
          </label>
          <select
            :value="formData.dropoffState"
            @change="updateFormField('dropoffState', $event.target.value)"
            @blur="handleBlur('dropoffState')"
            class="form-control"
            :class="{ invalid: fieldTouched.dropoffState && fieldErrors.dropoffState }"
          >
            <option value="">Select State</option>
            <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
          </select>
          <div v-if="fieldTouched.dropoffState && fieldErrors.dropoffState" class="field-error">
            {{ fieldErrors.dropoffState }}
          </div>
        </div>

        <div class="col-md-4">
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
            placeholder="76102"
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
            placeholder="Building name or organization (optional)"
          />
        </div>

        <div class="col-md-4">
          <label class="text-white fw-bold d-block mb-2">Floor</label>
          <input
            type="text"
            :value="formData.dropoffFloor"
            @input="updateFormField('dropoffFloor', $event.target.value)"
            class="form-control"
            placeholder="Floor # (optional)"
          />
        </div>
      </div>
    </div>
  </div>
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
  },
  emits: ['update:formData', 'update:fieldErrors', 'update:fieldTouched'],
  data() {
    return {
      states: ['TX', 'OK', 'AR', 'LA', 'NM', 'CO', 'KS', 'MO'],
      timeOptions: [
        { value: 'morning', label: 'Morning', icon: 'fas fa-sun' },
        { value: 'afternoon', label: 'Afternoon', icon: 'fas fa-cloud-sun' },
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
    updateFormField(field, value) {
      const updated = { ...this.formData, [field]: value }
      this.$emit('update:formData', updated)
    },
    handleBlur(field) {
      const updatedTouched = { ...this.fieldTouched, [field]: true }
      this.$emit('update:fieldTouched', updatedTouched)
    },
  },
}
</script>

<style scoped>
.tab-content-wrapper {
  padding: var(--gap-lg);
}

.location-section,
.datetime-section {
  padding: var(--gap-lg);
  background: var(--primary-dark);
  border: 1px solid var(--orange-10);
  border-radius: var(--radius-lg);
}

.time-options {
  display: flex;
  gap: var(--gap-md);
}

.time-option {
  flex: 1;
  cursor: pointer;
}

.time-radio {
  display: none;
}

.time-card {
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  padding: var(--gap-lg);
  text-align: center;
  transition: var(--transition-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-sm);
}

.time-option:hover .time-card {
  background: var(--orange-10);
  border-color: var(--accent-orange);
  transform: translateY(-2px);
}

.time-option.selected .time-card {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 15px var(--orange-20);
}

.time-icon {
  font-size: 1.5rem;
  color: var(--accent-orange);
}

.time-card span {
  color: var(--text-light);
  font-weight: 600;
  font-size: var(--font-sm);
}
</style>
