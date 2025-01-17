<script setup>
import { useStore } from "../stores/index";
import { ref } from "vue";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";

const auth = getAuth();
const store = useStore();
let [firstName, lastName] = auth.currentUser.displayName.split('|');
const changeFormOpen = ref(false);
const changeFormType = ref("");
const newValue = ref("");
let logedInWithPassword = false;
auth.currentUser.providerData.forEach((provider) => {
  if (provider.providerId == "password") {
    logedInWithPassword = true;
  }
});

function openChangeForm(type) {
  changeFormOpen.value = true;
  changeFormType.value = type;
}

async function saveChanges(type, value) {
  if (type == 'firstName') {
    firstName = value;
    await updateProfile(auth.currentUser, { displayName: `${firstName}|${lastName}` });
  }
  else if (type == 'lastName') {
    lastName = value;
    await updateProfile(auth.currentUser, { displayName: `${firstName}|${lastName}` });
  }
  else {
    await updatePassword(auth.currentUser, value)
  }
  changeFormOpen.value = false;
  changeFormType.value = "";
  newValue.value = "";
  location.reload()
}

function closeChanges() {
  changeFormOpen.value = false;
  changeFormType.value = "";
  newValue.value = "";
}
</script>

<template>
<div class="settings-content">
  <h1>Settings</h1>
  <div class="settings-element">
    <p>First Name: {{ firstName }}</p>
    <button v-if="logedInWithPassword" @click="openChangeForm('firstName')">Change</button>
  </div>
  <div class="settings-element">
    <p>Last Name: {{ lastName }}</p>
    <button v-if="logedInWithPassword" @click="openChangeForm('lastName')">Change</button>
  </div>
  <p>Email: {{ store.user.email }}</p>
  <div class="settings-element">
    <p>Password: ******</p>
    <button v-if="logedInWithPassword" @click="openChangeForm('password')">Change</button>
  </div>
  <div class="change-form-overlay" v-if="changeFormOpen">
    <div class="change-form">
      <h2>Change {{ changeFormType == 'firstName' ? 'First Name' : changeFormType == 'lastName' ? 'Last Name' : 'Password' }}</h2>
      <input v-if="changeFormType == 'firstName' || changeFormType == 'lastName'" placeholder="Enter new value" v-model="newValue">
      <input v-if="changeFormType == 'password'" type="password" placeholder="Enter new value" v-model="newValue">
      <div class="change-actions">
        <button @click="closeChanges">Cancel</button>
        <button @click="saveChanges(changeFormType, newValue)">Save</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.settings-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #151515;
  color: white;
  border-radius: 10px;
  padding: 4rem;
  gap: 3rem;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  margin-bottom: 4rem;
}

.settings-element {
  display: flex;
  gap: 10px;
}

button {
  background-color: #e20c0c;
  color: white;
  padding: 1rem;
  border: 0;
  border-radius: 10px;
  transition: transform 0.2s;
}

button:hover {
  background-color: #c20000;
  cursor: pointer;
}

p {
  margin: 0;
  padding: 1rem;
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

input {
  height: 2rem;
  border-radius: 5px;
  padding: 0.5rem;
}

.change-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>