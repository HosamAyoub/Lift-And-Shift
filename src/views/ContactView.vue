<template>
  <main class="contact-page">
    <ContactForm></ContactForm>
  </main>
</template>

<script>
import ContactForm from '../components/Contact/Form.vue'

export default {
  name: 'ContactView',
  components: {
    ContactForm
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--bg-primary);
}
</style>
