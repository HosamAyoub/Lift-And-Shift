<template>
  <section class="section section-dark py-5">
    <div class="container-lg">
      <!-- Hero Section -->
      <div class="mb-2 pb-4">
        <h1 class="h2 text-white">About Us</h1>
        <!-- <p class="text-gray mb-0">
          Turning strength into opportunity for people building their futures.
        </p> -->
      </div>

      <!-- Main Content Section -->
      <div class="row g-4 align-items-stretch">
        <!-- Left Column: Our Story -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <h3 class="text-white mb-4">Our Story</h3>

            <div class="mb-4">
              <p class="text-gray">
                Lift & Shift was founded with a clear purpose: to deliver fast, efficient, and
                professional service without compromising care or integrity. From the beginning, our
                focus has been on creating a seamless experience for our customers, built on trust,
                clear communication, and consistent results.
              </p>

              <p class="text-gray">
                Based in the DFW area and serving clients everywhere, we combine speed and
                efficiency with attention to detail and respect for every space we enter. We believe
                great service starts with strong relationships, and by investing in our team and
                community, we are building a lasting brand designed to grow, serve, and create value
                for years to come.
              </p>
            </div>

            <!-- Mission Statement -->
            <div
              class="mb-4 p-4 rounded"
              style="background: var(--orange-10); border: 1px solid var(--orange-25)"
            >
              <h4 class="text-orange mb-3">Our Mission</h4>
              <p class="text-white mb-0">
                Our mission is to provide dependable moving and storage services grounded in
                personal connection, fair pricing, and clear communication. At Lift & Shift, we
                measure success by the trust we build with our clients and the care we provide
                before, during, and after every move.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Why Choose Us -->
        <div class="col-lg-6 d-flex flex-column">
          <div class="card-dark shadow-lg h-100">
            <h3 class="text-white mb-4">Why Choose Lift & Shift</h3>

            <!-- Values List -->
            <div class="values-list">
              <div class="value-item mb-4">
                <div class="value-icon">
                  <i class="fas fa-handshake text-orange"></i>
                </div>
                <div class="value-content">
                  <h5 class="text-white mb-2">People First</h5>
                  <p class="text-gray small mb-0">
                    We keep promises and communicate clearly. Relationships come before short term
                    wins.
                  </p>
                </div>
              </div>

              <div class="value-item mb-4">
                <div class="value-icon">
                  <i class="fas fa-tools text-orange"></i>
                </div>
                <div class="value-content">
                  <h5 class="text-white mb-2">Make It Right</h5>
                  <p class="text-gray small mb-0">
                    If something's off, we fix it. Doing right beats doing easy every time.
                  </p>
                </div>
              </div>

              <div class="value-item mb-4">
                <div class="value-icon">
                  <i class="fas fa-shield-alt text-orange"></i>
                </div>
                <div class="value-content">
                  <h5 class="text-white mb-2">Fully Insured & Professional</h5>
                  <p class="text-gray small mb-0">
                    Licensed, insured, and committed to safety and professionalism on every job.
                  </p>
                </div>
              </div>

              <div class="value-item mb-2">
                <div class="value-icon">
                  <i class="fas fa-dollar-sign text-orange"></i>
                </div>
                <div class="value-content">
                  <h5 class="text-white mb-2">Living Wage Commitment</h5>
                  <p class="text-gray small mb-0">
                    We believe work should cover real costs of living and reward effort. That's our
                    baseline, not our ceiling.
                  </p>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <!-- <div class="mt-4 pt-4" style="border-top: 1px solid var(--orange-25)">
              <div class="row text-center">
                <div class="col-4">
                  <div class="text-orange h4 mb-1">100+</div>
                  <div class="text-gray small">Jobs Completed</div>
                </div>
                <div class="col-4">
                  <div class="text-orange h4 mb-1">4.9/5</div>
                  <div class="text-gray small">Customer Rating</div>
                </div>
                <div class="col-4">
                  <div class="text-orange h4 mb-1">24/7</div>
                  <div class="text-gray small">Support</div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Services Overview Section -->
      <div class="mt-5 pt-5" style="border-top: 1px solid var(--orange-10); padding-top: 3rem">
        <h2 class="text-white mb-4 text-center">What <span class="text-orange">We</span> Do</h2>
        <div class="row g-4">
          <div class="col-md-4" v-for="service in services" :key="service.title">
            <div class="card-dark text-center h-100 p-4">
              <div class="mb-3">
                <i :class="service.icon" style="font-size: 2.5rem" class="text-orange"></i>
              </div>
              <h5 class="text-white mb-3">{{ service.title }}</h5>
              <!-- <p class="text-gray small">{{ service.description }}</p> -->
              <ul class="text-gray small text-start mt-3 list-style">
                <li v-for="feature in service.features" :key="feature" class="my-3">
                  <i class="fas fa-check-circle me-2 text-orange"></i>{{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-5 pt-5 text-center">
        <h3 class="text-white mb-3">Ready to Get Started?</h3>
        <p class="text-gray mb-4">Contact us today for a free, no-obligation quote</p>
        <div class="d-flex gap-3 justify-content-center px-5">
          <div>
            <QuoteDropdown />
          </div>
          <!-- <div>
            <router-link to="/" class="btn btn-outline-primary"> View Services </router-link>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import QuoteDropdown from '../Shared/QuoteDropdown.vue'

export default {
  name: 'AboutUs',
  components: {
    QuoteDropdown,
  },
  data() {
    return {
      services: [
        {
          icon: 'fas fa-truck-fast',
          title: 'Moving & Storage',
          description: 'Professional moving services with optional short-term storage.',
          features: [
            '2 movers + truck standard',
            'Local residential & office moves',
            'Month-to-month storage options',
          ],
        },
        {
          icon: 'fas fa-trash-alt',
          title: 'Hauling',
          description: 'Fast, efficient removal of unwanted items with transparent pricing.',
          features: [
            '1/4, 1/2, 3/4 & Full load options',
            'Same/next-day pickup available',
            'Furniture, appliances, construction debris',
          ],
        },
        {
          icon: 'fas fa-hammer',
          title: 'Demolition',
          description: 'Safe, controlled demolition with complete debris removal.',
          features: [
            'Sheds, decks, fences, interiors',
            'Debris haul-off included',
            'Fully insured and licensed',
          ],
        },
      ],
    }
  },
  methods: {
    // You can add methods here if needed for interactivity
  },
}
</script>

<style scoped>
.values-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.value-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.value-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--orange-10);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.value-content {
  flex: 1;
}

.service-areas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-area-tag {
  background: var(--primary-dark);
  border: 1px solid var(--orange-10);
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  color: var(--text-gray);
  font-size: 0.875rem;
  transition: var(--transition-base);
}

.service-area-tag:hover {
  background: var(--orange-10);
  border-color: var(--accent-orange);
  color: var(--text-light);
}

.card-dark {
  background: var(--primary-dark);
  border: 1px solid var(--orange-10);
  border-radius: 1rem;
  padding: 2rem;
  transition: var(--transition-base);
}

.card-dark:hover {
  border-color: var(--accent-orange);
  box-shadow: var(--shadow-md);
}

.text-orange {
  color: var(--accent-orange) !important;
}

.text-gray {
  color: var(--text-gray) !important;
}

.text-white {
  color: var(--text-light) !important;
}

.btn-primary {
  background: var(--accent-orange);
  border: 1px solid var(--accent-orange);
  color: var(--text-light);
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  transition: var(--transition-base);
}

.btn-primary:hover {
  background: var(--accent-orange-dark);
  border-color: var(--accent-orange-dark);
  transform: translateY(-2px);
}

.btn-outline-primary {
  background: transparent;
  border: 1px solid var(--accent-orange);
  color: var(--accent-orange);
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  transition: var(--transition-base);
}

.btn-outline-primary:hover {
  background: var(--accent-orange);
  color: var(--text-light);
  transform: translateY(-2px);
}

.list-style {
  list-style: none;
}

@media (max-width: 768px) {
  .value-item {
    flex-direction: column;
    text-align: center;
  }

  .service-areas {
    justify-content: center;
  }

  .d-flex.gap-3 {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-outline-primary {
    width: 100%;
    max-width: 300px;
  }
}
</style>
