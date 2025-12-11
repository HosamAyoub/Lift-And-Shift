<template>
  <section class="thank-you-section">
    <!-- Animated Background -->
    <div class="thank-you-background">
      <div class="animated-shapes">
        <div class="shape shape-1">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="shape shape-2">
          <i class="fas fa-thumbs-up"></i>
        </div>
        <div class="shape shape-3">
          <i class="fas fa-star"></i>
        </div>
        <div class="shape shape-4">
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Success Card -->
          <div class="thank-you-card scroll-reveal animate-fadeInUp">
            <!-- Success Icon -->
            <div class="success-icon-wrapper">
              <div class="success-icon">
                <i class="fas fa-check"></i>
              </div>
              <div class="success-circle"></div>
            </div>

            <!-- Thank You Message -->
            <h1 class="thank-you-title">Thank You!</h1>
            <p class="thank-you-subtitle">
              Your request has been successfully submitted. We appreciate your business!
            </p>

            <!-- Order Details -->
            <div class="order-details">
              <div class="detail-item">
                <div class="detail-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="detail-content">
                  <div class="detail-label">Confirmation Email</div>
                  <div class="detail-value">Sent to your email address</div>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="detail-content">
                  <div class="detail-label">Response Time</div>
                  <div class="detail-value">Within 24 hours</div>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="detail-content">
                  <div class="detail-label">Need Help?</div>
                  <div class="detail-value">Call us at (800) 889-9788</div>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div class="next-steps">
              <h3>What Happens Next?</h3>
              <div class="steps-grid">
                <div class="step-item">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>Confirmation Email</h4>
                    <p>You'll receive an email confirmation with your request details.</p>
                  </div>
                </div>

                <div class="step-item">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>Team Review</h4>
                    <p>Our team will review your request and prepare a customized quote.</p>
                  </div>
                </div>

                <div class="step-item">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>Contact You</h4>
                    <p>We'll reach out within 24 hours to discuss details and schedule.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              <router-link to="/" class="btn btn-primary btn-lg">
                <i class="fas fa-home me-2"></i>Back to Home
              </router-link>
              <a href="tel:+18008899788" class="btn btn-outline-primary btn-lg">
                <i class="fas fa-phone me-2"></i>Call Us Now
              </a>
            </div>
          </div>

          <!-- Additional Info -->
          <div class="additional-info scroll-reveal animate-fadeInUp animate-delay-200">
            <div class="row g-4">
              <div class="col-md-4">
                <div class="info-card">
                  <div class="info-icon">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <h4>Licensed & Insured</h4>
                  <p>Fully licensed, bonded, and insured for your protection</p>
                </div>
              </div>

              <div class="col-md-4">
                <div class="info-card">
                  <div class="info-icon">
                    <i class="fas fa-award"></i>
                  </div>
                  <h4>Quality Service</h4>
                  <p>15+ years of excellent service in the DFW area</p>
                </div>
              </div>

              <div class="col-md-4">
                <div class="info-card">
                  <div class="info-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <h4>Expert Team</h4>
                  <p>Professional and experienced moving specialists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ThankYou',
  mounted() {
    // Trigger confetti or celebration animation if needed
    this.initializeAnimations()
  },
  methods: {
    initializeAnimations() {
      // Animation is handled by global scroll-reveal classes
      // Additional custom animations can be added here
    },
  },
}
</script>

<style scoped>
.thank-you-section {
  min-height: 80vh;
  background: var(--bg-dark);
  padding: 100px 0 80px;
  position: relative;
  overflow: hidden;
}

.thank-you-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.animated-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  color: var(--accent-orange);
  opacity: 0.05;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 25s ease-in-out infinite;
}

.shape i {
  font-size: inherit;
}

.shape-1 {
  font-size: 12rem;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.shape-2 {
  font-size: 10rem;
  bottom: 15%;
  left: 5%;
  animation-delay: 7s;
}

.shape-3 {
  font-size: 8rem;
  top: 40%;
  left: 15%;
  animation-delay: 14s;
}

.shape-4 {
  font-size: 9rem;
  bottom: 25%;
  right: 20%;
  animation-delay: 21s;
}

.container {
  position: relative;
  z-index: 1;
}

.thank-you-card {
  background: var(--secondary-dark);
  border-radius: var(--radius-xl);
  padding: 60px 40px;
  text-align: center;
  border: 2px solid var(--orange-10);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
}

.success-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.success-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  position: relative;
  z-index: 2;
  animation: successPulse 2s ease-in-out infinite;
}

.success-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 3px solid var(--accent-orange);
  border-radius: var(--radius-round);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 2s ease-out infinite;
  opacity: 0;
}

@keyframes successPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.thank-you-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 20px;
  line-height: 1.2;
}

.thank-you-subtitle {
  font-size: 1.25rem;
  color: var(--text-gray);
  margin-bottom: 40px;
  line-height: 1.6;
}

.order-details {
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-lg);
  padding: 30px;
  margin-bottom: 40px;
  text-align: left;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid var(--orange-10);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-icon {
  width: 50px;
  height: 50px;
  background: var(--orange-10);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--accent-orange);
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
}

.detail-label {
  font-size: 0.9rem;
  color: var(--text-gray);
  margin-bottom: 5px;
}

.detail-value {
  font-size: 1.1rem;
  color: white;
  font-weight: 600;
}

.next-steps {
  background: rgba(255, 107, 0, 0.05);
  border: 1px solid var(--orange-10);
  border-radius: var(--radius-lg);
  padding: 40px 30px;
  margin-bottom: 40px;
  text-align: left;
}

.next-steps h3 {
  color: white;
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 30px;
  text-align: center;
}

.steps-grid {
  display: grid;
  gap: 25px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.step-content h4 {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.step-content p {
  color: var(--text-gray);
  margin: 0;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-buttons .btn {
  min-width: 200px;
}

.additional-info {
  margin-top: 40px;
}

.info-card {
  background: var(--secondary-dark);
  border-radius: var(--radius-lg);
  padding: 30px 20px;
  text-align: center;
  height: 100%;
  border: 2px solid transparent;
  transition: var(--transition-base);
}

.info-card:hover {
  border-color: var(--accent-orange);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 107, 0, 0.2);
}

.info-icon {
  width: 70px;
  height: 70px;
  background: var(--orange-10);
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: var(--accent-orange);
  transition: var(--transition-base);
}

.info-card:hover .info-icon {
  background: var(--accent-orange);
  color: white;
  transform: scale(1.1) rotate(5deg);
}

.info-card h4 {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.info-card p {
  color: var(--text-gray);
  margin: 0;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .thank-you-section {
    padding: 80px 0 60px;
  }

  .thank-you-card {
    padding: 40px 25px;
  }

  .thank-you-title {
    font-size: 2.5rem;
  }

  .thank-you-subtitle {
    font-size: 1.1rem;
  }

  .success-icon {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .btn {
    width: 100%;
  }

  .order-details,
  .next-steps {
    padding: 20px;
  }

  .step-item {
    flex-direction: column;
    text-align: center;
  }

  .shape-1,
  .shape-2,
  .shape-3,
  .shape-4 {
    font-size: 6rem;
  }
}
</style>
