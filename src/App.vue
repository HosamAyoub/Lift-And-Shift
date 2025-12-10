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
  data() {
    return {
      scrollObserver: null,
      mutationObserver: null,
    }
  },
  mounted() {
    // Global scroll animation observer
    this.initGlobalScrollAnimations()
  },
  watch: {
    // Re-initialize animations when route changes
    $route() {
      this.$nextTick(() => {
        // Reset all scroll-reveal elements
        const elements = document.querySelectorAll('.scroll-reveal')
        elements.forEach((el) => {
          el.classList.remove('revealed')
        })

        // Scroll to top on route change
        window.scrollTo({ top: 0, behavior: 'instant' })

        // Re-observe elements after a short delay
        setTimeout(() => {
          this.observeScrollElements()
        }, 100)
      })
    },
  },
  beforeUnmount() {
    // Clean up observers
    if (this.scrollObserver) {
      this.scrollObserver.disconnect()
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  },
  methods: {
    initGlobalScrollAnimations() {
      this.scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        },
      )

      // Initial observation
      this.observeScrollElements()

      // Re-observe when new content is added (for dynamic content)
      this.mutationObserver = new MutationObserver(() => {
        this.observeScrollElements()
      })

      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      })
    },
    observeScrollElements() {
      const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)')
      elements.forEach((el) => this.scrollObserver.observe(el))
    },
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
