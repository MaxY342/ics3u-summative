<script setup>
import Topbar from '../components/Topbar.vue'
import ItemDetails from '@/components/ItemDetails.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <main>
    <Topbar />
    <div class="itemDetails">
      <ItemDetails />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.itemDetails {
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: #2f2f2f;
}
</style>