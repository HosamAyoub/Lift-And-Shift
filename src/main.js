import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Ripple from 'primevue/ripple'
import { definePreset } from '@primevue/themes'
import { Form } from '@primevue/forms'
import { button } from '@primeuix/themes/aura/inputnumber'

const app = createApp(App)

const myPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}',
    },
    colorScheme: {
      light: {
        semantic: {
          formField: {
            hoverBorderColor: '{primary.color}',
          },
        },
      },
      dark: {
        semantic: {
          formField: {
            hoverBorderColor: '{primary.color}',
          },
          surface: {
            0: '#ffffff',
            50: '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}',
          },
          highlight: {
            background: '{primary.200}',
            color: '{primary.900}',
          },
        },
      },
    },
  },
})

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: myPreset,
    options: {
      prefix: 'lift-and-shift',
      darkModeSelector: '.my-app-dark',
      cssLayer: false,
      ripple: true,
    },
  },
})

app.directive('ripple', Ripple)

app.mount('#app')
