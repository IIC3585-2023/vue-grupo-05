import { defineStore } from "pinia";
import { ref } from "vue";
import jwt_decode from "jwt-decode";
import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const id = ref(null);
  const boards = ref([]);
  if (localStorage.getItem("boards")) {
    boards.value = JSON.parse(localStorage.getItem("boards"));
  }
  if (token.value) {
    const { id: _id } = jwt_decode(token.value);
    id.value = _id;
  }

  const login = async (email, password) => {
    const { token: newToken } = await pb
      .collection("users")
      .authWithPassword(email, password);
    token.value = newToken;
    const { id: _id } = jwt_decode(newToken);
    id.value = _id;
    localStorage.setItem("token", newToken);
    await loadBoards();
  };

  const register = async (email, name, password, passwordConfirm) => {
    const record = await pb.collection("users").create({
      email,
      name,
      password,
      passwordConfirm,
    });
    await login(email, password);
  };

  const logout = () => {
    token.value = null;
    id.value = null;
    boards.value = [];
    localStorage.removeItem("token");
    localStorage.removeItem("boards");
  };

  const loadBoards = async () => {
    const response = await pb
      .collection("boards")
      .getFullList({ filter: `user.id="${id.value}"`, sort: "-created" });
    boards.value = response.map((board) => ({
      id: board.id,
      name: board.name,
    }));
    localStorage.setItem("boards", JSON.stringify(boards.value));
    return boards.value;
  };

  return {
    token,
    id,
    boards,
    login,
    register,
    logout,
    loadBoards,
  };
});
