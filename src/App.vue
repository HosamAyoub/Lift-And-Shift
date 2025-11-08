<template>
  <Navbar></Navbar>
  <RouterView></RouterView>
</template>

<script>
import Navbar from './components/Shared/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>
