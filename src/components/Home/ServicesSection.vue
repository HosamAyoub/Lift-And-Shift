<template>
  <section class="services-section section section-darker" id="services">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">Our <span class="text-orange">Services</span></h2>
        <p class="section-subtitle">
          Professional moving, packing, and storage solutions for residential, commercial, and
          campus needs
        </p>
      </div>

      <div class="row g-4">
        <!-- Moving Service -->
        <div class="col-lg-4 col-md-6">
          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-truck-moving"></i>
            </div>
            <h3 class="service-title">Moving</h3>
            <p class="service-description">
              Professional moving services with transparent pricing. Photo documentation, secure
              pick-up & drop-off.
            </p>
            <ul class="service-features">
              <li><i class="fas fa-check-circle text-orange"></i> Simple Count</li>
              <li><i class="fas fa-check-circle text-orange"></i> Photo Documentation</li>
              <li><i class="fas fa-check-circle text-orange"></i> Secure Transport</li>
              <li><i class="fas fa-check-circle text-orange"></i> Starting at $125</li>
            </ul>
            <button class="btn btn-outline-primary w-100 mt-3" @click="goToMoving">
              Learn More
            </button>
          </div>
        </div>

        <!-- Packing Service -->
        <div class="col-lg-4 col-md-6">
          <div class="service-card featured">
            <div class="featured-badge">Most Popular</div>
            <div class="service-icon">
              <i class="fas fa-box-open"></i>
            </div>
            <h3 class="service-title">Packing</h3>
            <p class="service-description">
              Expert packing services with quality supplies. We handle your belongings with care.
            </p>
            <ul class="service-features">
              <li><i class="fas fa-check-circle text-orange"></i> Professional Team</li>
              <li><i class="fas fa-check-circle text-orange"></i> Quality Materials</li>
              <li><i class="fas fa-check-circle text-orange"></i> Careful Handling</li>
              <li><i class="fas fa-check-circle text-orange"></i> Flexible Scheduling</li>
            </ul>
            <button class="btn btn-primary w-100 mt-3" @click="goToMoving">Get Started</button>
          </div>
        </div>

        <!-- Storage Service -->
        <div class="col-lg-4 col-md-6">
          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-warehouse"></i>
            </div>
            <h3 class="service-title">Storage</h3>
            <p class="service-description">
              Secure storage solutions with free boxes & supplies. Flexible pricing with manpower
              options.
            </p>
            <ul class="service-features">
              <li><i class="fas fa-check-circle text-orange"></i> Free Boxes & Supplies</li>
              <li><i class="fas fa-check-circle text-orange"></i> Pick-up & Delivery</li>
              <li><i class="fas fa-check-circle text-orange"></i> Flexible Pricing</li>
              <li><i class="fas fa-check-circle text-orange"></i> 4 Months Minimum</li>
            </ul>
            <button class="btn btn-outline-primary w-100 mt-3" @click="goToStorage">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServicesSection',
  methods: {
    goToMoving() {
      this.$router.push('/moving')
    },
    goToStorage() {
      this.$router.push('/storage')
    },
  },
}
</script>

<style scoped>
.services-section {
  background-color: var(--bg-dark);
  /* background-color: var(--bg-section); */
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto;
}

.service-card {
  background: var(--secondary-dark);
  border-radius: var(--radius-xl);
  padding: 40px 30px;
  height: 100%;
  transition: var(--transition-base);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-orange), var(--accent-orange-light));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-orange);
  box-shadow: 0 15px 40px var(--orange-20);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card.featured {
  background: linear-gradient(135deg, var(--secondary-dark) 0%, var(--orange-10) 100%);
  border-color: var(--accent-orange);
}

.featured-badge {
  position: absolute;
  top: var(--gap-xl);
  right: var(--gap-xl);
  background: var(--accent-orange);
  color: var(--text-light);
  padding: 5px var(--gap-lg);
  border-radius: var(--radius-xxl);
  font-size: 0.85rem;
  font-weight: 600;
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--gap-xxl);
  font-size: 2rem;
  color: var(--text-light);
  transition: var(--transition-base);
}

.service-card:hover .service-icon {
  transform: rotateY(360deg);
}

.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--gap-lg);
  color: var(--text-light);
}

.service-description {
  color: var(--text-gray);
  margin-bottom: var(--gap-xl);
  line-height: 1.6;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--gap-xl) 0;
}

.service-features li {
  padding: var(--gap-sm) 0;
  color: var(--text-gray);
  display: flex;
  align-items: center;
  gap: var(--gap-md);
}

.service-features i {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .service-card {
    margin-bottom: var(--gap-xl);
  }
}
</style>
