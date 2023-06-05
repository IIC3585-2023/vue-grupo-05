<script setup>
import { onMounted, ref } from "vue";
import ImageList from "./ImageList.vue";
const images = ref([]);
onMounted(async () => {
  let response;
  try {
    response = await fetch(
      "https://api.unsplash.com/photos?per_page=20&client_id=yA6WWENZgBuiWAt9TOFlUXFHAN0iWOCMkzaRnlFq_XA",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
  images.value = await response.json();
});
</script>

<template>
  <ImageList :images="images" />
</template>
