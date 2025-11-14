<template>
  <div class="pricing-card card-dark h-100">
    <h5 class="text-orange mb-3">{{ title }}</h5>
    <p class="text-gray small mb-3">{{ description }}</p>

    <div class="mb-3">
      <p class="text-white fw-bold mb-2">Starting at</p>
      <p class="h4 text-orange mb-0">${{ price }}</p>
    </div>

    <ul class="list-unstyled text-gray small mb-4">
      <li v-for="(feature, index) in features" :key="index" class="mb-2">
        <i class="fas fa-check-circle text-orange me-2"></i>{{ feature }}
      </li>
    </ul>

    <button class="btn btn-outline-primary w-100" @click="$emit('select')">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'PricingCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: Array,
      required: true,
    },
    buttonText: {
      type: String,
      default: 'Choose this tier',
    },
  },
  emits: ['select'],
}
</script>

<style scoped>
.pricing-card {
  transition: var(--transition-base);
}

.pricing-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-orange);
}

.pricing-card h5 {
  font-weight: 700;
}

.pricing-card .h4 {
  font-weight: 800;
}
</style>
