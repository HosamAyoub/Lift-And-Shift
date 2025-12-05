<template>
  <div style="background-color: var(--bg-dark); padding: 50px">
    <div class="container">
      <h1 style="color: white; margin-bottom: 30px">Contact Us</h1>

      <div class="row g-4">
        <!-- Contact Form -->
        <div class="col-lg-8">
          <div class="card-dark shadow-lg">
            <h3 class="text-white mb-4">Send Us a Message</h3>

            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                <!-- Name -->
                <div class="col-md-6">
                  <label class="form-label text-white fw-bold"
                    >Your Name <span class="text-orange">*</span></label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <!-- Email -->
                <div class="col-md-6">
                  <label class="form-label text-white fw-bold"
                    >Email Address <span class="text-orange">*</span></label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <!-- Phone -->
                <div class="col-md-6">
                  <label class="form-label text-white fw-bold">Phone Number</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="form-control"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <!-- Service Type -->
                <div class="col-md-6">
                  <label class="form-label text-white fw-bold">Service Interested In</label>
                  <select v-model="form.service" class="form-control">
                    <option value="">Select a service</option>
                    <option value="moving">Moving</option>
                    <option value="hauling">Hauling Removal</option>
                    <option value="storage">Storage</option>
                    <option value="demolition">Demolition</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Message -->
                <div class="col-12">
                  <label class="form-label text-white fw-bold"
                    >Your Message <span class="text-orange">*</span></label
                  >
                  <textarea
                    v-model="form.message"
                    class="form-control"
                    rows="6"
                    placeholder="Tell us about your project or question..."
                    required
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-lg w-100">
                    <i class="fas fa-paper-plane me-2"></i>Send Message
                  </button>
                </div>
              </div>
            </form>

            <p
              v-if="submitMessage"
              :class="submitSuccess ? 'text-success' : 'text-danger'"
              class="mt-3 mb-0"
            >
              {{ submitMessage }}
            </p>
          </div>
        </div>

        <!-- Contact Info Sidebar -->
        <div class="col-lg-4">
          <div class="card-dark shadow-lg mb-4">
            <h4 class="text-white mb-4">Contact Information</h4>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div>
                <h6 class="text-white mb-1">Phone</h6>
                <a href="tel:+18008899788" class="text-orange">(800) 889-9788</a>
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div>
                <h6 class="text-white mb-1">Email</h6>
                <a href="mailto:info@liftandshift.com" class="text-orange">info@liftandshift.com</a>
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h6 class="text-white mb-1">Service Area</h6>
                <p class="text-gray mb-0">Dallas-Fort Worth Metroplex</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div>
                <h6 class="text-white mb-1">Hours</h6>
                <p class="text-gray mb-0">
                  Mon-Fri: 7am - 8pm<br />
                  Sat-Sun: 8am - 6pm
                </p>
              </div>
            </div>
          </div>

          <!-- Quick Response -->
          <div class="card-dark shadow-lg">
            <div class="text-center">
              <div class="quick-response-icon mb-3">
                <i class="fas fa-bolt"></i>
              </div>
              <h5 class="text-white mb-2">Quick Response</h5>
              <p class="text-gray mb-0">
                We typically respond within 2-4 hours during business hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      },
      submitMessage: '',
      submitSuccess: false,
    }
  },
  methods: {
    handleSubmit() {
      // Simulate form submission
      this.submitSuccess = true
      this.submitMessage = "Thank you for your message! We'll get back to you within 24 hours."

      // Reset form after 3 seconds
      setTimeout(() => {
        this.form = {
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        }
        this.submitMessage = ''
      }, 3000)
    },
  },
}
</script>

<style scoped>
/* Page Header */
.page-header {
  position: relative;
  padding: var(--gap-xxl) 0;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--orange-10) 20%,
    var(--orange-20) 50%,
    var(--orange-10) 80%,
    transparent 100%
  );
  transform: translateY(-50%);
  z-index: 0;
}

.header-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--gap-xl);
  z-index: 1;
}

.header-badge {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--text-light);
  box-shadow: 0 10px 30px var(--orange-40);
  animation: float 3s ease-in-out infinite;
}

.header-text {
  flex: 1;
}

.display-4 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  position: relative;
}

.display-4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--accent-orange);
  border-radius: var(--radius-sm);
}

.lead {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-top: var(--gap-lg);
}

.header-decoration {
  position: absolute;
  top: 0;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--orange-10) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Form Styles */
h3,
h4,
h5,
h6 {
  font-weight: 700;
}

.form-label {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.form-control,
.form-select {
  border: 1px solid var(--orange-10) !important;
  background-color: var(--primary-dark) !important;
  color: var(--text-light) !important;
  padding: 0.75rem 1rem;
  transition: var(--transition-base);
}

.form-control:focus,
.form-select:focus {
  border-color: var(--accent-orange) !important;
  box-shadow: 0 0 0 0.2rem var(--orange-20) !important;
  background-color: var(--primary-dark) !important;
}

.form-control::placeholder {
  color: var(--text-gray) !important;
}

textarea.form-control {
  resize: vertical;
}

/* Contact Items */
.contact-item {
  display: flex;
  gap: var(--gap-lg);
  align-items: flex-start;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--text-light);
  flex-shrink: 0;
}

.contact-item a {
  text-decoration: none;
  transition: var(--transition-base);
}

.contact-item a:hover {
  opacity: 0.8;
}

.contact-item h6 {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Quick Response */
.quick-response-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 2rem;
  color: var(--text-light);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    gap: var(--gap-lg);
  }

  .header-badge {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .display-4 {
    font-size: 2rem;
  }

  .lead {
    font-size: 1rem;
  }

  .header-decoration {
    width: 150px;
    height: 150px;
    right: -30px;
  }
}
</style>
