<template>
  <section class="why-choose-section section section-darker">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">Why Choose <span class="text-orange">Lift & Shift?</span></h2>
        <p class="section-subtitle">
          We're committed to providing exceptional service while empowering our team members
        </p>
      </div>

      <div class="row g-4">
        <div class="col-lg-3 col-md-6">
          <div class="benefit-card">
            <div class="benefit-number">01</div>
            <div class="benefit-icon">
              <i class="fas fa-hand-holding-usd"></i>
            </div>
            <h4>Living Wage</h4>
            <p>
              We pay our team members a true living wage, ensuring dignity and respect for their
              hard work.
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="benefit-card">
            <div class="benefit-number">02</div>
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Integrity First</h4>
            <p>
              We choose integrity over short-term gain, building lasting relationships with our
              clients.
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="benefit-card">
            <div class="benefit-number">03</div>
            <div class="benefit-icon">
              <i class="fas fa-dumbbell"></i>
            </div>
            <h4>Build Tomorrow</h4>
            <p>Every shift builds a stronger body and a better future for our team members.</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="benefit-card">
            <div class="benefit-number">04</div>
            <div class="benefit-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h4>Clear Communication</h4>
            <p>
              Professional service with transparent communication throughout the entire process.
            </p>
          </div>
        </div>
      </div>

      <!-- Additional Benefits -->
      <div class="row mt-5 g-4">
        <div class="col-md-6">
          <div class="feature-box">
            <div class="feature-box-icon">
              <i class="fas fa-camera"></i>
            </div>
            <div class="feature-box-content">
              <h5>Photo Documentation</h5>
              <p>We document your belongings with photos for transparency and peace of mind.</p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="feature-box">
            <div class="feature-box-icon">
              <i class="fas fa-truck"></i>
            </div>
            <div class="feature-box-content">
              <h5>Professional Equipment</h5>
              <p>Modern trucks and equipment to handle your move safely and efficiently.</p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="feature-box">
            <div class="feature-box-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="feature-box-content">
              <h5>Flexible Scheduling</h5>
              <p>24/7 availability to accommodate your schedule and urgent moving needs.</p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="feature-box">
            <div class="feature-box-icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="feature-box-content">
              <h5>Transparent Pricing</h5>
              <p>No hidden fees. Clear, upfront pricing with free estimates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WhyChooseSection',
}
</script>

<style scoped>
.why-choose-section {
  background-color: var(--bg-section);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto;
}

.benefit-card {
  background: var(--secondary-dark);
  padding: 40px 30px;
  border-radius: var(--radius-xl);
  text-align: center;
  height: 100%;
  position: relative;
  transition: var(--transition-base);
  border: 2px solid transparent;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, var(--orange-10) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-orange);
  box-shadow: 0 15px 40px var(--orange-20);
}

.benefit-card:hover::before {
  opacity: 1;
}

.benefit-number {
  position: absolute;
  top: var(--gap-xl);
  right: var(--gap-xl);
  font-size: 3rem;
  font-weight: 800;
  color: var(--orange-20);
  line-height: 1;
  transition: var(--transition-base);
}

.benefit-card:hover .benefit-number {
  color: var(--orange-40);
  transform: scale(1.1);
}

.benefit-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--gap-xxl);
  font-size: 2rem;
  color: var(--text-light);
  transition: var(--transition-base);
  position: relative;
  z-index: 1;
}

.benefit-card:hover .benefit-icon {
  transform: scale(1.1) rotate(5deg);
}

.benefit-card h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: var(--gap-lg);
  color: var(--text-light);
  position: relative;
  z-index: 1;
}

.benefit-card p {
  color: var(--text-gray);
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 1;
}

.feature-box {
  background: var(--secondary-dark);
  padding: 30px;
  border-radius: var(--radius-xl);
  display: flex;
  gap: var(--gap-xl);
  align-items: center;
  transition: var(--transition-base);
  border: 2px solid transparent;
  height: 100%;
}

.feature-box:hover {
  border-color: var(--accent-orange);
  transform: translateX(10px);
  box-shadow: 0 10px 30px var(--black-30);
}

.feature-box-icon {
  width: 60px;
  height: 60px;
  background: var(--accent-orange);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-light);
  flex-shrink: 0;
  transition: var(--transition-base);
}

.feature-box:hover .feature-box-icon {
  transform: scale(1.1);
}

.feature-box-content h5 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--gap-sm);
  color: var(--text-light);
}

.feature-box-content p {
  margin: 0;
  color: var(--text-gray);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .benefit-card {
    margin-bottom: var(--gap-xl);
  }

  .feature-box {
    flex-direction: column;
    text-align: center;
  }
}
</style>
