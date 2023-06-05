<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/authStore";
const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.token);
const boardsPath = computed(() => `/users/${authStore.id}/boards`);
const logout = () => {
  authStore.logout();
};
</script>

<template>
  <v-app-bar scroll-behavior="hide" scroll-threshold="1" :elevation="3">
    <v-toolbar-title>
      <v-btn icon="mdi-pinterest" to="/feed"></v-btn>
    </v-toolbar-title>
    <template v-slot:append>
      <v-btn v-if="isLoggedIn" icon="mdi-home" to="/feed"></v-btn>
      <v-btn v-if="isLoggedIn" icon="mdi-heart" :to="boardsPath"></v-btn>
      <v-btn v-if="isLoggedIn" icon="mdi-account-group" to="/users"></v-btn>
      <v-btn v-if="isLoggedIn" icon="mdi-logout" @click="logout"></v-btn>

      <v-btn v-if="!isLoggedIn" color="primary" text to="/login"
        >Iniciar Sesión</v-btn
      >
      <v-btn v-if="!isLoggedIn" color="primary" text to="/register"
        >Registrarse</v-btn
      >
    </template>
  </v-app-bar>
</template>
