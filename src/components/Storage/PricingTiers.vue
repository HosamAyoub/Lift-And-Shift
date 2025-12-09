<template>
  <section :class="['pricing-tiers-section', sectionClass]">
    <div class="container">
      <div class="text-center mb-5" v-if="showHeader">
        <h2 class="section-title" v-html="title"></h2>
        <p class="section-subtitle" v-if="subtitle">{{ subtitle }}</p>
      </div>

      <div class="row g-4 justify-content-center">
        <div
          v-for="(tier, index) in tiers"
          :key="tier.title"
          :class="['col-lg-' + columnSize, 'col-md-6']"
        >
          <div
            class="pricing-card"
            :class="{ featured: tier.featured }"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="handleSelect(tier)"
          >
            <!-- Featured Badge -->
            <div v-if="tier.featured" class="featured-badge">
              <i class="fas fa-star"></i>
              <span>Most Popular</span>
            </div>

            <!-- Storage Icon -->
            <div class="tier-icon">
              <i :class="tier.icon"></i>
            </div>

            <!-- Tier Name -->
            <h3 class="tier-name">{{ tier.title }}</h3>

            <!-- Price -->
            <div class="tier-price">
              <span class="currency">$</span>
              <span class="amount">{{ tier.price }}</span>
              <span class="period">/month</span>
            </div>

            <!-- Size Info -->
            <div class="tier-size">
              <i class="fas fa-cube"></i>
              {{ tier.size }}
            </div>

            <!-- Description -->
            <p class="tier-description">{{ tier.description }}</p>

            <!-- Features List -->
            <ul class="tier-features">
              <li v-for="feature in tier.features" :key="feature">
                <i class="fas fa-check-circle"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA Button -->
            <button class="tier-cta" @click.stop="handleSelect(tier)">
              <span>Reserve Now</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PricingTiers',
  props: {
    title: {
      type: String,
      default: 'Storage <span class="text-orange">Pricing</span>',
    },
    subtitle: {
      type: String,
      default: '',
    },
    tiers: {
      type: Array,
      required: true,
    },
    columnSize: {
      type: Number,
      default: 4,
    },
    sectionClass: {
      type: String,
      default: 'section section-dark',
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleSelect(tier) {
      this.$emit('tier-select', tier)
    },
  },
}
</script>

<style scoped>
.pricing-tiers-section {
  padding: var(--gap-4xl) 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto;
}

.pricing-card {
  background: var(--secondary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-xl);
  padding: 40px 30px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  overflow: hidden;
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

.pricing-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, var(--orange-10));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.pricing-card:hover::before {
  opacity: 1;
}

.pricing-card:hover {
  transform: translateY(-15px) scale(1.02);
  border-color: var(--accent-orange);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px var(--orange-20);
}

.pricing-card.featured {
  border-color: var(--accent-orange);
  box-shadow: 0 10px 40px var(--orange-20);
}

.pricing-card.featured::before {
  opacity: 0.3;
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: -35px;
  background: linear-gradient(135deg, var(--accent-orange), #ff9940);
  color: var(--bg-dark);
  padding: 8px 45px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transform: rotate(45deg);
  box-shadow: 0 4px 15px rgba(255, 115, 0, 0.4);
  z-index: 2;
}

.featured-badge i {
  margin-right: 5px;
}

.tier-icon {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, var(--orange-10), var(--orange-20));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  color: var(--accent-orange);
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;
}

.pricing-card:hover .tier-icon {
  transform: scale(1.1) rotate(10deg);
  background: linear-gradient(135deg, var(--accent-orange), #ff9940);
  color: var(--bg-dark);
  box-shadow: 0 10px 30px var(--accent-orange);
}

.tier-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-light);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.tier-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.currency {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-orange);
  margin-right: 5px;
}

.amount {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--text-light);
  line-height: 1;
}

.period {
  font-size: 1rem;
  color: var(--text-gray);
  margin-left: 5px;
}

.tier-size {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--orange-10);
  color: var(--accent-orange);
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.pricing-card:hover .tier-size {
  background: var(--accent-orange);
  color: var(--bg-dark);
}

.tier-description {
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  min-height: 48px;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}

.tier-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: var(--text-gray);
  font-size: 0.95rem;
  border-bottom: 1px solid var(--orange-10);
  transition: all 0.3s ease;
}

.tier-features li:last-child {
  border-bottom: none;
}

.tier-features li i {
  color: var(--accent-orange);
  font-size: 1rem;
  flex-shrink: 0;
}

.pricing-card:hover .tier-features li {
  color: var(--text-light);
}

.tier-cta {
  width: 100%;
  padding: 15px 30px;
  background: var(--orange-10);
  border: 2px solid var(--orange-10);
  border-radius: 30px;
  color: var(--accent-orange);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  z-index: 1;
  margin-top: auto;
}

.tier-cta i {
  transition: transform 0.3s ease;
}

.pricing-card:hover .tier-cta,
.pricing-card.featured .tier-cta {
  background: var(--accent-orange);
  border-color: var(--accent-orange);
  color: var(--bg-dark);
  transform: scale(1.05);
  box-shadow: 0 5px 25px var(--accent-orange);
}

.pricing-card:hover .tier-cta i {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .tier-name {
    font-size: 1.5rem;
  }

  .amount {
    font-size: 2.5rem;
  }
}
</style>
