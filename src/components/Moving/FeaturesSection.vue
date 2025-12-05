<template>
  <div class="features-section mt-5 pt-5" style="border-top: 1px solid var(--orange-10)">
    <h2 class="text-white text-center mb-4">What Makes Us Different</h2>
    <p class="text-center text-gray mb-5 lead">
      Professional moving services backed by experience, dedication, and customer satisfaction
    </p>
    <div class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="feature in features" :key="feature.title">
        <div class="feature-card text-center h-100">
          <div class="feature-icon mb-3">
            <i :class="feature.icon"></i>
          </div>
          <h5 class="text-white mb-2">{{ feature.title }}</h5>
          <p class="text-gray small mb-0">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      features: [
        {
          icon: 'fas fa-truck-loading',
          title: 'Heavy Lifting Expertise',
          description:
            'Specialized equipment and trained professionals for safely moving heavy furniture, appliances, and delicate items.',
        },
        {
          icon: 'fas fa-box-open',
          title: 'Professional Packing',
          description:
            'Expert packing services with quality materials to protect your valuables during transit and storage.',
        },
        {
          icon: 'fas fa-route',
          title: 'Door-to-Door Service',
          description:
            'Complete moving solution from pickup to delivery, handling every step of your relocation journey.',
        },
        {
          icon: 'fas fa-headset',
          title: '24/7 Support',
          description:
            'Round-the-clock customer support team ready to assist you before, during, and after your move.',
        },
        {
          icon: 'fas fa-hand-holding-usd',
          title: 'Flexible Payment Options',
          description:
            'Multiple payment methods accepted with customized payment plans to fit your budget.',
        },
        {
          icon: 'fas fa-medal',
          title: '10+ Years Experience',
          description:
            'Decade of proven excellence in residential and commercial moves across all distances.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.features-section {
  padding-top: 3rem;
}

.feature-card {
  padding: var(--gap-xl);
  background: var(--secondary-dark);
  border-radius: var(--radius-lg);
  border: 1px solid var(--orange-10);
  transition: var(--transition-base);
}

.feature-card:hover {
  border-color: var(--accent-orange);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px var(--orange-20);
}
.feature-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 2rem;
  color: var(--text-light);
  transition: var(--transition-base);
  box-shadow: 0 5px 15px rgba(255, 115, 0, 0.3);
}

.feature-card:hover .feature-icon {
  transform: scale(1.15);
  box-shadow: 0 8px 25px rgba(255, 115, 0, 0.5);
  transform: scale(1.1) rotate(5deg);
}

.feature-card h5 {
  font-size: 1.1rem;
  font-weight: 700;
}

.feature-card p {
  line-height: 1.6;
}
</style>
