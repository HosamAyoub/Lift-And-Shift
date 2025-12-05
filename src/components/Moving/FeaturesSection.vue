<template>
  <div class="features-section mt-5 pt-5" style="border-top: 1px solid var(--orange-10)">
    <h2 class="text-white mb-4">Why Choose <span class="text-orange">Us</span></h2>
    <div class="row g-4">
      <div class="col-md-6 col-lg-3" v-for="feature in features" :key="feature.title">
        <div class="text-center">
          <!-- <div class="feature-icon mb-3">
            <i :class="feature.icon"></i>
          </div> -->
          <div class="mb-3">
            <i :class="feature.icon" style="font-size: 2.5rem; color: var(--accent-orange)"></i>
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
          title: 'Professional Crew',
          description: 'Expert movers who treat your belongings with care and respect.',
        },
        {
          icon: 'fas fa-warehouse',
          title: 'Storage Units',
          description: 'Flexible storage units that grow with your needs, perfect for managing inventory.',
        },
        {
          icon: 'fas fa-dollar-sign',
          title: 'Flexible Payment Options',
          description: 'Multiple Payment Methods & Customized payment plans to fit your budget.',
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

/* .feature-card:hover {
  border-color: var(--accent-orange);
  transform: translateY(-5px);
} */

.features-section {
  padding-top: 3rem;
}

/* .feature-icon {
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
} */

/* .feature-icon:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 25px rgba(255, 115, 0, 0.5);
} */

h5 {
  font-size: 1.1rem;
  font-weight: 700;
}

p {
  line-height: 1.6;
}
</style>
