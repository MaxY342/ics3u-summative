<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const searchQuery = ref("");

function searchMoviesAndShows(query) {
  router.push(`search-results/${query}`);
}

function goToFilter() {
  router.push(`/filter`);
}
</script>

<template>
  <div class="search-section">
    <h1>Search Movie</h1>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Enter movie/tv-show title..." />
      <button @click="goToFilter">Filter</button>
      <button @click="searchMoviesAndShows(searchQuery)">Search!</button>
    </div>
  </div>
</template>

<style scoped>
.search-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 5rem;
  background-color: #151515;
  border-radius: 10px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2.5rem;
}

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

input {
  height: 2rem;
  width: 60vw;
  border-radius: 5px;
  padding: 0.5rem;
}

button {
  background-color: #e20c0c;
  padding: 1rem;
  color: white;
  border: 0;
  border-radius: 10px;
  transition: transform 0.2s;
}

button:hover {
  background-color: #c20000;
  cursor: pointer;
}
</style>