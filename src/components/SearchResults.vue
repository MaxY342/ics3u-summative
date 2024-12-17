<script setup>
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useStore } from "../stores/index";

const store = useStore();
const route = useRoute();
const router = useRouter();
const searchResults = ref([]);
async function getMoviesAndShows() {
  const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${route.params.query}`);

  searchResults.value = response.data.results.filter(
    (item) => item.media_type !== "person"
  );
}

function getMovieDetails(type, id) {
  router.push(`/${type}/${id}`);
}

onMounted(() => {
  getMoviesAndShows();
});
</script>

<template>
  <div class="search-results">
    <h1>Search Results</h1>
    <div class="movie-list" v-if="searchResults.length">
      <div v-for="item in searchResults" :key="item.id" class="item">
        <div class="movie-card" @click="getMovieDetails(item.media_type, item.id)">
          <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" alt="Movie Poster" class="movie-poster" />
          <p class="movie-title">{{ item.media_type === 'tv' ? item.name : item.title }}</p>
        </div>
        <button @click="store.cart.set(item.id, { title: item.title || item.name, url: item.poster_path })" class="cart-button">
          {{ store.cart.has(item.id) ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>
    <p v-else>No results found.</p>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  margin-bottom: 4rem;
}

.search-results {
  background-color: #151515;
  padding: 4rem;
  color: white;
  border-radius: 10px;
}

button {
  margin-top: 10px;
  background-color: #e20c0c;
  padding: 1rem;
  color: white;
  border: 0;
  border-radius: 10px;
}

button:hover {
  background-color: #c20000;
  cursor: pointer;
}
</style>