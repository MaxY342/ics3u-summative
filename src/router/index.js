import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '../views/LandingPageView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import HomeView from '@/views/HomeView.vue'
import FilterView from '../views/FilterView.vue'
import ItemDetailsVeiw from '@/views/ItemDetailsVeiw.vue'
import SearchResultsVeiw from '@/views/SearchResultsVeiw.vue'
import CartView from '@/views/CartView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPageView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/filter',
      name: 'filter',
      component: FilterView,
    },
    {
      path: '/:type/:id',
      name: 'id',
      component: ItemDetailsVeiw,
    },
    {
      path: '/search-results/:query',
      name: 'searchResults',
      component: SearchResultsVeiw,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router
