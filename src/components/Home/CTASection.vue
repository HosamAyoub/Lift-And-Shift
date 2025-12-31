<template>
  <section class="cta-section section">
    <div class="container">
      <div class="cta-wrapper">
        <div class="row align-items-center">
          <div class="col-lg-8 mb-4 mb-lg-0">
            <h2 class="cta-title mb-3">Ready to Get Started?</h2>
            <p class="cta-subtitle mb-0">
              Get your free instant estimate today and experience the difference of working with
              professionals who care.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <button class="btn btn-primary btn-lg w-100 w-lg-auto" @click="getQuote">
              <i class="fas fa-calculator me-2"></i> Get Free Estimate
            </button>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="row mt-5 g-4">
        <div class="col-md-4">
          <div class="contact-card">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <h5>Email Us</h5>
            <a href="mailto:Contact@liftshiftservices.com" class="contact-link">
              Contact@liftshiftservices.com
            </a>
          </div>
        </div>

        <div class="col-md-4">
          <div class="contact-card">
            <div class="contact-icon">
              <i class="fas fa-clock"></i>
            </div>
            <h5>Working Hours</h5>
            <p class="mb-0">24/7 Available Service</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="contact-card">
            <div class="contact-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <h5>Service Area</h5>
            <p class="mb-0">North Dallas & Surrounding Areas</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CTASection',
  methods: {
    getQuote() {
      this.$router.push('/demolition')
    },
  },
}
</script>

<style scoped>
.cta-section {
  background: linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-orange-dark) 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 500px;
  height: 500px;
  background: var(--white-10);
  border-radius: var(--radius-round);
}

.cta-section::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: var(--white-10);
  border-radius: var(--radius-round);
}

.cta-wrapper {
  background: var(--black-20);
  padding: 50px;
  border-radius: var(--radius-xl);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
}

.cta-subtitle {
  font-size: 1.2rem;
  color: var(--white-90);
  line-height: 1.6;
}

.btn-primary {
  background-color: var(--text-light) !important;
  border-color: var(--text-light) !important;
  color: var(--accent-orange) !important;
  font-weight: 700;
  padding: var(--gap-lg) 35px;
}

.btn-primary:hover {
  background-color: var(--bg-dark) !important;
  border-color: var(--bg-dark) !important;
  color: var(--text-light) !important;
}

.contact-card {
  background: var(--white-15);
  padding: 30px;
  border-radius: var(--radius-xl);
  text-align: center;
  backdrop-filter: blur(10px);
  border: 2px solid var(--white-20);
  transition: var(--transition-base);
  height: 100%;
  position: relative;
  z-index: 1;
}

.contact-card:hover {
  background: var(--white-25);
  transform: translateY(-5px);
  box-shadow: 0 15px 40px var(--black-30);
}

.contact-icon {
  width: 60px;
  height: 60px;
  background: var(--text-light);
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--gap-xl);
  font-size: 1.5rem;
  color: var(--accent-orange);
}

.contact-card h5 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: var(--gap-md);
}

.contact-card p {
  color: var(--white-90);
  margin: 0;
}

.contact-link {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition-base);
  display: inline-block;
}

.contact-link:hover {
  color: var(--bg-dark);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 991px) {
  .cta-wrapper {
    padding: 40px 30px;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .cta-wrapper {
    padding: 30px var(--gap-xl);
  }

  .cta-title {
    font-size: 1.8rem;
  }

  .contact-link {
    word-break: break-all;
    font-size: 0.9rem;
  }
}
</style>
