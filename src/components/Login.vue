<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from "../stores"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const loginByEmail = async () => {
  try {
    const user = (await signInWithEmailAndPassword(auth, email.value, password.value)).user;
    store.user = user;
    router.push("/home");
  } catch (error) {
    console.log(error);
    alert("There was an error signing in with email!");
  }
};

const loginByGoogle = async () => {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/home");
  } catch (error) {
    alert("There was an error signing in with Google!");
  }
};
</script>

<template>
  <form class="login" @submit.prevent="loginByEmail">
    <label>Username/Email</label>
    <input v-model="email" type="email">
    <label>Password</label>
    <input v-model="password" type="password">
    <button type="submit">Log-in</button>
  </form>
  <button @click="loginByGoogle()" type="submit">Login by Google</button>
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