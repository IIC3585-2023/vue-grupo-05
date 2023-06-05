<script setup>
import ImageButton from "./ImageButton.vue";
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";
// Get an array of images as a prop
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});
const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.token);
</script>

<template>
  <v-container
    class="container d-flex justify-space-between align-self-center flex-wrap overflow-auto"
  >
    <div v-for="image in props.images" :key="image.id">
      <v-hover>
        <template v-slot:default="{ props }">
          <div
            class="image-container rounded-lg"
            v-bind="props"
            ref="imageContainer"
          >
            <v-img :src="image.urls.regular" class="img rounded-lg"></v-img>
            <div v-if="isLoggedIn" class="overlay">
              <ImageButton :image="image" />
            </div>
          </div>
        </template>
      </v-hover>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  padding: 0;
  
  /* Elimina el relleno (padding) del v-container */
}

.img {
  height: 100%;
}

.image-container {
  position: relative;
  height: 15em;
  margin: 0.5em;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Cambia el valor alpha para ajustar la intensidad del oscurecimiento */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.image-container:hover .overlay {
  opacity: 1;
}

.button-container {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
