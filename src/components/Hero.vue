<script setup>
import { onMounted, onUnmounted } from 'vue';

function ScrollOpacityEffect(item) {
  let header = document.querySelector(item);
  let scrollPosition = window.scrollY;
  header.style.opacity = 1 - scrollPosition / 400;
};

function handleScroll() {
  ScrollOpacityEffect(".hero");
}

function enableScrollEffect() {
  window.addEventListener('scroll', handleScroll);
}

function detachScrollEffect() {
  window.removeEventListener('scroll', handleScroll);
}

onMounted(() => {
  enableScrollEffect();
});

onUnmounted(() => {
  detachScrollEffect();
});
</script>

<template>
  <div class="hero-container">
    <h1 class="hero">Watch Now!</h1>
  </div>
</template>

<style scoped>
.hero-container {
  background-color: #2f2f2f;
  position: relative;
  padding: 18rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 1s ease;
}

.hero {
  color: white;
  font-size: 10vh;
  position: fixed;
  text-align: center;
  z-index: 1;
}
</style>
