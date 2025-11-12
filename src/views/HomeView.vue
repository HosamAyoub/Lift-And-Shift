<template>
  <div class="home-view">
    <hero-section></hero-section>
    <services-section></services-section>
    <about-section></about-section>
    <why-choose-section></why-choose-section>
    <cta-section></cta-section>
  </div>
</template>

<script>
import HeroSection from '../components/Home/HeroSection.vue'
import ServicesSection from '../components/Home/ServicesSection.vue'
import AboutSection from '../components/Home/AboutSection/AboutSection.vue'
import WhyChooseSection from '../components/Home/WhyChooseSection.vue'
import CTASection from '../components/Home/CTASection.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    ServicesSection,
    AboutSection,
    WhyChooseSection,
    CTASection
  }
}
</script>

<style scoped>
.home-view {
  background-color: var(--bg-dark);
}
</style>
