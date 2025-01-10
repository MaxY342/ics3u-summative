import { ref } from 'vue';
import { defineStore } from 'pinia';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());

  return { user, cart }
})

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, user => {
    try {
      const store = useStore();
      
      if (user) {
        store.user = user;
        const storedCart = localStorage.getItem(`cart_${store.user.email}`);

        store.cart = new Map(Object.entries(JSON.parse(storedCart) || {}));
      } else {
        store.user = null;
        store.cart = new Map();
      }

      resolve();
    } catch (error) {
      reject();
    }
  })
})