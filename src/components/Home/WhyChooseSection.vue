<template>
  <section class="why-choose-section section section-darker">
    <div class="container">
      <BenefitCards
        title="Why Choose <span class='text-orange'>Lift & Shift?</span>"
        subtitle="At Lift & Shift, we understand that moving isn't just transporting boxes . it's launching your next step. That's why our team combines efficiency, care, and a forward-looking attitude to make your transition smooth and stress-free."
        :benefits="coreBenefits"
        :columnSize="3"
        sectionClass=""
      />

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
import BenefitCards from '../Shared/BenefitCards.vue'

export default {
  name: 'WhyChooseSection',
  components: {
    BenefitCards,
  },
  data() {
    return {
      coreBenefits: [
        {
          icon: 'fas fa-hand-holding-usd',
          title: 'Living Wage',
          description:
            'We pay our team members a true living wage, ensuring dignity and respect for their hard work.',
        },
        {
          icon: 'fas fa-shield-alt',
          title: 'Integrity First',
          description:
            'We choose integrity over short-term gain, building lasting relationships with our clients.',
        },
        {
          icon: 'fas fa-dumbbell',
          title: 'Build Tomorrow',
          description:
            'Every shift builds a stronger body and a better future for our team members.',
        },
        {
          icon: 'fas fa-comments',
          title: 'Clear Communication',
          description:
            'Professional service with transparent communication throughout the entire process.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.why-choose-section {
  background-color: var(--bg-dark);
  /* background-color: var(--bg-section); */
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
