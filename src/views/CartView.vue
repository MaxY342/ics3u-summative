<script setup>
import Topbar from '../components/Topbar.vue'
import Footer from '../components/Footer.vue'
import { useStore } from '../stores/index';
import { ref } from "vue";

const store = useStore();
const changeFormOpen = ref(false);

function removeItem(key) {
  store.cart.delete(key)
  localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}

function clearCart() {
  store.cart.clear();
  localStorage.removeItem(`cart_${store.user.email}`);
  changeFormOpen.value = true;
}

function closeChanges() {
  changeFormOpen.value = false;
}

console.log(localStorage)
console.log(store.cart)
console.log(store.cart.size)
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
          <button @click="removeItem(key)">Remove</button>
        </div>
      </div>
      <div class="checkout-container">
        <button v-if="store.cart.size > 0" @click="clearCart" class="checkout-button">Checkout</button>
      </div>
    </div>
    <div class="change-form-overlay" v-if="changeFormOpen">
      <div class="change-form">
        <h2>Thank you for your purchase!</h2>
        <div class="change-actions">
          <button @click="closeChanges">Okay</button>
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
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-items: left;
}

img {
  max-width: 10vw;
  border-radius: 5%;
}

.change-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.change-form {
  background: #222;
  color: white;
  border-radius: 10px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.change-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.checkout-container {
  display: flex;
  justify-content: center;
}

.checkout-button {
  width: 44vw;
}
</style>