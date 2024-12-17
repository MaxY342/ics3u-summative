<script setup>
import axios from "axios";

const trending = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_TMDB_KEY}`);

function shuffleArray(arr) {

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffleArray(trending.data.results);
</script>

<template>
  <div class="featured-section">
    <h1>Featured</h1>
    <div class="featured-section-content">
      <div v-for="item in trending.data.results.slice(0, 3)" :key="item.id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ item.media_type === 'tv' ? item.name : item.title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.featured-section {
  text-align: center;
}

.featured-section {
  z-index: 2;
  background-color: #151515;
  color: white;
  position: relative;
  font-size: 20px;
  padding: 40px 100px;
}

.featured-section-content {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
}
</style>
