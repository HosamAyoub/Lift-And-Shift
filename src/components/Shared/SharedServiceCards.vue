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
            <!-- Moving truck wheel decoration -->
            <div class="truck-decoration">
              <div class="truck-wheel wheel-1"></div>
              <div class="truck-wheel wheel-2"></div>
              <div class="truck-path"></div>
            </div>

            <!-- Icon with box/truck theme -->
            <div class="service-icon-wrapper">
              <div class="icon-box">
                <div class="box-tape"></div>
                <div class="box-corner top-left"></div>
                <div class="box-corner top-right"></div>
                <div class="box-corner bottom-left"></div>
                <div class="box-corner bottom-right"></div>
              </div>
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
            </div>

            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>

            <!-- Call to action badge -->
            <div class="cta-badge">
              <span>Get Quote</span>
              <i class="fas fa-chevron-right"></i>
            </div>
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
  padding: 50px 35px 45px;
  height: 100%;
  position: relative;
  cursor: pointer;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  background: linear-gradient(180deg, var(--secondary-dark) 0%, var(--primary-dark) 100%);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
  border: 2px solid var(--orange-10);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-orange), #ff9940, var(--accent-orange));
  background-size: 200% 100%;
  animation: borderSlide 3s linear infinite;
  opacity: 0;
  transition: opacity 0.4s ease;
}

@keyframes borderSlide {
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Truck wheel decoration */
.truck-decoration {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 2px;
  opacity: 0.3;
  transition: all 0.4s ease;
}

.truck-path {
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--orange-10) 0px,
    var(--orange-10) 8px,
    transparent 8px,
    transparent 16px
  );
}

.truck-wheel {
  position: absolute;
  bottom: -6px;
  width: 16px;
  height: 16px;
  border: 3px solid var(--orange-10);
  border-radius: 50%;
  background: var(--primary-dark);
  transition: all 0.4s ease;
}

.wheel-1 {
  left: 25%;
}

.wheel-2 {
  right: 25%;
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
  border-color: var(--accent-orange);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.4),
    0 0 30px var(--orange-20);
}

.service-card:hover::before {
  opacity: 1;
}

.service-card:hover .truck-decoration {
  opacity: 0.8;
}

.service-card:hover .truck-wheel {
  border-color: var(--accent-orange);
  animation: wheelRotate 1s linear infinite;
  box-shadow: 0 0 10px var(--orange-20);
}

@keyframes wheelRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Icon box styling */
.service-icon-wrapper {
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.icon-box {
  width: 110px;
  height: 110px;
  position: relative;
  margin: 0 auto 0;
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: 12px;
  transition: all 0.4s ease;
  transform-style: preserve-3d;
}

.box-tape {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 20px;
  transform: translateY(-50%);
  background: repeating-linear-gradient(
    90deg,
    var(--orange-20),
    var(--orange-20) 8px,
    var(--orange-10) 8px,
    var(--orange-10) 16px
  );
  opacity: 0.5;
  transition: all 0.4s ease;
}

.box-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--orange-10);
  transition: all 0.4s ease;
}

.box-corner.top-left {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 12px;
}

.box-corner.top-right {
  top: -2px;
  right: -2px;
  border-left: none;
  border-bottom: none;
  border-top-right-radius: 12px;
}

.box-corner.bottom-left {
  bottom: -2px;
  left: -2px;
  border-right: none;
  border-top: none;
  border-bottom-left-radius: 12px;
}

.box-corner.bottom-right {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 12px;
}

.service-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: var(--accent-orange);
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  filter: drop-shadow(0 4px 12px var(--orange-20));
}

.service-card:hover .icon-box {
  border-color: var(--accent-orange);
  transform: rotateY(15deg) rotateX(5deg);
  box-shadow:
    -5px 10px 20px rgba(0, 0, 0, 0.3),
    0 0 20px var(--orange-20);
}

.service-card:hover .box-tape {
  opacity: 0.8;
  background: repeating-linear-gradient(
    90deg,
    var(--accent-orange),
    var(--accent-orange) 8px,
    var(--orange-20) 8px,
    var(--orange-20) 16px
  );
}

.service-card:hover .box-corner {
  border-color: var(--accent-orange);
  width: 25px;
  height: 25px;
}

.service-card:hover .service-icon {
  transform: translate(-50%, -50%) scale(1.2) rotateZ(5deg);
  color: #ff9940;
  filter: drop-shadow(0 8px 20px var(--accent-orange));
}

.service-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: all 0.3s ease;
  position: relative;
}

.service-description {
  color: var(--text-gray);
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.service-card:hover .service-description {
  color: rgba(255, 255, 255, 0.95);
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: var(--orange-10);
  border: 2px solid var(--orange-10);
  border-radius: 25px;
  color: var(--accent-orange);
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  margin-top: auto;
}

.cta-badge i {
  transition: transform 0.3s ease;
  font-size: 0.75rem;
}

.service-card:hover .cta-badge {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
  color: var(--bg-dark);
  transform: scale(1.05);
  box-shadow: 0 5px 20px var(--accent-orange);
}

.service-card:hover .cta-badge i {
  transform: translateX(4px);
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
