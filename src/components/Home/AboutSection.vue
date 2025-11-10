<template>
  <section class="about-section section section-dark" id="about">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <div class="about-content">
            <h2 class="section-title mb-4">About <span class="text-orange">Lift & Shift</span></h2>
            <p class="lead mb-4">
              <strong class="text-orange">Move Today. Build Tomorrow.</strong>
            </p>
            <p class="mb-4">
              We're more than just a moving company. Lift & Shift is built on a mission to empower
              individuals by providing meaningful work opportunities while delivering exceptional
              service to our customers.
            </p>

            <div class="mission-statement mb-4">
              <h4 class="text-orange mb-3">Our Mission</h4>
              <p>
                Professional movers with clear communication. Responsible people who work thoroughly
                and leave you worry-free.
              </p>
            </div>

            <div class="row mt-4">
              <div class="col-6 mb-3">
                <div class="stat-box">
                  <h3 class="text-orange mb-0">24/7</h3>
                  <p class="mb-0">Available Service</p>
                </div>
              </div>
              <div class="col-6 mb-3">
                <div class="stat-box">
                  <h3 class="text-orange mb-0">100%</h3>
                  <p class="mb-0">Satisfaction</p>
                </div>
              </div>
            </div>

            <div class="about-buttons mt-4">
              <button class="btn btn-primary me-3" @click="goToAbout">Learn More About Us</button>
              <button class="btn btn-outline-primary" @click="goToCareers">Join Our Team</button>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="about-features">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-home"></i>
              </div>
              <div class="feature-content">
                <h4>Residential</h4>
                <p>Professional movers with clear communication for your home relocation needs.</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-building"></i>
              </div>
              <div class="feature-content">
                <h4>Commercial</h4>
                <p>Efficient office and business moving solutions with minimal downtime.</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div class="feature-content">
                <h4>Campus</h4>
                <p>Specialized student moving services for dormitories and campus housing.</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div class="feature-content">
                <h4>Integrity First</h4>
                <p>We choose integrity over short-term gain, ensuring trust and reliability.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  methods: {
    goToAbout() {
      this.$router.push('/about')
    },
    goToCareers() {
      this.$router.push('/careers')
    },
  },
}
</script>

<style scoped>
.about-section {
  background-color: var(--bg-dark);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -100px;
  width: 400px;
  height: 400px;
  /* background: radial-gradient(circle, var(--orange-10) 0%, transparent 70%); */
  border-radius: var(--radius-round);
  transform: translateY(-50%);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
}

.lead {
  font-size: 1.3rem;
  color: var(--text-light);
}

.mission-statement {
  background: var(--secondary-dark);
  padding: var(--gap-xxl);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--accent-orange);
}

.mission-statement h4 {
  font-size: 1.3rem;
  font-weight: 700;
}

.stat-box {
  text-align: center;
  padding: var(--gap-xl);
  background: var(--secondary-dark);
  border-radius: var(--radius-lg);
  transition: var(--transition-base);
}

.stat-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px var(--orange-20);
}

.stat-box h3 {
  font-size: 2.5rem;
  font-weight: 800;
}

.stat-box p {
  font-size: 0.9rem;
  color: var(--text-gray);
}

.about-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-lg);
}

.about-features {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xl);
}

.feature-item {
  display: flex;
  gap: var(--gap-xl);
  padding: var(--gap-xxl);
  background: var(--secondary-dark);
  border-radius: var(--radius-lg);
  transition: var(--transition-base);
  border: 2px solid transparent;
}

.feature-item:hover {
  border-color: var(--accent-orange);
  transform: translateX(10px);
  box-shadow: 0 10px 30px var(--black-30);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-light);
  flex-shrink: 0;
}

.feature-content h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--gap-sm);
  color: var(--text-light);
}

.feature-content p {
  margin: 0;
  color: var(--text-gray);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 991px) {
  .about-buttons {
    flex-direction: column;
  }

  .about-buttons .btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 2rem;
  }

  .lead {
    font-size: 1.1rem;
  }

  .stat-box h3 {
    font-size: 2rem;
  }
}
</style>
