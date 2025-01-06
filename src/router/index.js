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
import { userAuthorized, useStore } from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      meta: { auth: false },
      component: LandingPageView,
    },
    {
      path: '/login',
      name: 'login',
      meta: { auth: false },
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { auth: false },
      component: SignupView,
    },
    {
      path: '/home',
      name: 'home',
      meta: { auth: true },
      component: HomeView,
    },
    {
      path: '/filter',
      name: 'filter',
      meta: { auth: true },
      component: FilterView,
    },
    {
      path: '/:type/:id',
      name: 'id',
      meta: { auth: true },
      component: ItemDetailsVeiw,
    },
    {
      path: '/search-results/:query',
      name: 'searchResults',
      meta: { auth: true },
      component: SearchResultsVeiw,
    },
    {
      path: '/cart',
      name: 'cart',
      meta: { auth: true },
      component: CartView,
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { auth: true },
      component: SettingsView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  userAuthorized.then(() => {
    const store = useStore();

    if (!store.user && to.meta.auth) {
      next("/login");
    } else {
      next();
    }
  });
});

export default router
