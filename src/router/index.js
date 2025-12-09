import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutUsView from '../views/AboutUsView.vue'
import CareersView from '@/views/CareersView.vue'
import ContactView from '@/views/ContactView.vue'
import DemolitionView from '@/views/DemolitionView.vue'
import MovingView from '@/views/MovingView.vue'
import HaulingView from '@/views/HaulingView.vue'
import StorageView from '@/views/StorageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUsView,
    },
    {
      path: '/careers',
      name: 'careers',
      component: CareersView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/demolition',
      name: 'demolition',
      component: DemolitionView,
    },
    {
      path: '/moving',
      name: 'moving',
      component: MovingView,
    },
    {
      path: '/hauling',
      name: 'hauling',
      component: HaulingView,
    },
    {
      path: '/storage',
      name: 'storage',
      component: StorageView,
    },
  ],
})

export default router
