<template>
  <section class="hero-section">
    <div class="container">
      <div class="row align-items-center min-vh-100">
        <div class="col-lg-6 hero-content">
          <h1 class="hero-title mb-4 fade-in-up">
            Move Today.
            <p class="text-orange">Build Tomorrow.</p>
          </h1>
          <h4>Residential • Commercial • Campuses</h4>
          <p class="hero-subtitle my-4">
            A fast, reliable moving and logistics company based in DFW. We get you settled today, so
            you can start building your next chapter tomorrow.
          </p>
          <div class="hero-buttons">
            <button class="btn btn-primary btn-lg me-3" @click="getQuote">Get A Quote</button>
            <a class="btn btn-outline-primary btn-lg" href="tel:+18008899788">Get Contact</a>
          </div>
        </div>
        <div class="col-lg-6 hero-image-wrapper">
          <div class="hero-image">
            <img
              src="../../../public/assets/images/HeroPhoto.jpg"
              alt="Lift & Shift Services"
              class="img-fluid"
            />
            <!-- <div class="hero-badge">
              <div class="badge-content">
                <span class="badge-number">24/7</span>
                <span class="badge-text">Available</span>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    getQuote() {
      this.$router.push('/demo')
    },
    learnMore() {
      // Scroll to about section
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>

<style scoped>
.hero-section {
  /* background: linear-gradient(135deg, var(--bg-dark) 0%, var(--secondary-dark) 100%); */
  background-color: var(--bg-dark);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: radial-gradient(circle at 20% 50%, var(--orange-10) 0%, transparent 50%); */
  pointer-events: none;
}

.hero-content {
  z-index: 2;
  position: relative;
  padding: 40px 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-gray);
  line-height: 1.8;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-gray);
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-lg);
}

.hero-image-wrapper {
  position: relative;
  z-index: 1;
}

.hero-image {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.hero-image img {
  border-radius: var(--radius-xl);
  width: 100%;
  height: auto;
}

.hero-badge {
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: var(--accent-orange);
  padding: var(--gap-xl);
  border-radius: var(--radius-xl);
  box-shadow: 0 10px 30px var(--orange-40);
  animation: pulse 2s ease-in-out infinite;
}

.badge-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.badge-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-light);
  line-height: 1;
}

.badge-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-light);
  text-transform: uppercase;
}

/* Responsive Design */
@media (max-width: 991px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-image-wrapper {
    margin-top: 40px;
  }

  .hero-badge {
    bottom: var(--gap-xl);
    right: var(--gap-xl);
    padding: var(--gap-lg);
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-buttons .btn {
    width: 100%;
  }
}
</style>
