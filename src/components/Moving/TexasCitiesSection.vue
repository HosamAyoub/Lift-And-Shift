<template>
  <section class="section section-light cities-section" ref="citiesSection">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-10 text-center">
          <h2 class="section-title mb-3 scroll-reveal" ref="title">
            <span class="text-orange">Dallas</span> Moving Services for Every Neighborhood
          </h2>
          <p class="section-subtitle text-gray scroll-reveal" ref="subtitle">
            Lift & Shift proudly serves Dallas and surrounding DFW communities, including:
          </p>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="cities-grid">
            <div
              v-for="(city, index) in texasCities"
              :key="index"
              class="city-item scroll-reveal"
              :style="{ transitionDelay: `${index * 0.03}s` }"
            >
              <i class="fas fa-check-circle city-icon"></i>
              <span class="city-name">{{ city }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TexasCitiesSection',
  mounted() {
    this.setupScrollAnimations()
  },
  data() {
    return {
      texasCities: [
        'Dallas',
        'Fort Worth',
        'Plano',
        'Frisco',
        'McKinney',
        'Allen',
        'Irving',
        'Garland',
        'Arlington',
        'Grand Prairie',
        'Mesquite',
        'Carrollton',
        'Richardson',
        'Lewisville',
        'Flower Mound',
        'Coppell',
        'Grapevine',
        'Southlake',
        'The Colony',
        'Prosper',
        'Celina',
        'Wylie',
        'Rowlett',
        'Forney',
        'Princeton',
        'Little Elm',
        'Anna',
        'Melissa',
        'Farmers Branch',
        'Addison',
        'Highland Park',
        'University Park',
        'DeSoto',
        'Cedar Hill',
        'Duncanville',
        'Lancaster',
        'Waxahachie',
        'Mansfield',
        'Midlothian',
        'Red Oak',
        'North Richland Hills',
        'Sunnyvale',
        'Sachse',
        'Murphy',
        'Seagoville',
        'Oak Cliff',
        'Bishop Arts District',
        'Uptown Dallas',
        'Lake Highlands',
        'Las Colinas',
      ],
    }
  },
  methods: {
    setupScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      }, observerOptions)

      // Observe all scroll-reveal elements
      const elements = this.$el.querySelectorAll('.scroll-reveal')
      elements.forEach((el) => observer.observe(el))
    },
  },
}
</script>

<style scoped>
.cities-section {
  padding: 80px 0 0 0 !important;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-dark);
  line-height: 1.3;
}

.section-subtitle {
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  padding: 2rem 0;
}

.city-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  transition: var(--transition-smooth);
  cursor: pointer;
}

.city-item:hover {
  transform: translateX(8px);
}

.city-item:hover .city-icon {
  transform: scale(1.2) rotate(360deg);
  color: var(--accent-orange-light);
}

.city-item:hover .city-name {
  color: var(--accent-orange);
}

.city-icon {
  color: var(--accent-orange);
  font-size: 1rem;
  flex-shrink: 0;
  transition:
    transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    color 0.3s ease;
}

.city-name {
  color: var(--text-dark);
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
  transition: color 0.3s ease;
}

/* Responsive Design */
@media (max-width: 1199px) {
  .cities-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .cities-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .city-name {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.75rem;
  }

  .cities-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .cities-section {
    padding: 60px 0;
  }
}
</style>
