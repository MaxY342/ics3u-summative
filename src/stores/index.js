import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
  const firstName = ref("");
  const lastName = ref("");
  const username = ref("");
  const email = ref("");
  const password = ref("");
  const cart = ref(new Map());

  return { firstName, lastName, username, email, password, cart }
})