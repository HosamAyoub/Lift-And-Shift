<template>
  <div class="tab-content-wrapper">
    <h4 class="text-white mb-4">
      <i class="fas fa-user text-orange me-2"></i>Personal Information
    </h4>
    <p class="text-gray small mb-4">Let us know who you are and how to reach you.</p>

    <div class="row g-3">
      <!-- First Name -->
      <div class="col-md-6">
        <label class="text-white fw-bold d-block mb-2">
          First Name <span class="text-orange">*</span>
        </label>
        <input
          type="text"
          :value="formData.firstName"
          @input="updateFormField('firstName', $event.target.value)"
          @blur="handleBlur('firstName')"
          class="form-control"
          :class="{ invalid: fieldTouched.firstName && fieldErrors.firstName }"
          placeholder="John"
        />
        <div v-if="fieldTouched.firstName && fieldErrors.firstName" class="field-error">
          {{ fieldErrors.firstName }}
        </div>
      </div>

      <!-- Last Name -->
      <div class="col-md-6">
        <label class="text-white fw-bold d-block mb-2">
          Last Name <span class="text-orange">*</span>
        </label>
        <input
          type="text"
          :value="formData.lastName"
          @input="updateFormField('lastName', $event.target.value)"
          @blur="handleBlur('lastName')"
          class="form-control"
          :class="{ invalid: fieldTouched.lastName && fieldErrors.lastName }"
          placeholder="Doe"
        />
        <div v-if="fieldTouched.lastName && fieldErrors.lastName" class="field-error">
          {{ fieldErrors.lastName }}
        </div>
      </div>

      <!-- Phone -->
      <div class="col-md-6">
        <label class="text-white fw-bold d-block mb-2">
          Phone Number <span class="text-orange">*</span>
        </label>
        <input
          type="tel"
          :value="formData.phone"
          @input="handlePhoneInput($event)"
          @blur="handleBlur('phone')"
          class="form-control"
          :class="{ invalid: fieldTouched.phone && fieldErrors.phone }"
          placeholder="(555) 123-4567"
        />
        <div v-if="fieldTouched.phone && fieldErrors.phone" class="field-error">
          {{ fieldErrors.phone }}
        </div>
      </div>

      <!-- Email -->
      <div class="col-md-6">
        <label class="text-white fw-bold d-block mb-2">Email</label>
        <input
          type="email"
          :value="formData.email"
          @input="updateFormField('email', $event.target.value)"
          @blur="handleBlur('email')"
          class="form-control"
          :class="{ invalid: fieldTouched.email && fieldErrors.email }"
          placeholder="john.doe@example.com (optional)"
        />
        <div v-if="fieldTouched.email && fieldErrors.email" class="field-error">
          {{ fieldErrors.email }}
        </div>
      </div>

      <!-- Type of Help -->
      <div class="col-12">
        <label class="text-white fw-bold d-block mb-3">
          Type of Service <span class="text-orange">*</span>
        </label>
        <div class="service-options">
          <label
            v-for="service in services"
            :key="service.value"
            class="service-option"
            :class="{ selected: formData.helpType === service.value }"
          >
            <input
              type="radio"
              name="helpType"
              :value="service.value"
              :checked="formData.helpType === service.value"
              @change="updateFormField('helpType', service.value)"
              class="service-radio"
            />
            <div class="service-card">
              <i :class="service.icon" class="service-icon"></i>
              <div class="service-label">{{ service.label }}</div>
            </div>
          </label>
        </div>
        <div v-if="fieldTouched.helpType && fieldErrors.helpType" class="field-error">
          {{ fieldErrors.helpType }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validators } from '../../utils/validators.js'

export default {
  name: 'PersonalInfoTab',
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
      services: [
        { value: 'packing', label: 'Packing Only', icon: 'fas fa-box' },
        { value: 'moving', label: 'Moving Only', icon: 'fas fa-truck' },
        { value: 'storage', label: 'Storage Only', icon: 'fas fa-warehouse' },
        { value: 'packing-moving', label: 'Packing & Moving', icon: 'fas fa-boxes' },
        { value: 'full-service', label: 'Full Service (All)', icon: 'fas fa-star' },
      ],
    }
  },
  methods: {
    updateFormField(field, value) {
      const updated = { ...this.formData, [field]: value }
      this.$emit('update:formData', updated)
      // Clear error when user starts typing
      this.clearFieldError(field)
    },
    handleBlur(field) {
      const updatedTouched = { ...this.fieldTouched, [field]: true }
      this.$emit('update:fieldTouched', updatedTouched)
    },
    handlePhoneInput(event) {
      const formatted = validators.phone.format(event.target.value)
      this.updateFormField('phone', formatted)
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

.service-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--gap-md);
}

.service-option {
  position: relative;
  cursor: pointer;
}

.service-radio {
  display: none;
}

.service-card {
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  padding: var(--gap-lg);
  text-align: center;
  transition: var(--transition-base);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap-md);
}

.service-option:hover .service-card {
  background: var(--orange-10);
  border-color: var(--accent-orange);
  transform: translateY(-3px);
}

.service-option.selected .service-card {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 20px var(--orange-20);
}

.service-icon {
  font-size: 2rem;
  color: var(--accent-orange);
  transition: var(--transition-base);
}

.service-option.selected .service-icon {
  transform: scale(1.1);
}

.service-label {
  color: var(--text-light);
  font-weight: 600;
  font-size: var(--font-sm);
}

@media (max-width: 768px) {
  .service-options {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
