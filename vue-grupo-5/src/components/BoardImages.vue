<script setup>
import { onMounted, ref } from "vue";
import PocketBase from "pocketbase";
import { useRoute } from "vue-router";
import ImageList from "./ImageList.vue";
const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const route = useRoute();
const { boardId } = route.params;
const boardName = ref("");
const images = ref([]);
onMounted(async () => {
  boardName.value = (
    await pb.collection("boards").getFirstListItem(`id="${boardId}"`)
  ).name;
  const data = await pb
    .collection("boardspictures")
    .getFullList({ filter: `board="${boardId}"`, sort: "-created" })
  images.value = data.map(record => record.image)
  console.log(images.value);
});

</script>
<template>
    <h1 class="text-center">
      {{ boardName }}
    </h1>
    <ImageList :images="images" />
</template>
