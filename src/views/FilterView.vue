<script setup>
import Topbar from '../components/Topbar.vue'
import Filter from '../components/Filter.vue'
import Footer from '../components/Footer.vue'

</script>

<template>
  <main>
    <Topbar />
    <div class="filter-container">
      <Filter />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.filter-container {
  background-color: #2f2f2f;
  padding: 4rem 0;
}
</style>