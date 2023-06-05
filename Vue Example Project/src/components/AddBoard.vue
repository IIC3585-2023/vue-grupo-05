<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRoute } from "vue-router";
import PocketBase from "pocketbase";
const dialog = ref(false);
const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const route = useRoute();

const props = defineProps({
  boards : Array,
});
const { userId } = route.params;
const authStore = useAuthStore();
const currentUserId = authStore.id;
const boardName = ref("");
const createBoard = async () => {
  const data = {
    user: currentUserId,
    name: boardName.value,
  };
  const record = await pb.collection("boards").create(data);
  boards.value = await authStore.loadBoards();
};
</script>

<template>
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

</template>