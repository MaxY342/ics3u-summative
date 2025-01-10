<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "../stores/index";

const store = useStore();
const route = useRoute();
const response = await axios.get(`https://api.themoviedb.org/3/${route.params.type}/${route.params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`);
function addToCart() {
  store.cart.set(String(response.data.id), { title: response.data.original_title || response.data.name, url: response.data.poster_path })
  localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}
</script>

<template>
  <div class="movie-detail" v-if="route.params.type == 'movie'">
    <div class="movie-detail-content">
      <div class="movie-detail-left">
        <h1 class="movie-title">{{ response.data.original_title }}</h1>
        <h2 class="tagline">{{ response.data.tagline }}</h2>
        <img :src="`https://image.tmdb.org/t/p/w500${response.data.poster_path}`" alt="Movie Poster"
          class="movie-poster" />
        <p class="movie-release-date">Release Date: {{ response.data.release_date }}</p>
        <p class="rating">Rating: ⭐{{ response.data.vote_average }}</p>
      </div>

      <div class="movie-detail-right">
        <h1>Details</h1>
        <p class="movie-overview">{{ response.data.overview }}</p>
        <a class="movie-site" :href="response.data.homepage" target="_blank">Official Movie Site</a>
        <button @click="addToCart()" class="movie-site">
          {{ store.cart.has(String(response.data.id)) ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>

    <h2 class="trailers-title">Trailers</h2>
    <div class="trailers-container">
      <div v-for="trailer in response.data.videos.results" :key="trailer.id" class="trailer-tile">
        <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
          <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer"
            class="trailer-thumbnail" />
        </a>
      </div>
    </div>
  </div>
  <div class="movie-detail" v-if="route.params.type == 'tv'">
    <div class="movie-detail-content">
      <div class="movie-detail-left">
        <h1 class="movie-title">{{ response.data.name }}</h1>
        <h2 class="tagline">{{ response.data.tagline }}</h2>
        <img :src="`https://image.tmdb.org/t/p/w500${response.data.poster_path}`" alt="Movie Poster"
          class="movie-poster" />
        <p class="movie-release-date">Release Date: {{ `${response.data.first_air_date} -
          ${response.data.last_air_date}` }}</p>
        <p class="seasons">Seasons: {{ response.data.number_of_seasons }}</p>
        <p class="episodes">Episodes: {{ response.data.number_of_episodes }}</p>
        <p class="rating">Rating: ⭐{{ response.data.vote_average }}</p>
      </div>

      <div class="movie-detail-right">
        <h1>Details</h1>
        <p class="movie-overview">{{ response.data.overview }}</p>
        <a class="movie-site" :href="response.data.homepage" target="_blank">Official Movie Site</a>
        <button @click="addToCart" class="movie-site">
          {{ store.cart.has(String(response.data.id)) ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>

    <h1>Trailers</h1>
    <div class="trailers-container">
      <div v-for="trailer in response.data.videos.results" :key="trailer.id" class="trailer-tile">
        <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
          <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer"
            class="trailer-thumbnail" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-site {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #e50914;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.movie-site:hover {
  background-color: #f01212;
}

.movie-detail {
  margin: 0 50px;
  padding: 20px;
  background-color: #151515;
  color: white;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
}

.movie-detail-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10rem;
}

.movie-detail-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 30vw;
}

.movie-poster {
  display: block;
  max-width: 80%;
  border-radius: 10px;
  margin: 10px 0;
}

.movie-release-date,
.seasons,
.episodes,
.rating,
.tagline {
  font-weight: bold;
  margin: 10px;
}

.movie-detail-right {
  flex: 2 1 400px;
}

.movie-overview {
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
}

h1 {
  font-size: 2.5rem;
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
  color: #e20c0c;
}

h2 {
  font-size: 2rem;
  text-align: center;
  color: white;
}

.trailers-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.trailer-tile {
  width: 45%;
  max-width: 300px;
  margin-bottom: 20px;
}

.trailer-thumbnail {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.trailer-thumbnail:hover {
  transform: scale(1.05);
}
</style>