<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const router = useRouter();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const store = useStore();

async function registerByEmail() {
  try {
    const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
    await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
    store.user = user;
    router.push("/home");
  } catch (error) {
    alert("There was an error creating a user with email!");
  }
}

async function registerByGoogle() {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/home");
  } catch (error) {
    alert("There was an error creating a user with Google!");
  }
}
</script>

<template>
  <form class="login" @submit.prevent="registerByEmail">
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
  <button @click="registerByGoogle()" class="button register">Register by Google</button>
</template>

<style scoped>
.login {
  background-color: #151515;
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