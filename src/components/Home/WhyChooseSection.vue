<template>
  <section class="why-choose-section section section-darker">
    <div class="container">
      <FeatureCards
        title="Why Choose <span class='text-orange'>Lift & Shift?</span>"
        subtitle="At Lift & Shift, we understand that moving isn't just transporting boxes. It's launching your next step. That's why our team combines efficiency, attention to detail, and professionalism to ensure every move is handled with care."
        :features="coreBenefits"
        :columnSize="3"
        sectionClass=""
        :showHeader="true"
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
              <p>
                We document your belongings with detailed photos before and during the move,
                creating transparency, accountability, and added peace of mind throughout the entire
                process.
              </p>
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
              <p>
                We invest in modern trucks and professional moving equipment to ensure secure
                transport, controlled handling, and a smoother moving experience for our clients .
              </p>
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
              <p>
                Our services are available Monday through Saturday from 8:00 AM to 6:00 PM,
                providing consistent, dependable scheduling designed to accommodate all of our
                clients moving needs.
              </p>
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
              <p>
                Packing - Upfront, clearly explained pricing with no hidden fees, supported by
                detailed estimates so you know exactly what to expect before your move begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FeatureCards from '../Shared/FeatureCards.vue'

export default {
  name: 'WhyChooseSection',
  components: {
    FeatureCards,
  },
  data() {
    return {
      coreBenefits: [
        {
          icon: 'fas fa-hand-holding-usd',
          title: 'Fair Pricing',
          description:
            'You receive clear upfront pricing with no hidden fees so you can plan your move with confidence.',
        },
        {
          icon: 'fas fa-shield-alt',
          title: 'Integrity You Can Trust',
          description:
            'We put your trust first by doing the right thing and delivering dependable service every time.',
        },
        {
          icon: 'fas fa-dumbbell',
          title: 'Built for Peace of Mind',
          description:
            'Your move is handled with care efficiency and professionalism to ensure a smooth stress free experience.',
        },
        {
          icon: 'fas fa-comments',
          title: 'Clear Communication',
          description:
            'From booking to completion you are always informed and know exactly what to expect.',
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
