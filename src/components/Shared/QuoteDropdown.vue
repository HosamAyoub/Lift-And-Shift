<template>
  <div class="quote-dropdown" :class="dropdownClass">
    <button
      class="btn btn-primary px-4"
      :class="buttonClass"
      type="button"
      @click="toggleDropdown"
      @blur="handleBlur"
    >
      Get A Quote
      <i class="fas fa-chevron-down arrow"></i>
    </button>
    <div v-show="isOpen" class="quote-dropdown-menu">
      <a
        v-for="service in services"
        :key="service.path"
        :href="service.path"
        class="quote-dropdown-item"
        @click.prevent="navigateToService(service)"
      >
        <i :class="service.icon"></i>
        <span>{{ service.name }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteDropdown',
  props: {
    buttonClass: {
      type: String,
      default: '',
    },
    dropdownClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
      services: [
        { name: 'Moving', path: '/moving#form', icon: 'fas fa-truck-fast' },
        { name: 'Storage', path: '/storage#form', icon: 'fas fa-warehouse' },
        { name: 'Hauling', path: '/hauling#form', icon: 'fas fa-trailer' },
        { name: 'Demolition', path: '/demolition#form', icon: 'fas fa-person-digging' },
      ],
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    handleBlur(event) {
      // Close dropdown when clicking outside
      setTimeout(() => {
        this.isOpen = false
      }, 200)
    },
    navigateToService(service) {
      this.isOpen = false
      const path = service.path.split('#')[0]
      const hash = service.path.split('#')[1]

      // Check if we're already on the target page
      if (this.$route.path === path) {
        // Just scroll to the form section
        this.scrollToForm()
      } else {
        // Navigate to the page first, then scroll
        this.$router.push(service.path).then(() => {
          this.$nextTick(() => {
            this.scrollToForm()
          })
        })
      }
    },
    scrollToForm() {
      setTimeout(() => {
        const formSection = document.getElementById('form')
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    },
  },
}
</script>

<style scoped>
.quote-dropdown {
  position: relative;
  display: inline-block;
}

.quote-dropdown .btn {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  white-space: nowrap;
}

.quote-dropdown .btn i {
  transition: transform 0.3s ease;
}

.quote-dropdown .btn:hover i,
.quote-dropdown.open .btn i {
  transform: rotate(180deg);
}

.quote-dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  min-width: 200px;
  background: var(--secondary-dark);
  /* border: 2px solid var(--accent-orange); */
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  box-shadow: 0 10px 30px var(--black-50);
  z-index: 1000;
  animation: dropdownSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow {
  position: relative;
  left: 0px;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.quote-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--gap-md) var(--gap-lg);
  color: var(--text-light);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  font-weight: 600;
}

.quote-dropdown-item:hover {
  background: var(--orange-10);
  color: var(--accent-orange);
  transform: translateX(5px);
}

.quote-dropdown-item i {
  width: 20px;
  font-size: 1.1rem;
}

@media (max-width: 576px) {
  .quote-dropdown-menu {
    left: 50%;
    transform: translateX(-50%);
    right: auto;
  }
}
</style>
