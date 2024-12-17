<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from '../stores/index';

const store = useStore();
const router = useRouter();
const nowPlaying = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
const trending = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_TMDB_KEY}`);
const topRated = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}`);
const upcoming = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}`);
const nowPlayingIsExpanded = ref(false);
const trendingIsExpanded = ref(false);
const topRatedIsExpanded = ref(false);
const upcomingIsExpanded = ref(false);
const nowPlayingLimit = ref(5);
const trendingLimit = ref(5);
const topRatedLimit = ref(5);
const upcomingLimit = ref(5);

function toggleLimit(list, isExpanded) {
  return isExpanded ? 5 : list.length;
}

function getMovieDetails(type, id) {
  router.push(`/${type}/${id}`);
}
</script>

<template>
  <div class="movie-gallery">
    <h1>Now Playing</h1>
    <div class="movie-list">
      <div v-for="movie in nowPlaying.data.results.slice(0, nowPlayingLimit)" :key="movie.id" class="item">
        <div class="movie-card" @click="getMovieDetails('movie', movie.id)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
        <button @click="store.cart.set(movie.id, { title: movie.title, url: movie.poster_path })" class="cart-button">
          {{ store.cart.has(movie.id) ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>
    <button
      @click="nowPlayingLimit = toggleLimit(nowPlaying.data.results, nowPlayingIsExpanded), nowPlayingIsExpanded = !nowPlayingIsExpanded">{{
        nowPlayingIsExpanded ? "View Less" : "View More" }}</button>
    <hr style="width:100%">
    <h1>Trending</h1>
    <div class="movie-list">
      <div v-for="item in trending.data.results.slice(0, trendingLimit)" :key="item.id" class="item">
        <div class="movie-card" @click="getMovieDetails(item.media_type, item.id)">
          <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" alt="Movie Poster" class="movie-poster" />
          <p class="movie-title">{{ item.media_type === 'tv' ? item.name : item.title }}</p>
        </div>
        <button @click="store.cart.set(item.id, { title: item.title || item.name, url: item.poster_path })" class="cart-button">
          {{ store.cart.has(item.id) ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>
    <button
      @click="trendingLimit = toggleLimit(trending.data.results, trendingIsExpanded), trendingIsExpanded = !trendingIsExpanded">{{
        trendingIsExpanded ? "View Less" : "View More" }}</button>
    <hr style="width:100%">
    <h1>Top Rated</h1>
    <div class="movie-list">
      <div v-for="movie in topRated.data.results.slice(0, topRatedLimit)" :key="movie.id" class="item">
        <div class="movie-card" @click="getMovieDetails('movie', movie.id)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
        <button @click="store.cart.set(movie.id, { title: movie.title, url: movie.poster_path })" class="cart-button">
          {{ store.cart.has(movie.id) ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>
    <button
      @click="topRatedLimit = toggleLimit(topRated.data.results, topRatedIsExpanded), topRatedIsExpanded = !topRatedIsExpanded">{{
        topRatedIsExpanded ? "View Less" : "View More" }}</button>
    <hr style="width:100%">
    <h1>Upcoming</h1>
    <div class="movie-list">
      <div v-for="movie in upcoming.data.results.slice(0, upcomingLimit)" :key="movie.id" class="item">
        <div class="movie-card" @click="getMovieDetails('movie', movie.id)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
        <button @click="store.cart.set(movie.id, { title: movie.title, url: movie.poster_path })" class="cart-button">
          {{ store.cart.has(movie.id) ? 'Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>
    <button
      @click="upcomingLimit = toggleLimit(upcoming.data.results, upcomingIsExpanded), upcomingIsExpanded = !upcomingIsExpanded">{{
        upcomingIsExpanded ? "View Less" : "View More" }}</button>

  </div>
</template>

<style scoped>
.movie-gallery {
  background-color: #151515;
  border-radius: 10px;
  padding: 4rem;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
}

button {
  background-color: #e20c0c;
  padding: 1rem;
  margin: 50px 0;
  color: white;
  border: 0;
  border-radius: 10px;
  transition: transform 0.2s;
}

.cart-button {
  margin: 10px;
}

button:hover {
  background-color: #c20000;
  cursor: pointer;
}
</style>