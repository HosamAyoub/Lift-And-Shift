<template>
  <div class="info-card">
    <div class="info-card-header">
      <h3 class="info-card-title">{{ title }}</h3>
      <div class="title-underline"></div>
    </div>
    <p class="info-card-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
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
.info-card {
  /* background: var(--secondary-dark); */
  /* border: 2px solid var(--orange-10); */
  border-radius: var(--radius-xl);
  padding: 2rem;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-orange), var(--accent-orange-light));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-card-header {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-card-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-light);
  margin-bottom: 0.75rem;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.info-card:hover .info-card-title {
  color: var(--accent-orange);
}

.title-underline {
  width: 60px;
  height: 3px;
  background: var(--accent-orange);
  border-radius: 2px;
  transition: width 0.4s ease;
  margin: 0 auto;
}

.info-card:hover .title-underline {
  width: 100px;
}

.info-card-description {
  color: var(--text-gray);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
  text-align: center;
}

@media (max-width: 768px) {
  .info-card {
    padding: 1.5rem;
  }

  .info-card-title {
    font-size: 1.25rem;
  }

  .info-card-description {
    font-size: 0.95rem;
  }
}
</style>
