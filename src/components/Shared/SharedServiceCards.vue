<template>
  <section :class="['service-cards-section', sectionClass]">
    <div class="container">
      <div class="text-center mb-5" v-if="showHeader">
        <h2 class="section-title" v-html="title"></h2>
        <p class="section-subtitle" v-if="subtitle">{{ subtitle }}</p>
      </div>

      <div class="row g-4">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          :class="['col-lg-' + columnSize, 'col-md-6']"
        >
          <div
            class="service-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="handleClick(service)"
          >
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SharedServiceCards',
  props: {
    title: {
      type: String,
      default: 'Our <span class="text-orange">Services</span>',
    },
    subtitle: {
      type: String,
      default: '',
    },
    services: {
      type: Array,
      required: true,
    },
    columnSize: {
      type: Number,
      default: 4,
    },
    sectionClass: {
      type: String,
      default: 'section section-darker',
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    featuredText: {
      type: String,
      default: 'Most Popular',
    },
  },
  methods: {
    handleClick(service) {
      if (service.route) {
        this.$router.push(service.route)
      }
      this.$emit('service-click', service)
    },
  },
}
</script>

<style scoped>
.service-cards-section {
  background-color: var(--bg-dark);
  padding: var(--gap-4xl) 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-light);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto;
}

.service-card {
  text-align: center;
  padding: 40px 30px;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card:hover {
  transform: translateY(-10px);
}

.service-icon-wrapper {
  margin-bottom: 2rem;
}

.service-icon {
  width: 100px;
  height: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--accent-orange);
  transition: all 0.4s ease;
  position: relative;
}

.service-icon i {
  position: relative;
  z-index: 1;
}

.service-card:hover .service-icon {
  transform: rotateY(360deg);
}

.service-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.service-description {
  color: var(--text-gray);
  line-height: 1.7;
  font-size: 1rem;
  max-width: 90%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .service-card {
    margin-bottom: var(--gap-xl);
  }
}
</style>
