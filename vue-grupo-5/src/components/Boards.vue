<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import PocketBase from "pocketbase";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const route = useRoute();
const { userId } = route.params;
const boards = ref([]);
const userName = ref("");
const boardName = ref("");
const router = useRouter();
const authStore = useAuthStore();
const currentUserId = authStore.id;
const goToBoard = (boardId) => {
  router.push(`/boards/${boardId}`);
};
const dialog = ref(false);
const createBoard = async () => {
  const data = {
    user: currentUserId,
    name: boardName.value,
  };
  const record = await pb.collection("boards").create(data);
  boards.value = await authStore.loadBoards();
  for (const board of boards.value) {
    board.image = await getFirstImage(board.id);
  }
};

const getFirstImage = async (boardId) => {
  try {
    const images = await pb
      .collection("boardspictures")
      .getFirstListItem(`board.id="${boardId}"`);
    return images.image.urls.regular;
  } catch (error) {
    return "";
  }
};
const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
onMounted(async () => {
  boards.value = await pb
    .collection("boards")
    .getFullList({ filter: `user.id="${userId}"`, sort: "" });
  for (const board of boards.value) {
    board.image = await getFirstImage(board.id);
  }
  userName.value = (
    await pb.collection("users").getFirstListItem(`id="${userId}"`)
  ).name;
});
</script>

<template>
  <h2 class="text-center">Tableros de {{ userName }}</h2>

  <div class="text-center">
    <v-dialog v-model="dialog" width="50vh">
      <template v-slot:activator="{ props }">
        <v-btn
          v-if="userId == currentUserId"
          color="primary"
          v-bind="props"
          icon="mdi-plus"
          class="mt-2"
        >
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">Añadir un tablero</v-card-title>
        <v-container>
          <v-form @submit.prevent="createBoard">
            <v-text-field
              v-model="boardName"
              label="Nombre del tablero"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary" @click="() => (dialog = false)"
              >Crear</v-btn
            >
          </v-form>
        </v-container>
        <v-card-actions class="mt-auto"> </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <v-container
    class="container d-flex justify-center align-self-center flex-wrap"
  >
    <div v-for="board in boards" class="d-flex">
      <v-card
        class="board d-flex justify-center align-center"
        :style="{
          backgroundColor: randomColor(),
        }"
        @click="goToBoard(board.id)"
        :key="board.id"
      >
        <v-img :src="board.image" cover class="background-image"></v-img>
        <div class="overlay d-flex align-center justify-center">
          <span class="title">{{ board.name }}</span>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}

.background-image {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.title {
  padding: 0.5em;
  width: 90%;
  text-align: center;
  color: black;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 0.5em;
}

.board {
  width: 20vh;
  height: 20vh;
  margin: 1em;
  cursor: pointer;
}
</style>
