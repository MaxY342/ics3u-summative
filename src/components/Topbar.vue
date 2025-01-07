<script setup>
import { useRoute } from 'vue-router';
import { useStore } from '@/stores';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const store = useStore();
const route = useRoute();

const logout = () => {
  store.user = null;
  signOut(auth);
  router.push('/');
}
</script>

<template>
  <div class="topbar">
    <div class="sidebar">
      <button class=sidebarbtn>Menu</button>
      <div class="sidebar-content">
        <RouterLink to="/">Landing Page</RouterLink>
        <RouterLink to="/home">Homepage</RouterLink>
        <RouterLink to="/filter">Filter</RouterLink>
        <RouterLink to="/cart">My Cart</RouterLink>
      </div>
    </div>
    <h1 class="logo">Metflix</h1>
    <!--<h1 class="greeting">Hello, {{ store.user.email }}</h1>-->
    <div v-if="route.name == 'landingPage' || route.name == 'signup' || route.name == 'login'" class="right-buttons">
      <RouterLink v-if="route.name !== 'signup'" to="/signup" class="sign-up-btn">Sign-up</RouterLink>
      <RouterLink v-if="route.name !== 'login'" to="/login" class="log-in-btn">Login</RouterLink>
    </div>
    <div v-if="route.name !== 'landingPage' && route.name !== 'signup' && route.name !== 'login'" class="right-buttons">
      <RouterLink v-if="route.name !== 'settings'" to="/settings" class="sign-up-btn">Settings</RouterLink>
      <RouterLink v-if="route.name !== 'cart'" to="/cart" class="log-in-btn">Cart</RouterLink>
      <button @click="logout()" class="log-in-btn">Log Out</button>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.sidebarbtn,
.sign-up-btn,
.log-in-btn {
  background-color: #191919;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  z-index: 1;
  text-decoration: none;
  border-radius: 10px;
}

.sidebar-content {
  display: none;
  position: fixed;
  background-color: #2f2f2f;
  width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 3;
  top: 0;
  height: 100vh;
  overflow: hidden;
  white-space: nowrap;
}

.sidebar-content a {
  color: white;
  padding: 18px 16px;
  text-decoration: none;
}

.sidebar:hover .sidebar-content {
  display: grid;
  animation-name: slide;
  animation-duration: 1s;
  grid-template-rows: auto auto auto auto 1fr;
}

@keyframes slide {
  from {
    width: 0px;
  }

  to {
    width: 300px;
  }
}

.sidebarbtn:hover,
.sign-up-btn:hover,
.log-in-btn:hover {
  background-color: #353535
}

.sidebar-content a:hover {
  background-color: #4f4f4f;
}

.topbar:hover~* {
  opacity: 0.5;
}

.logo, .greeting {
  margin: 0;
  color: red;
  margin-left: 20px;
}

.greeting {
  color: white;
  font-weight: 500;
}

.right-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>