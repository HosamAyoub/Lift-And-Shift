<template>
  <div class="navbar-wrapper">
    <Menubar :model="items" class="navbar">
      <template #start>
        <Avatar :image="logo" size="large" style="width: 60px" />
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span v-if="item.icon" :class="item.icon"></span>
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-bind="props.action">
          <span v-if="item.icon" :class="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
          <i v-if="hasSubmenu" class="pi pi-angle-down ml-auto"></i>
        </a>
      </template>
      <template #end>
        <Button label="Toggle Dark Mode" @click="toggleDarkMode()">
          <i v-if="isDarkMode" class="pi pi-moon"></i>
          <i v-else class="pi pi-sun"></i>
        </Button>
      </template>
    </Menubar>
  </div>
</template>

<script>
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import logoImage from '../../assets/logo.png'

export default {
  computed: {
    logo() {
      return logoImage
    },
  },
  data() {
    return {
      isDarkMode: false,
      items: [
        {
          label: 'Home',
          icon: 'fa-solid fa-house',
          to: '/',
        },
        {
          label: 'Moving',
          icon: 'fa-solid fa-truck-fast',
          to: '/moving',
        },
        {
          label: 'Storage',
          icon: 'fa-solid fa-warehouse',
          to: '/storage',
        },
        {
          label: 'Removal',
          icon: 'fa-solid fa-trash-can',
          to: '/removal',
        },
        {
          label: 'Demo',
          icon: 'fa-solid fa-person-digging',
          to: '/demo',
        },
        {
          label: 'About',
          icon: 'fa-solid fa-magnifying-glass',
          items: [
            {
              label: 'About Us',
              icon: 'fa-solid fa-lightbulb',
              to: '/aboutUs',
            },
            {
              label: 'Careers',
              icon: 'fa-solid fa-user-tie',
              to: '/careers',
            },
            {
              label: 'Contact',
              icon: 'fa-solid fa-envelope',
              to: '/contact',
            },
          ],
        },
      ],
    }
  },
  components: {
    Avatar,
    Button,
    Menubar,
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.documentElement.classList.toggle('my-app-dark')
    },
  },
}
</script>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
}

.navbar {
  border-radius: 0 !important;
  width: 100%;
}

.navbar :deep(.p-menubar-root-list) {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.navbar :deep(.p-menubar-start) {
  margin-right: auto;
}

.navbar :deep(.p-menubar-end) {
  margin-left: auto;
}
</style>
