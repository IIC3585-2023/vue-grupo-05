<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { computed } from "@vue/reactivity";
import PocketBase from "pocketbase";
const props = defineProps({
  image: Object,
});
const dialog = ref(false);
const authStore = useAuthStore();
const boards = computed(() => authStore.boards);
const pb = new PocketBase('https://pocketbase-docker-production.up.railway.app');
const saveImage = async (boardId, image) => {
  console.log("Guardando foto en tablero:", boardId, image);
  const record = await pb.collection('boardspictures').create({
    board: boardId,
    image,
  });
  dialog.value = false;
};
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="50vh">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" icon="mdi-pin" class="mt-2">
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">Tableros</v-card-title>
        <v-container class="d-flex flex-wrap overflow-auto container">
          <v-btn
            v-for="board in boards"
            :key="board.id"
            size="large"
            class="boardBtn rounded-lg m-auto"
            @click="saveImage(board.id, image)"
          >
            {{ board.name }}
          </v-btn>
        </v-container>
        <v-card-actions class="mt-auto">
          <v-btn color="primary" block @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>





<style scoped>
.text-center {
  top: 0;
  left: 0;
  width: 100%;
}

.container {
  width: 100%;
  height: 100%;
  gap: 0.5em;
}

.boardBtn {
  width: 100%;
  height: 10vh;
}
</style>
