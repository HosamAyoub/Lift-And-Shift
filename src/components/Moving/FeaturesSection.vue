<template>
  <div class="features-section mt-5 pt-5" style="border-top: 1px solid var(--orange-10)">
    <h2 class="text-white text-center mb-4">Why Choose Our Moving Services</h2>
    <div class="row g-4">
      <div class="col-md-6 col-lg-3" v-for="feature in features" :key="feature.title">
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
          icon: 'fas fa-shield-alt',
          title: 'Licensed & Insured',
          description: 'Fully licensed and insured for your peace of mind and protection.',
        },
        {
          icon: 'fas fa-users',
          title: 'Professional Team',
          description: 'Experienced movers who handle your belongings with care.',
        },
        {
          icon: 'fas fa-dollar-sign',
          title: 'Transparent Pricing',
          description: 'No hidden fees. Get an accurate quote before we start.',
        },
        {
          icon: 'fas fa-clock',
          title: 'On-Time Service',
          description: 'We value your time and always arrive as scheduled.',
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
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: var(--font-4xl);
  color: var(--text-light);
  transition: var(--transition-base);
}

.feature-card:hover .feature-icon {
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
