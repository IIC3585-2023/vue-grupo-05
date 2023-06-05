<script setup>
import { ref } from 'vue';
const posts = ref(null);
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Hola</p>

    <div v-for="post in posts">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
