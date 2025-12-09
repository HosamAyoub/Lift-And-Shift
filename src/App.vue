<template>
  <div id="app">
    <Navbar></Navbar>
    <main>
      <RouterView></RouterView>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/Shared/Navbar.vue'
import Footer from './components/Shared/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background-color: var(--bg-dark);
  min-height: 100vh;
}

main {
  padding-top: 80px;
  min-height: calc(100vh - 80px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-dark);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-orange);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-orange-light);
}
</style>
