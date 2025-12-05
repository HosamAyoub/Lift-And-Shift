<template>
  <div class="benefit-card text-center">
    <div class="benefit-icon mb-3">
      <i :class="icon"></i>
    </div>
    <h5 class="benefit-title mb-2">{{ title }}</h5>
    <p class="benefit-description mb-0">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'BenefitCard',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.benefit-card {
  padding: var(--gap-xl);
  transition: var(--transition-base);
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.benefit-icon {
  font-size: 2.5rem !important;
  color: var(--accent-orange) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 2rem;
  color: var(--text-light);
  transition: var(--transition-base);
}

.benefit-card:hover .benefit-icon {
  transform: scale(1.1) rotate(5deg);
}

.benefit-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-light);
}

.benefit-description {
  color: var(--text-gray);
  line-height: 1.6;
}
</style>
