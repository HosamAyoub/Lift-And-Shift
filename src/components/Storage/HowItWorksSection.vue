<template>
  <section class="section section-dark py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">How It <span class="text-orange">Works</span></h2>
        <!-- <p class="section-subtitle">Simple 3-step process for your storage needs</p> -->
      </div>

      <div class="row g-4 justify-content-center">
        <div class="col-lg-4 col-md-6">
          <div class="step-card text-center">
            <div class="step-label rounded-pill text-center">Step 1</div>
            <h3 class="step-title">Free Boxes & Supplies</h3>
            <p class="step-description">
              Reusable 24×18×18 moving boxes delivered to you. Our reusable boxes are approximately
              <b class="text-orange">10% larger</b> than standard and designed for secure stacking.
            </p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="step-card text-center">
            <div class="step-label rounded-pill text-center">Step 2</div>
            <h3 class="step-title">Pickup & Secure Storage</h3>
            <p class="step-description">
              Our team picks up your items from your location and stores them safely in our
              <b class="text-orange">climate controlled facility</b>. Minimum 4-month storage term
              applies.
            </p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="step-card text-center">
            <div class="step-label rounded-pill text-center">Step 3</div>
            <h3 class="step-title">Deliver Anywhere</h3>
            <p class="step-description">
              When you're ready, we deliver your belongings to your new location.
              <b class="text-orange">Free delivery</b>
              within the service area.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HowItWorksSection',
}
</script>

<style scoped>
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto;
}

.step-card {
  /* background: var(--secondary-dark); */
  /* border: 2px solid var(--orange-10); */
  border-radius: var(--radius-xl);
  padding: 2rem;
  transition: all 0.3s ease;
  height: 100%;
}

.step-card:hover {
  /* border-color: var(--accent-orange); */
  /* box-shadow: 0 10px 30px var(--orange-20); */
  transform: translateY(-5px);
}

.step-label {
  background-color: var(--accent-orange);
  font-weight: 500;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-light);
  margin-bottom: 1rem;
}

.step-description {
  color: var(--text-gray);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .step-card {
    padding: 1.5rem;
  }

  .step-title {
    font-size: 1.25rem;
  }
}
</style>
