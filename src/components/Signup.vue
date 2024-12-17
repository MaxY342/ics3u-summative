<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index'

const router = useRouter();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const store = useStore();

const handleSignup = () => {
  if (confirmPassword.value !== password.value) {
    alert("Confirm Password Does Not Match Password");
  } else {
    store.firstName = firstName.value;
    store.lastName = lastName.value;
    store.username = username.value;
    store.email = email.value;
    store.password = password.value;
    router.push("/home");
  }
};
</script>

<template>
  <form class="login" @submit.prevent="handleSignup">
    <label>First Name</label>
    <input required v-model="firstName">
    <label>Last Name</label>
    <input required v-model="lastName">
    <label>Username</label>
    <input required v-model="username">
    <label>Email</label>
    <input type="email" required v-model="email">
    <label>Password</label>
    <input type="password" required v-model="password">
    <label>Confirm Password</label>
    <input type="password" required v-model="confirmPassword">
    <button type="submit">Sign-up</button>
  </form>
</template>

<style scoped>
.login {
  color: white;
  display: flex;
  flex-direction: column;
  padding: 100px;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  gap: 10px;
}

input {
  height: 2rem;
}

button {
  background-color: #e20c0c;
  margin: 20px;
  padding: 1rem;
  color: white;
  border: 0;
  border-radius: 10px;
}

button:hover {
  background-color: #c20000;
  cursor: pointer;
}

label {
  font-size: 20px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>