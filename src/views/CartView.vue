<script setup>
import Topbar from '../components/Topbar.vue'
import Footer from '../components/Footer.vue'
import { useStore } from '../stores/index';

const store = useStore();
function removeItem(key) {
  store.cart.delete(key)
  var items = JSON.parse(localStorage.getItem(`cart_${store.user.email}`));
  for (var i = 0; i < items.length; i++) {
    var item = JSON.parse(items[i]);
    if (item.id == key) {
        items.splice(i, 1);
    }
}
  localStorage.removeItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}
console.log(localStorage)
</script>

<template>
  <Topbar />
  <div class="cart">
    <div class="content">
      <h1>Shopping Cart</h1>
      <div class="items-container">
        <div class="item" v-for="([key, value]) in store.cart">
          <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" />
          <h1>{{ value.title }}</h1>
          <button @click="store.cart.delete(key)">Remove</button>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.content {
  background-color: #151515;
  border-radius: 10px;
  color: white;
  padding: 5rem;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
}

button {
  background-color: #e20c0c;
  color: white;
  padding: 1rem;
  border: 0;
  border-radius: 10px;
  transition: transform 0.2s;
  justify-self: end;
}

button:hover {
  background-color: #c20000;
  cursor: pointer;
}

.cart {
  display: flex;
  flex-direction: column;
  background-color: #2f2f2f;
  padding: 4rem;
  gap: 2rem;
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 5rem;
}

.item {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-items: left;
}

img {
  width: 30%;
  border-radius: 5%;
}
</style>