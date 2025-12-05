<template>
  <section class="page-hero">
    <div class="hero-background">
      <div class="hero-overlay"></div>
      <div class="animated-shapes">
        <div class="shape shape-1">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <div class="shape shape-2">
          <i class="fa-solid fa-truck-moving"></i>
        </div>
        <div class="shape shape-3">
          <i class="fa-solid fa-box"></i>
        </div>
        <div class="shape shape-4">
          <i class="fa-solid fa-warehouse"></i>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row align-items-center min-vh-80">
        <div :class="['col-lg-' + (imagePosition === 'right' ? '6' : '12'), 'hero-content']">
          <div class="hero-badge" v-if="badge">
            <i :class="badgeIcon" class="me-2"></i>{{ badge }}
          </div>
          <h1 class="hero-title fade-in-up">
            <span v-html="title"></span>
          </h1>
          <p class="hero-subtitle fade-in-up" v-html="subtitle"></p>
          <div class="hero-features fade-in-up my-2" v-if="features && features.length">
            <div class="feature-item" v-for="feature in features" :key="feature">
              <i class="fas fa-check-circle text-orange"></i>
              <span>{{ feature }}</span>
            </div>
          </div>
          <div class="hero-actions fade-in-up my-4">
            <button v-if="primaryButton" class="btn btn-primary btn-lg" @click="handlePrimaryClick">
              <i :class="primaryButton.icon" class="me-2" v-if="primaryButton.icon"></i>
              {{ primaryButton.text }}
            </button>
            <button
              v-if="secondaryButton"
              class="btn btn-outline-primary btn-lg"
              @click="handleSecondaryClick"
            >
              <i :class="secondaryButton.icon" class="me-2" v-if="secondaryButton.icon"></i>
              {{ secondaryButton.text }}
            </button>
          </div>
          <div class="hero-stats" v-if="stats && stats.length">
            <div class="stat-item mx-2 mt-2" v-for="stat in stats" :key="stat.label">
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 hero-image-wrapper" v-if="imagePosition === 'right' && image">
          <div class="hero-image">
            <img :src="image" :alt="imageAlt" class="img-fluid" />
            <div class="image-decoration"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator" v-if="showScrollIndicator" @click="scrollDown">
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SharedPageHero',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: '',
    },
    badgeIcon: {
      type: String,
      default: 'fas fa-star',
    },
    features: {
      type: Array,
      default: () => [],
    },
    primaryButton: {
      type: Object,
      default: null,
    },
    secondaryButton: {
      type: Object,
      default: null,
    },
    stats: {
      type: Array,
      default: () => [],
    },
    image: {
      type: String,
      default: '',
    },
    imageAlt: {
      type: String,
      default: 'Hero Image',
    },
    imagePosition: {
      type: String,
      default: 'none', // 'right', 'none'
    },
    showScrollIndicator: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handlePrimaryClick() {
      if (this.primaryButton?.scrollTo) {
        this.scrollToElement(this.primaryButton.scrollTo)
      }
      this.$emit('primary-click')
    },
    handleSecondaryClick() {
      if (this.secondaryButton?.scrollTo) {
        this.scrollToElement(this.secondaryButton.scrollTo)
      }
      this.$emit('secondary-click')
    },
    scrollDown() {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth',
      })
    },
    scrollToElement(selector) {
      const element = document.querySelector(selector)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
  },
}
</script>

<style scoped>
.page-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: var(--bg-dark);
  overflow: hidden;
}

.min-vh-80 {
  min-height: 80vh;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, var(--orange-10) 0%, transparent 60%);
  opacity: 0.5;
}

.animated-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shape {
  position: absolute;
  color: var(--accent-orange);
  opacity: 0.08;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 20s ease-in-out infinite;
}

.shape i {
  font-size: inherit;
}

.shape-1 {
  font-size: 15rem;
  top: -50px;
  right: 10%;
  animation-delay: 0s;
}

.shape-2 {
  font-size: 12rem;
  bottom: 10%;
  left: 5%;
  animation-delay: 5s;
}

.shape-3 {
  font-size: 10rem;
  top: 20%;
  left: 60%;
  animation-delay: 10s;
}

.shape-4 {
  font-size: 8rem;
  bottom: 30%;
  right: 5%;
  animation-delay: 15s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% {
    transform: translate(50px, -50px) rotate(15deg) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) rotate(-15deg) scale(0.9);
  }
}

.container {
  position: relative;
  z-index: 1;
}

.hero-content {
  padding: 60px 0;
}

.hero-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: var(--gap-xl);
  animation: slideInDown 0.8s ease;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--text-light);
  margin-bottom: var(--gap-xl);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-gray);
  margin-bottom: var(--gap-2xl);
  line-height: 1.6;
  max-width: 600px;
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--gap-lg);
  margin-bottom: var(--gap-2xl);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  color: var(--text-light);
  font-size: 1rem;
}

.feature-item i {
  font-size: 1.2rem;
}

.hero-actions {
  display: flex;
  gap: var(--gap-lg);
  flex-wrap: wrap;
  margin-bottom: var(--gap-2xl);
}

.hero-stats {
  display: flex;
  gap: var(--gap-2xl);
  padding-top: var(--gap-2xl);
  border-top: 1px solid var(--orange-10);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--accent-orange);
  line-height: 1;
  margin-bottom: var(--gap-sm);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-gray);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-image-wrapper {
  position: relative;
  padding: 40px 0;
}

.hero-image {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

.hero-image img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-2xl);
}

.image-decoration {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100%;
  height: 100%;
  border: 3px solid var(--accent-orange);
  border-radius: var(--radius-2xl);
  z-index: -1;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border: 2px solid var(--accent-orange);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-orange);
  cursor: pointer;
  animation: bounce 2s ease-in-out infinite;
  transition: all 0.3s ease;
  z-index: 2;
}

.scroll-indicator:hover {
  background: var(--accent-orange);
  color: white;
  transform: translateX(-50%) scale(1.1);
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.fade-in-up:nth-child(1) {
  animation-delay: 0.2s;
}
.fade-in-up:nth-child(2) {
  animation-delay: 0.4s;
}
.fade-in-up:nth-child(3) {
  animation-delay: 0.6s;
}
.fade-in-up:nth-child(4) {
  animation-delay: 0.8s;
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

@media (max-width: 991px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-stats {
    justify-content: space-around;
  }

  .hero-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .page-hero {
    min-height: 70vh;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .btn {
    width: 100%;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
