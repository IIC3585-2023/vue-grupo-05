<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <!-- display according to the route -->
  <v-app>
    <Navbar />
    <v-main class="content">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0.8;
}
</style>
