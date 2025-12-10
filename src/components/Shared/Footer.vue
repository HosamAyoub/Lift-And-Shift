<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="row g-4">
          <!-- Company Info -->
          <div class="col-lg-4 col-md-6">
            <div class="footer-widget">
              <div class="footer-logo mb-3">
                <img :src="logo" alt="Lift & Shift" />
                <!-- <span class="footer-brand">Lift & Shift</span> -->
              </div>
              <p class="footer-description">
                Move Today. Build Tomorrow. Professional moving, packing, and storage services with
                integrity and care.
              </p>
              <div class="social-links mt-4">
                <a href="#" class="social-link" aria-label="Facebook">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-link" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="social-link" aria-label="LinkedIn">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-lg-2 col-md-6">
            <div class="footer-widget">
              <h5 class="footer-title">Services</h5>
              <ul class="footer-links">
                <li>
                  <router-link to="/moving">
                    <i class="fas fa-chevron-right"></i> Moving
                  </router-link>
                </li>
                <li>
                  <router-link to="/storage">
                    <i class="fas fa-chevron-right"></i> Storage
                  </router-link>
                </li>
                <li>
                  <router-link to="/hauling">
                    <i class="fas fa-chevron-right"></i> Hauling
                  </router-link>
                </li>
                <li>
                  <router-link to="/demolition">
                    <i class="fas fa-chevron-right"></i> Demolition
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <!-- Company Links -->
          <div class="col-lg-2 col-md-6">
            <div class="footer-widget">
              <h5 class="footer-title">Company</h5>
              <ul class="footer-links">
                <li>
                  <router-link to="/aboutUs">
                    <i class="fas fa-chevron-right"></i> About Us
                  </router-link>
                </li>
                <li>
                  <router-link to="/careers">
                    <i class="fas fa-chevron-right"></i> Careers
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact">
                    <i class="fas fa-chevron-right"></i> Contact
                  </router-link>
                </li>
                <li>
                  <router-link to="/"> <i class="fas fa-chevron-right"></i> Home </router-link>
                </li>
              </ul>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="col-lg-4 col-md-6">
            <div class="footer-widget">
              <h5 class="footer-title">Contact Us</h5>
              <ul class="footer-contact">
                <li class="align-items-center">
                  <i class="fas fa-envelope"></i>
                  <a href="mailto:contact@liftshiftservices.com"> contact@liftshiftservices.com </a>
                </li>
                <li class="align-items-center">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>DFW & Surrounding Areas</span>
                </li>
                <li class="align-items-center">
                  <i class="fas fa-clock"></i>
                  <span>24/7 Available Service</span>
                </li>
                <li class="align-items-center">
                  <i class="fas fa-phone"></i>
                  <a href="tel:+1 (800) 889-9788">+1 (800) 889-9788</a>
                </li>
              </ul>
              <router-link to="/demolition" class="btn btn-primary mt-3 w-100">
                <i class="fas fa-calculator"></i> Get Free Estimate
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p class="mb-0">&copy; {{ currentYear }} Lift & Shift. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <ul class="footer-bottom-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  mounted() {
    this.setupScrollAnimation()
  },
  computed: {
    logo() {
      return '/assets/images/logo.png'
    },
    currentYear() {
      return new Date().getFullYear()
    },
  },
  methods: {
    setupScrollAnimation() {
      const footer = this.$el
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              footer.classList.add('footer-visible')
            }
          })
        },
        { threshold: 0.1 },
      )
      observer.observe(footer)
    },
  },
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--bg-dark) 100%);
  color: var(--text-light);
  padding-top: 60px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer.footer-visible {
  opacity: 1;
  transform: translateY(0);
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-orange), var(--accent-orange-light));
}

.footer-top {
  padding-bottom: 40px;
  border-bottom: 2px solid var(--white-10);
}

.footer-widget {
  height: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-visible .footer-widget {
  opacity: 1;
  transform: translateY(0);
}

.footer-visible .col-lg-4:nth-child(1) .footer-widget {
  transition-delay: 0.1s;
}
.footer-visible .col-lg-2:nth-child(2) .footer-widget,
.footer-visible .col-md-6:nth-child(2) .footer-widget {
  transition-delay: 0.2s;
}
.footer-visible .col-lg-2:nth-child(3) .footer-widget,
.footer-visible .col-md-6:nth-child(3) .footer-widget {
  transition-delay: 0.3s;
}
.footer-visible .col-lg-4:nth-child(4) .footer-widget,
.footer-visible .col-md-6:nth-child(4) .footer-widget {
  transition-delay: 0.4s;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
}

.footer-logo img {
  height: 50px;
  width: auto;
}

.footer-brand {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-light), var(--accent-orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: var(--text-gray);
  line-height: 1.8;
  margin-bottom: 0;
}

.social-links {
  display: flex;
  gap: var(--gap-md);
}

.social-link {
  width: 40px;
  height: 40px;
  background: var(--secondary-dark);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  transition: var(--transition-base);
  border: 2px solid transparent;
}

.social-link:hover {
  background: var(--accent-orange);
  color: var(--text-light);
  transform: translateY(-3px);
  border-color: var(--accent-orange);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 var(--orange-50);
  }
  50% {
    box-shadow: 0 0 0 10px var(--orange-0);
  }
}

.footer-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--gap-xl);
  color: var(--text-light);
  position: relative;
  padding-bottom: var(--gap-md);
}

.footer-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background: var(--accent-orange);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: var(--gap-md);
}

.footer-links a {
  color: var(--text-gray);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  transition: var(--transition-base);
}

.footer-links a:hover {
  color: var(--accent-orange);
  transform: translateX(5px);
}

.footer-links i {
  font-size: 0.7rem;
}

.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-contact li {
  display: flex;
  align-items: start;
  gap: var(--gap-md);
  margin-bottom: var(--gap-lg);
  color: var(--text-gray);
}

.footer-contact i {
  color: var(--accent-orange);
  margin-top: 3px;
  width: 20px;
}

.footer-contact a {
  color: var(--text-gray);
  text-decoration: none;
  transition: var(--transition-base);
}

.footer-contact a:hover {
  color: var(--accent-orange);
}

.footer-bottom {
  padding: 30px 0;
  margin-top: 30px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s,
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
}

.footer-visible .footer-bottom {
  opacity: 1;
  transform: translateY(0);
}

.footer-bottom p {
  color: var(--text-gray);
  margin: 0;
}

.footer-bottom-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: var(--gap-xl);
}

.footer-bottom-links li {
  display: inline-block;
}

.footer-bottom-links a {
  color: var(--text-gray);
  text-decoration: none;
  transition: var(--transition-base);
}

.footer-bottom-links a:hover {
  color: var(--accent-orange);
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding-top: 40px;
  }

  .footer-widget {
    margin-bottom: 30px;
  }

  .footer-bottom-links {
    flex-direction: column;
    gap: var(--gap-md);
  }

  .footer-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 991px) {
  .footer-bottom-links {
    justify-content: center;
    margin-top: var(--gap-lg);
  }
}
</style>
