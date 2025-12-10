<template>
  <section :class="['benefit-cards-section', sectionClass]">
    <div class="container">
      <div class="text-center mb-5" v-if="showHeader">
        <h2 class="section-title" v-html="title"></h2>
        <p class="section-subtitle" v-if="subtitle">{{ subtitle }}</p>
      </div>

      <div class="row g-4">
        <div
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          :class="['col-lg-' + columnSize, 'col-md-6']"
        >
          <div class="benefit-card scroll-reveal" :style="{ transitionDelay: `${index * 0.15}s` }">
            <div class="benefit-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="benefit-icon">
              <i :class="benefit.icon"></i>
            </div>
            <h4>{{ benefit.title }}</h4>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BenefitCards',
  mounted() {
    this.setupScrollAnimations()
  },
  props: {
    title: {
      type: String,
      default: 'Why Choose <span class="text-orange">Us?</span>',
    },
    subtitle: {
      type: String,
      default: '',
    },
    benefits: {
      type: Array,
      required: true,
    },
    columnSize: {
      type: Number,
      default: 3,
    },
    sectionClass: {
      type: String,
      default: 'section section-darker',
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    setupScrollAnimations() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      )

      const elements = this.$el.querySelectorAll('.scroll-reveal')
      elements.forEach((el) => observer.observe(el))
    },
  },
}
</script>

<style scoped>
.benefit-cards-section {
  background-color: var(--bg-dark);
  padding: var(--gap-4xl) 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 900px;
  margin: 0 auto;
}

.benefit-card {
  background: var(--secondary-dark);
  padding: 40px 30px;
  border-radius: var(--radius-xl);
  text-align: center;
  height: 100%;
  position: relative;
  transition: var(--transition-smooth);
  border: 2px solid transparent;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, var(--orange-10) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-orange);
  box-shadow: 0 15px 40px var(--orange-20);
}

.benefit-card:hover::before {
  opacity: 1;
}

.benefit-number {
  position: absolute;
  top: var(--gap-xl);
  right: var(--gap-xl);
  font-size: 3rem;
  font-weight: 800;
  color: var(--orange-20);
  line-height: 1;
  transition: var(--transition-base);
}

.benefit-card:hover .benefit-number {
  color: var(--orange-40);
  transform: scale(1.1);
}

.benefit-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--gap-xxl);
  font-size: 2rem;
  color: var(--text-light);
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  z-index: 1;
}

.benefit-card:hover .benefit-icon {
  transform: scale(1.15) rotate(360deg);
  animation: float 3s ease-in-out infinite;
}

.benefit-card h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: var(--gap-lg);
  color: var(--text-light);
  position: relative;
  z-index: 1;
}

.benefit-card p {
  color: var(--text-gray);
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .benefit-card {
    margin-bottom: var(--gap-xl);
  }
}
</style>
