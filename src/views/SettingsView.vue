<script setup>
import Topbar from '../components/Topbar.vue'
import Settings from '@/components/Settings.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <main>
    <Topbar />
    <div class="settings">
      <Settings />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.settings {
  padding: 4rem;
  background-color: #2f2f2f;
}
</style>