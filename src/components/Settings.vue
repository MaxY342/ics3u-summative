<script setup>
import { useStore } from "../stores/index";
import { ref } from "vue";

const store = useStore();
const changeFormOpen = ref(false);
const changeFormType = ref("");
const newValue = ref("");

function openChangeForm(type) {
  changeFormOpen.value = true;
  changeFormType.value = type;
}

function saveChanges(type, value) {
  if (type == 'firstName') {
    store.firstName = value;
  }
  else {
    store.lastName = value;
  }
  changeFormOpen.value = false;
  changeFormType.value = "";
  newValue.value = "";
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
    <p>First Name: {{ store.firstName }}</p>
    <button @click="openChangeForm('firstName')">Change</button>
  </div>
  <div class="settings-element">
    <p>Last Name: {{ store.lastName }}</p>
    <button @click="openChangeForm('lastName')">Change</button>
  </div>
  <p>Email: {{ store.email }}</p>
  <p>Username: {{ store.username }}</p>
  <div class="change-form-overlay" v-if="changeFormOpen">
    <div class="change-form">
      <h2>Change {{ changeFormType == 'firstName' ? 'First Name' : 'Last Name' }}</h2>
      <input placeholder="Enter new value" v-model="newValue">
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