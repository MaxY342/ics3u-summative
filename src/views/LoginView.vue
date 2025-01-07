<script setup>
import Login from '../components/Login.vue';
import Topbar from '../components/Topbar.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <main>
    <Topbar />
    <div class="login-container">
      <Login />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.login-container {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #2f2f2f;
}
</style>
