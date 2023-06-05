<script setup>
import { onMounted, ref } from "vue";
import PocketBase from "pocketbase";
const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const users = ref([]);
onMounted(async () => {
  users.value = await pb.collection("users").getFullList({ sort: "-created" });
  console.log(users.value);
});
</script>

<template>
  <h2 class="text-center">Usuarios</h2>
  <v-container
    class="container d-flex justify-space-between align-self-center flex-wrap overflow-auto"
  >
    <div v-for="user in users" class="d-flex justify-center align-center">
      <v-card
        class="user"
        :key="user.id"
      >
        <v-card-title class="">{{ user.name }}</v-card-title>
        <v-btn class="btn btn-primary w-100 " :to="`/users/${user.id}/boards`" :elevation="3">Ver tableros</v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
.user {
  width: 20vh;
  margin: 1em;
  cursor: pointer;
}
.container {
  height: 100%;
  width: 100%;
}
</style>