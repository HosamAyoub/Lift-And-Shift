<template>
  <!-- Custom Hero Section -->
  <section class="careers-hero">
    <div class="hero-background">
      <div class="hero-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <div class="container">
      <div class="row align-items-center" style="padding: 60px 0">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="hero-content">
            <div class="badge-wrapper scroll-reveal animate-fadeInDown">
              <span class="hero-badge">
                <i class="fas fa-briefcase"></i>
                We're Hiring!
              </span>
            </div>

            <h1 class="hero-title scroll-reveal animate-fadeInUp">
              Build Your <span class="text-orange">Career</span> With Us
            </h1>

            <p class="hero-subtitle scroll-reveal animate-fadeInUp animate-delay-100">
              Join a dynamic team that's revolutionizing the moving industry. We offer competitive
              pay, excellent benefits, and real opportunities for professional growth.
            </p>

            <!-- <div class="hero-features scroll-reveal animate-fadeInUp animate-delay-200">
              <div class="feature-item">
                <i class="fas fa-check-circle"></i>
                <span>Competitive Salary & Bonuses</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-check-circle"></i>
                <span>Full Health Benefits</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-check-circle"></i>
                <span>Career Advancement</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-check-circle"></i>
                <span>Flexible Scheduling</span>
              </div>
            </div> -->

            <div class="hero-buttons scroll-reveal animate-fadeInUp animate-delay-300">
              <button @click="scrollToForm" class="btn btn-primary btn-lg me-3">
                <span>Apply Now</span>
                <i class="fas fa-arrow-down ms-2"></i>
              </button>
              <a class="btn btn-outline-primary btn-lg" href="tel:+18008899788">
                <i class="fas fa-phone me-2"></i>
                <span>Call Us</span>
              </a>
            </div>

            <!-- <div class="hero-stats scroll-reveal animate-fadeInUp animate-delay-400">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Team Members</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">15+</div>
                <div class="stat-label">Years Experience</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">4.8</div>
                <div class="stat-label">Employee Rating</div>
              </div>
            </div> -->
          </div>
        </div>

        <div class="col-lg-6">
          <div class="hero-image scroll-reveal animate-fadeInRight">
            <img :src="heroImage" alt="Join Our Team" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Work With Us -->
  <section class="section section-dark">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <BenefitCards
            title="Why Work <span class='text-orange'>With Us?</span>"
            subtitle="Join a company that values its employees and invests in their success"
            :benefits="benefits"
            :columnSize="4"
            sectionClass=""
            :showHeader="true"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Career Image Section -->
  <section class="section section-light">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <div class="career-image-wrapper scroll-reveal">
            <img :src="careerImage" alt="Delivery Driver" class="career-image" />
          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="career-content scroll-reveal">
            <h2 class="mb-4" style="color: white">
              <span class="text-orange">Grow</span> Your Career With Us
            </h2>
            <p class="mb-4" style="color: rgba(255, 255, 255, 0.85)">
              We're always looking for talented, motivated individuals to join our growing team.
              Whether you're an experienced mover, driver, or looking to start your career in the
              moving industry, we have opportunities for you.
            </p>
            <div class="career-highlights">
              <div class="highlight-item">
                <i class="fas fa-check-circle text-orange"></i>
                <span style="color: white">Professional training provided</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-check-circle text-orange"></i>
                <span style="color: white">Advancement opportunities</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-check-circle text-orange"></i>
                <span style="color: white">Supportive team environment</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-check-circle text-orange"></i>
                <span style="color: white">Work-life balance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Application Form Section -->
  <section class="section section-dark py-5 careers-form-section">
    <div class="container-lg">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card-dark shadow-xl">
            <div class="form-header text-center mb-5 scroll-reveal">
              <h2 class="mb-3">Apply <span class="text-orange">Now</span></h2>
              <p class="text-gray">
                Fill out the application form below and upload your resume. We'll get back to you
                within 48 hours.
              </p>
            </div>

            <Form
              :formData="formData"
              :fieldErrors="fieldErrors"
              :fieldTouched="fieldTouched"
              :uploadedFiles="uploadedFiles"
              :isSubmitting="isSubmitting"
              :submitMessage="submitMessage"
              :submitSuccess="submitSuccess"
              @update:formData="formData = $event"
              @update:fieldErrors="fieldErrors = $event"
              @update:fieldTouched="fieldTouched = $event"
              @update:uploadedFiles="uploadedFiles = $event"
              @submit="handleSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BenefitCards from '../Shared/BenefitCards.vue'
import Form from './Form.vue'

export default {
  name: 'Careers',
  components: {
    BenefitCards,
    Form,
  },
  data() {
    return {
      heroImage: '../../../public/assets/images/Hero.png',
      careerImage: '../../../public/assets/images/Content.png',
      benefits: [
        // {
        //   icon: 'fas fa-dollar-sign',
        //   title: 'Competitive Pay',
        //   description:
        //     'We offer industry-leading compensation packages with performance bonuses and overtime opportunities.',
        // },
        // {
        //   icon: 'fas fa-heart',
        //   title: 'Health Benefits',
        //   description:
        //     'Comprehensive health, dental, and vision insurance for you and your family.',
        // },
        // {
        //   icon: 'fas fa-graduation-cap',
        //   title: 'Training & Growth',
        //   description:
        //     'Professional development programs and clear career advancement paths for all employees.',
        // },
        {
          icon: 'fas fa-calendar-check',
          title: 'Flexible Schedule',
          description: 'Work-life balance with flexible scheduling options and paid time off.',
        },
        {
          icon: 'fas fa-users',
          title: 'Great Team',
          description: 'Join a supportive, collaborative team that values respect and teamwork.',
        },
        {
          icon: 'fas fa-award',
          title: 'Tips & Bonuses',
          description: 'Employee recognition programs and rewards for outstanding performance.',
        },
      ],
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        availability: '',
        message: '',
      },
      uploadedFiles: [],
      fieldErrors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        resume: '',
      },
      fieldTouched: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        position: false,
      },
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false,
    }
  },
  methods: {
    callNow() {
      window.location.href = 'tel:+18008899788'
    },
    scrollToForm() {
      const formSection = document.querySelector('.careers-form-section')
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    async handleSubmit() {
      if (this.isSubmitting) return

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        const formDataToSend = new FormData()
        formDataToSend.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
        formDataToSend.append('form', 'Careers')
        formDataToSend.append('first_name', this.formData.firstName)
        formDataToSend.append('last_name', this.formData.lastName)
        formDataToSend.append('email', this.formData.email)
        formDataToSend.append('phone', this.formData.phone)
        formDataToSend.append('position', this.formData.position)
        formDataToSend.append('experience', this.formData.experience)
        formDataToSend.append('availability', this.formData.availability)
        formDataToSend.append('message', this.formData.message)

        this.uploadedFiles.forEach((file, index) => {
          formDataToSend.append(`resume_${index}`, file)
        })

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formDataToSend,
        })

        const data = await response.json()

        if (data.success) {
          this.submitSuccess = true
          this.submitMessage =
            'Thank you for your application! We will review it and get back to you within 48 hours.'
          setTimeout(() => {
            this.formData = {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              position: '',
              experience: '',
              availability: '',
              message: '',
            }
            this.uploadedFiles = []
            this.fieldErrors = {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              position: '',
            }
            this.fieldTouched = {
              firstName: false,
              lastName: false,
              email: false,
              phone: false,
              position: false,
            }
            this.submitMessage = ''
            this.submitSuccess = false
          }, 5000)
        } else {
          this.submitSuccess = false
          this.submitMessage =
            'Something went wrong. Please try again or call us at (800) 889-9788.'
        }
      } catch (error) {
        this.submitSuccess = false
        this.submitMessage = 'Network error. Please check your connection and try again.'
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style scoped>
/* Hero Section */
.careers-hero {
  position: relative;
  min-height: 80vh;
  background: linear-gradient(135deg, var(--bg-dark) 0%, #1a1a2e 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.hero-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  opacity: 0.1;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: 10%;
  left: -50px;
  animation-delay: 7s;
}

.shape-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  animation-delay: 3s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.badge-wrapper {
  margin-bottom: 1.5rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.9rem;
  animation: slideInDown 0.8s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 90%;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

.feature-item i {
  color: var(--accent-orange);
  font-size: 1.2rem;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-lg);
  margin-bottom: 3rem;
}

.hero-buttons .btn {
  text-decoration: none;
}

.hero-buttons .btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(255, 107, 0, 0.4);
}

.hero-buttons .btn-outline-primary {
  border: 2px solid var(--accent-orange);
  color: var(--accent-orange);
  background: transparent;
}

.hero-buttons .btn-outline-primary:hover {
  background: var(--accent-orange);
  color: white;
  transform: translateY(-3px);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-orange);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
}

.hero-image {
  position: relative;
  z-index: 1;
}

.hero-image img {
  border-radius: var(--radius-xl);
  /* box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4); */
  width: 100%;
  height: auto;
  animation: fadeInScale 1s ease-out;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-orange), transparent);
  opacity: 0.2;
  border-radius: var(--radius-xl);
  pointer-events: none;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.career-image-wrapper {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-out;
}

.career-image {
  width: 100%;
  height: auto;
  display: block;
}

.career-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
}

.career-content p {
  font-size: 1.1rem;
  line-height: 1.8;
}

.career-highlights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

.highlight-item i {
  font-size: 1.2rem;
}

.form-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
}

.form-header p {
  font-size: 1.1rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    max-width: 100%;
  }

  .hero-features {
    grid-template-columns: 1fr;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-buttons .btn {
    width: 100%;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .stat-divider {
    width: 100%;
    height: 1px;
  }

  .career-content h2 {
    font-size: 2rem;
  }

  .form-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 992px) {
  .hero-image {
    margin-top: 3rem;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
  }
}
</style>
