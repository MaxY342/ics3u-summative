<script setup>
import Signup from '../components/Signup.vue';
import Topbar from '../components/Topbar.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <main>
    <Topbar />
    <div class="signup-container">
      <Signup class="signup" />
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

.signup-container {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #2f2f2f;
  padding: 5rem;
}

.signup {
  background-color: #151515;
}
</style>
