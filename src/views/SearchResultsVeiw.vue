<script setup>
import Topbar from '../components/Topbar.vue'
import SearchResults from '@/components/SearchResults.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <main>
    <Topbar />
    <div class="itemDetails">
      <SearchResults />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.itemDetails {
  padding: 4rem;
  background-color: #2f2f2f;
}
</style>