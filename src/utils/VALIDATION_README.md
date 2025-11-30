# Form Validation System

This is a global validation system that can be used across all forms in the application.

## Features

- **Name Validation**: Requires at least 2 characters, only letters, spaces, hyphens, and apostrophes
- **Phone Validation**: USA phone numbers (10 digits), auto-formats as (555) 123-4567
- **Email Validation**: Standard email format, can be optional or required
- **ZIP Code Validation**: USA ZIP codes (5 digits or 5+4 format), validates range
- **File Validation**: Supports images, videos, PDFs with size and count limits
- **Orange Theme**: Error messages and borders use orange color scheme

## Usage in Vue Components

### 1. Import the validators

```javascript
import { validators } from '../../utils/validators.js'
```

### 2. Add validation data properties

```javascript
data() {
  return {
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
    uploadedFiles: [],
  }
}
```

### 3. Add validation methods

```javascript
methods: {
  validateField(fieldName) {
    this.fieldTouched[fieldName] = true

    if (fieldName === 'files') {
      const result = validators.files.validate(this.uploadedFiles, {
        required: true,
        maxSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 10,
      })
      this.fieldErrors.files = result.error
      return result.valid
    }

    if (fieldName === 'email') {
      const result = validators.email.validate(this.formData.email, false) // false = optional
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
    // Auto-format phone number as user types
    this.formData.phone = validators.phone.format(this.formData.phone)
    this.clearFieldError('phone')
  },

  validateAllFields() {
    const fields = ['name', 'phone', 'email', 'zip', 'files']
    let isValid = true

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false
      }
    })

    return isValid
  },

  async handleSubmit() {
    // Validate before submitting
    if (!this.validateAllFields()) {
      this.submitMessage = 'Please fix the errors before submitting'
      return
    }

    // Continue with form submission...
  }
}
```

### 4. Add HTML with validation

```html
<!-- Name Field -->
<div class="form-group">
  <label class="text-white fw-bold d-block mb-2"> Name <span class="text-orange">*</span> </label>
  <input
    v-model="formData.name"
    type="text"
    name="name"
    class="form-control"
    :class="{ invalid: fieldTouched.name && fieldErrors.name }"
    placeholder="John Doe"
    @blur="validateField('name')"
    @input="clearFieldError('name')"
  />
  <div v-if="fieldTouched.name && fieldErrors.name" class="field-error">{{ fieldErrors.name }}</div>
</div>

<!-- Phone Field -->
<div class="form-group">
  <label class="text-white fw-bold d-block mb-2"> Phone <span class="text-orange">*</span> </label>
  <input
    v-model="formData.phone"
    type="tel"
    name="phone"
    class="form-control"
    :class="{ invalid: fieldTouched.phone && fieldErrors.phone }"
    placeholder="(555) 123-4567"
    @blur="validateField('phone')"
    @input="handlePhoneInput"
  />
  <div v-if="fieldTouched.phone && fieldErrors.phone" class="field-error">
    {{ fieldErrors.phone }}
  </div>
</div>

<!-- Email Field (Optional) -->
<div class="form-group">
  <label class="text-white fw-bold d-block mb-2">Email</label>
  <input
    v-model="formData.email"
    type="email"
    name="email"
    class="form-control"
    :class="{ invalid: fieldTouched.email && fieldErrors.email }"
    placeholder="john@example.com"
    @blur="validateField('email')"
    @input="clearFieldError('email')"
  />
  <div v-if="fieldTouched.email && fieldErrors.email" class="field-error">
    {{ fieldErrors.email }}
  </div>
</div>

<!-- ZIP Code Field -->
<div class="form-group">
  <label class="text-white fw-bold d-block mb-2">
    ZIP Code <span class="text-orange">*</span>
  </label>
  <input
    v-model="formData.zip"
    type="text"
    name="zip"
    class="form-control"
    :class="{ invalid: fieldTouched.zip && fieldErrors.zip }"
    placeholder="75001"
    maxlength="10"
    @blur="validateField('zip')"
    @input="clearFieldError('zip')"
  />
  <div v-if="fieldTouched.zip && fieldErrors.zip" class="field-error">{{ fieldErrors.zip }}</div>
</div>

<!-- File Upload -->
<div class="form-group">
  <label class="text-white fw-bold d-block mb-2">
    Upload Photos <span class="text-orange">*</span>
  </label>
  <div
    class="upload-area-compact"
    :class="{ invalid: fieldTouched.files && fieldErrors.files }"
    @click="triggerFileInput"
  >
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*,video/*,application/pdf"
      @change="handleFileSelect"
      style="display: none"
    />
    <!-- Upload UI here -->
  </div>
  <div v-if="fieldTouched.files && fieldErrors.files" class="field-error">
    {{ fieldErrors.files }}
  </div>
</div>
```

### 5. Add CSS (Orange Theme)

```css
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
}

/* Validation Styles */
.form-control.invalid {
  border-color: var(--accent-orange) !important;
  box-shadow: 0 0 0 3px var(--orange-10) !important;
}

.upload-area-compact.invalid {
  border-color: var(--accent-orange) !important;
  background: var(--orange-10) !important;
}

.field-error {
  color: var(--accent-orange);
  font-size: 12px;
  margin-top: 6px;
  text-align: left;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.field-error::before {
  content: '⚠';
  font-size: 12px;
}
```

## Validator Options

### Files Validator Options

```javascript
validators.files.validate(files, {
  required: true, // Whether files are required
  maxSize: 10 * 1024 * 1024, // Max file size in bytes (10MB)
  maxFiles: 10, // Maximum number of files
  allowedTypes: ['image/*', 'video/*', 'application/pdf'],
})
```

### Email Validator

```javascript
validators.email.validate(email, isRequired)
// isRequired: true or false
```

## Validation Rules

- **Name**:
  - Required
  - Min 2 characters
  - Only letters, spaces, hyphens, apostrophes

- **Phone**:
  - Required
  - 10 digits
  - Cannot start with 0 or 1
  - Auto-formats to (555) 123-4567

- **Email**:
  - Optional by default
  - Must be valid email format if provided

- **ZIP Code**:
  - Required
  - 5 digits or 5+4 format
  - Valid USA ZIP code range (00001-99950)

- **Files**:
  - Required by default
  - Max 10MB per file
  - Max 10 files
  - Accepts images, videos, PDFs

## Example: Complete Form Component

See `src/components/Hauling/Hauling.vue` for a complete implementation example.
