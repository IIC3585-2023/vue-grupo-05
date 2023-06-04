<script setup>
import { onMounted, ref } from 'vue';
import ImageButton from './ImageButton.vue';
const isHovering = ref(false);
const images = ref([]);
onMounted(async () => {
  const response = await fetch('https://picsum.photos/v2/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      
    },
  });
  images.value = await response.json();
  console.log(images.value);
});
</script>

<template>
  <v-container class="container d-flex justify-start flex-wrap">
      <div
        v-for="image in images.value"
        :key="image.id"
      >
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <div class="image-container rounded-lg" v-bind="props" ref="imageContainer">
            <v-img
              :src="image.url"
              class="img rounded-lg"
            ></v-img>
            <div class="overlay">
              <ImageButton />
            </div>
          </div>
        </template>
        </v-hover>
      </div>
  </v-container>
</template>
<style scoped>
.container {
  padding: 0; /* Elimina el relleno (padding) del v-container */
}
.img {
  height: 100%;
}
.test {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.test:hover {
  opacity: 1;
}
.image-container {
  position: relative;
  height: 30vh;
  margin: 0.5em;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cambia el valor alpha para ajustar la intensidad del oscurecimiento */
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