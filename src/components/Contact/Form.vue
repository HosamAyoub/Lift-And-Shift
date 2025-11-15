<template>
  <section class="section section-dark py-5">
    <div class="container-lg">
      <!-- Hero Section -->
      <div class="text-center mb-5 pb-4">
        <h1 class="h1 text-white mb-3">Get In Touch</h1>
        <p class="text-gray lead">Ready to lift your burdens and shift to better solutions? We're here to help.</p>
        <div class="row justify-content-center mt-4">
          <div class="col-md-8">
            <p class="text-gray">
              Whether you need Hauling, moving services, or demolition work, our North Dallas team is ready to provide fast, transparent, and professional service.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content Section -->
      <div class="row g-5 align-items-start">
        <!-- Contact Form -->
        <div class="col-lg-7">
          <div class="card-dark shadow-lg">
            <div class="card-header-dark">
              <h3 class="text-white mb-2">Send Us a Message</h3>
              <p class="text-gray mb-0">We typically respond within 1-2 hours during business hours</p>
            </div>
            
            <form @submit.prevent="submitForm" class="p-4">
              <!-- Service Type Selection -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-3">What service do you need?</label>
                <div class="service-buttons">
                  <button
                    v-for="service in services"
                    :key="service.id"
                    type="button"
                    class="service-btn"
                    :class="{ active: selectedService === service.id }"
                    @click="selectService(service.id)"
                  >
                    <i :class="service.icon" class="me-2"></i>
                    {{ service.name }}
                  </button>
                </div>
              </div>

              <!-- Personal Information -->
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Full Name *</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                    placeholder="Your name"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Phone Number *</label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    class="form-control"
                    placeholder="+1 (800) 889-9788"
                    required
                  >
                </div>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Email Address *</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    class="form-control"
                    placeholder="you@example.com"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Service Location *</label>
                  <input
                    v-model="formData.location"
                    type="text"
                    class="form-control"
                    placeholder="City, ZIP code"
                    required
                  >
                </div>
              </div>

              <!-- Project Details -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-2">Project Details</label>
                <textarea
                  v-model="formData.message"
                  class="form-control"
                  rows="5"
                  placeholder="Tell us about your project... Include details like:
• Type and amount of items for removal
• Moving from/to locations
• Demolition scope (shed, deck, interior, etc.)
• Any special requirements or access issues"
                ></textarea>
              </div>

              <!-- Urgency & Preferences -->
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Preferred Contact Method</label>
                  <select v-model="formData.contactMethod" class="form-control">
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="text-white fw-bold d-block mb-2">Urgency</label>
                  <select v-model="formData.urgency" class="form-control">
                    <option value="flexible">Flexible Schedule</option>
                    <option value="soon">Within the Week</option>
                    <option value="urgent">Next 1-2 Days</option>
                    <option value="emergency">Same Day</option>
                  </select>
                </div>
              </div>

              <!-- Photo Upload -->
              <div class="mb-4">
                <label class="text-white fw-bold d-block mb-2">
                  <i class="fas fa-camera me-2"></i>Upload Photos (Optional)
                </label>
                <p class="text-gray small mb-3">Photos help us provide accurate estimates - especially for hauling and demolition projects.</p>
                <div class="upload-area position-relative rounded" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop">
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    @change="handleFileSelect"
                    style="display: none"
                  >
                  <div class="text-center py-4">
                    <i class="fas fa-cloud-upload-alt text-orange" style="font-size: 2rem"></i>
                    <p class="text-gray mt-2 mb-1">Drag & drop or click to upload</p>
                    <p class="text-gray small">Upload photos of items, spaces, or project areas</p>
                  </div>
                </div>
                <div v-if="uploadedFiles.length > 0" class="mt-2">
                  <div v-for="(file, index) in uploadedFiles" :key="index" class="uploaded-file">
                    <i class="fas fa-file-image text-orange me-2"></i>
                    <span class="text-gray small">{{ file.name }}</span>
                    <button @click="removeFile(index)" class="btn-remove">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary btn-lg w-100" :disabled="isSubmitting">
                <span v-if="isSubmitting">
                  <i class="fas fa-spinner fa-spin me-2"></i>Sending...
                </span>
                <span v-else>
                  <i class="fas fa-paper-plane me-2"></i>Get Your Free Quote
                </span>
              </button>

              <p class="text-gray small text-center mt-3">
                We respect your privacy and never share your information with third parties.
              </p>
            </form>
          </div>
        </div>

        <!-- Contact Information & Features -->
        <div class="col-lg-5">
          <!-- Contact Info Cards -->
          <div class="mb-4">
            <div class="card-dark shadow-lg mb-3">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <div class="contact-icon">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div>
                    <h5 class="text-white mb-1">Call or Text Us</h5>
                    <p class="text-orange h5 mb-0">+1 (800) 889-9788</p>
                  </div>
                </div>
                <p class="text-gray small mb-0">Fast response guaranteed - text photos for instant estimates</p>
              </div>
            </div>

            <div class="card-dark shadow-lg mb-3">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h5 class="text-white mb-1">Email Us</h5>
                    <p class="text-orange h5 mb-0">contact@liftshiftservices.com</p>
                  </div>
                </div>
                <p class="text-gray small mb-0">We'll respond within 2 hours during business hours</p>
              </div>
            </div>

            <div class="card-dark shadow-lg">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <div class="contact-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h5 class="text-white mb-1">Service Area</h5>
                    <p class="text-orange h5 mb-0">North Dallas</p>
                  </div>
                </div>
                <div class="service-tags">
                  <span class="service-tag">Plano</span>
                  <span class="service-tag">Frisco</span>
                  <span class="service-tag">McKinney</span>
                  <span class="service-tag">Allen</span>
                  <span class="service-tag">DFW Metro</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Why Choose Us -->
          <div class="card-dark shadow-lg">
            <div class="card-header-dark">
              <h4 class="text-white mb-3">Why Choose Lift & Shift?</h4>
            </div>
            <div class="card-body">
              <div class="feature-item mb-3" v-for="feature in features" :key="feature.id">
                <div class="d-flex align-items-start">
                  <i :class="feature.icon" class="text-orange me-3 mt-1"></i>
                  <div>
                    <h6 class="text-white mb-1">{{ feature.title }}</h6>
                    <p class="text-gray small mb-0">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="card-dark shadow-lg mt-4">
            <div class="card-body">
              <h5 class="text-white mb-3">
                <i class="fas fa-clock text-orange me-2"></i>Business Hours
              </h5>
              <div class="hours-list">
                <div class="hour-item d-flex justify-content-between mb-2" v-for="hour in businessHours" :key="hour.day">
                  <span class="text-gray">{{ hour.day }}</span>
                  <span class="text-white">{{ hour.hours }}</span>
                </div>
              </div>
              <div class="mt-3 p-3 rounded emergency-banner">
                <i class="fas fa-bolt text-orange me-2"></i>
                <span class="text-white small">Emergency same-day service available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="cta-banner text-center p-5 rounded">
            <h3 class="text-white mb-3">Need Immediate Assistance?</h3>
            <p class="text-gray mb-4">Call us directly for same-day or emergency services</p>
            <a href="tel:+1 (800) 889-9788" class="btn btn-primary btn-lg me-3">
              <i class="fas fa-phone me-2"></i>Call Now
            </a>
            <a href="sms:+1 (800) 889-9788" class="btn btn-outline-primary btn-lg">
              <i class="fas fa-comment me-2"></i>Text Photos
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      selectedService: 'junk',
      isSubmitting: false,
      uploadedFiles: [],
      formData: {
        name: '',
        phone: '',
        email: '',
        location: '',
        message: '',
        contactMethod: 'phone',
        urgency: 'flexible'
      },
      services: [
        { id: 'junk', name: 'Hauling', icon: 'fas fa-trash-alt' },
        { id: 'moving', name: 'Moving & Storage', icon: 'fas fa-truck-moving' },
        { id: 'demo', name: 'Demolition', icon: 'fas fa-hammer' },
        { id: 'other', name: 'Other Service', icon: 'fas fa-question' }
      ],
      features: [
        {
          id: 1,
          icon: 'fas fa-bolt',
          title: 'Same Day Service',
          description: 'Emergency and same-day appointments available for urgent projects'
        },
        {
          id: 2,
          icon: 'fas fa-dollar-sign',
          title: 'Transparent Pricing',
          description: 'No hidden fees - know exactly what you\'ll pay upfront'
        },
        {
          id: 3,
          icon: 'fas fa-shield-alt',
          title: 'Licensed & Insured',
          description: 'Fully licensed and insured for your peace of mind'
        },
        {
          id: 4,
          icon: 'fas fa-users',
          title: 'Living Wage Employer',
          description: 'We pay fair wages and invest in our team members'
        }
      ],
      businessHours: [
        { day: 'Monday - Friday', hours: '7:00 AM - 8:00 PM' },
        { day: 'Saturday', hours: '8:00 AM - 6:00 PM' },
        { day: 'Sunday', hours: '9:00 AM - 5:00 PM' }
      ]
    }
  },
  methods: {
    selectService(serviceId) {
      this.selectedService = serviceId
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileSelect(event) {
      const files = Array.from(event.target.files)
      this.uploadedFiles = [...this.uploadedFiles, ...files]
    },
    handleFileDrop(event) {
      const files = Array.from(event.dataTransfer.files)
      this.uploadedFiles = [...this.uploadedFiles, ...files]
    },
    removeFile(index) {
      this.uploadedFiles.splice(index, 1)
    },
    async submitForm() {
      this.isSubmitting = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success message
      alert('Thank you for your message! We\'ll contact you within 2 hours during business hours.')
      
      // Reset form
      this.formData = {
        name: '',
        phone: '',
        email: '',
        location: '',
        message: '',
        contactMethod: 'phone',
        urgency: 'flexible'
      }
      this.uploadedFiles = []
      this.selectedService = 'junk'
      this.isSubmitting = false
    }
  }
}
</script>

<style scoped>
.card-dark {
  background: var(--primary-dark);
  border: 1px solid var(--orange-10);
  border-radius: 1rem;
  transition: var(--transition-base);
}

.card-dark:hover {
  border-color: var(--accent-orange);
  box-shadow: 0 10px 30px var(--black-30);
}

.card-header-dark {
  background: var(--orange-10);
  border-bottom: 1px solid var(--orange-10);
  padding: 1.5rem;
  border-radius: 1rem 1rem 0 0;
}

.service-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.service-btn {
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: 0.75rem;
  padding: 1rem;
  color: var(--text-gray);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-base);
  text-align: center;
}

.service-btn:hover {
  border-color: var(--accent-orange);
  background: var(--orange-10);
  transform: translateY(-2px);
}

.service-btn.active {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
  color: #000000;
  font-weight: 600;
}

.contact-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--orange-10);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.contact-icon i {
  font-size: 1.25rem;
  color: var(--accent-orange);
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.service-tag {
  background: var(--orange-10);
  border: 1px solid var(--accent-orange);
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  color: var(--accent-orange);
  font-size: 0.75rem;
  font-weight: 500;
}

.upload-area {
  background: var(--primary-dark);
  border: 2px dashed var(--orange-20);
  cursor: pointer;
  transition: var(--transition-base);
}

.upload-area:hover {
  border-color: var(--accent-orange);
  background: rgba(217, 102, 22, 0.05);
}

.uploaded-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.btn-remove {
  background: none;
  border: none;
  color: var(--text-gray);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: var(--transition-base);
}

.btn-remove:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.feature-item {
  padding: 0.5rem 0;
}

.hours-list {
  border-top: 1px solid var(--orange-10);
  border-bottom: 1px solid var(--orange-10);
  padding: 1rem 0;
}

.emergency-banner {
  background: linear-gradient(135deg, rgba(217, 102, 22, 0.2), var(--orange-10));
  border: 1px solid var(--accent-orange);
}

.cta-banner {
  background: linear-gradient(135deg, var(--primary-dark), var(--orange-10));
  border: 2px solid var(--accent-orange);
}

.btn-primary {
  background: var(--accent-orange);
  border: 1px solid var(--accent-orange);
  color: #000000;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  transition: var(--transition-base);
}

.btn-primary:hover:not(:disabled) {
  background:var(--accent-orange-dark);
  border-color: var(--accent-orange-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(217, 102, 22, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-outline-primary {
  background: transparent;
  border: 2px solid var(--accent-orange);
  color: var(--accent-orange);
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  transition: var(--transition-base);
}

.btn-outline-primary:hover {
  background: var(--accent-orange);
  color: #000000;
  transform: translateY(-2px);
}

.form-control {
  background: var(--primary-dark) !important;
  border: 1px solid var(--orange-10) !important;
  color: var(--text-light) !important;
  border-radius: 0.75rem !important;
  padding: 0.75rem 1rem !important;
  transition: var(--transition-base) !important;
}

.form-control:focus {
  border-color: var(--accent-orange) !important;
  box-shadow: 0 0 0 0.2rem rgba(217, 102, 22, 0.25) !important;
  background: var(--primary-dark) !important;
}

.form-control::placeholder {
  color: var(--text-gray) !important;
}

.text-orange {
  color: var(--accent-orange) !important;
}

.text-gray {
  color: var(--text-gray) !important;
}

.text-white {
  color: var(--text-light) !important;
}

@media (max-width: 768px) {
  .service-buttons {
    grid-template-columns: 1fr;
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
    margin-right: 0.75rem;
  }
  
  .btn-primary,
  .btn-outline-primary {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .cta-banner .btn {
    width: 100%;
    margin: 0.25rem 0;
  }
}
</style>