// Global validation utility functions

export const validators = {
  // Name validation
  name: {
    validate(value) {
      if (!value || value.trim() === '') {
        return { valid: false, error: 'Name is required' }
      }
      if (value.trim().length < 2) {
        return { valid: false, error: 'Name must be at least 2 characters' }
      }
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        return {
          valid: false,
          error: 'Name can only contain letters, spaces, hyphens, and apostrophes',
        }
      }
      return { valid: true, error: '' }
    },
  },

  // USA Phone validation
  phone: {
    validate(value) {
      if (!value || value.trim() === '') {
        return { valid: false, error: 'Phone number is required' }
      }
      // Remove all non-digit characters
      const cleaned = value.replace(/\D/g, '')
      // Check if it's a valid US phone number (10 digits)
      if (cleaned.length !== 10) {
        return { valid: false, error: 'Phone number must be 10 digits' }
      }
      // Check if first digit is not 0 or 1
      if (cleaned[0] === '0' || cleaned[0] === '1') {
        return { valid: false, error: 'Phone number cannot start with 0 or 1' }
      }
      return { valid: true, error: '' }
    },
    format(value) {
      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length <= 3) return cleaned
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    },
  },

  // Email validation (optional)
  email: {
    validate(value, isRequired = false) {
      if (!value || value.trim() === '') {
        if (isRequired) {
          return { valid: false, error: 'Email is required' }
        }
        return { valid: true, error: '' }
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return { valid: false, error: 'Please enter a valid email address' }
      }
      return { valid: true, error: '' }
    },
  },

  // USA ZIP Code validation
  zip: {
    validate(value) {
      if (!value || value.trim() === '') {
        return { valid: false, error: 'ZIP code is required' }
      }
      // USA ZIP codes: 5 digits or 5+4 format
      const zipRegex = /^\d{5}(-\d{4})?$/
      if (!zipRegex.test(value)) {
        return { valid: false, error: 'ZIP code must be 5 digits (e.g., 75001)' }
      }
      // Basic range check for USA ZIP codes (00001-99950)
      const zipNum = parseInt(value.slice(0, 5))
      if (zipNum < 1 || zipNum > 99950) {
        return { valid: false, error: 'Please enter a valid USA ZIP code' }
      }
      return { valid: true, error: '' }
    },
  },

  // File upload validation
  files: {
    validate(files, options = {}) {
      const {
        required = true,
        maxSize = 10 * 1024 * 1024, // 10MB default
        maxFiles = 10,
        allowedTypes = ['image/*', 'video/*', 'application/pdf'],
      } = options

      if (!files || files.length === 0) {
        if (required) {
          return { valid: false, error: 'Please upload at least one file' }
        }
        return { valid: true, error: '' }
      }

      if (files.length > maxFiles) {
        return { valid: false, error: `Maximum ${maxFiles} files allowed` }
      }

      for (const file of files) {
        // Check file size
        if (file.size > maxSize) {
          return {
            valid: false,
            error: `File "${file.name}" exceeds ${maxSize / (1024 * 1024)}MB limit`,
          }
        }

        // Check file type
        const isAllowed = allowedTypes.some((type) => {
          if (type.endsWith('/*')) {
            const category = type.split('/')[0]
            return file.type.startsWith(category + '/')
          }
          return file.type === type
        })

        if (!isAllowed) {
          return {
            valid: false,
            error: `File "${file.name}" type not allowed. Accepted: images, videos, PDFs`,
          }
        }
      }

      return { valid: true, error: '' }
    },
  },
}

// Validation composable for Vue
export function useValidation() {
  return {
    validators,
    validateField(fieldName, value, options = {}) {
      if (!validators[fieldName]) {
        console.warn(`No validator found for field: ${fieldName}`)
        return { valid: true, error: '' }
      }
      return validators[fieldName].validate(value, options)
    },
  }
}
