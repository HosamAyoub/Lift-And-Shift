<template>
  <main class="contact-page">
    <Contact></Contact>
  </main>
</template>

<script>
import Contact from '../components/Contact/Contact.vue'

export default {
  name: 'ContactView',
  components: {
    Contact
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--bg-primary);
}
</style>
