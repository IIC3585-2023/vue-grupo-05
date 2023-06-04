import { defineStore } from "pinia";
import { ref } from "vue";
import jwt_decode from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const id = ref(null);
  if (token.value) {
    const { id: _id } = jwt_decode(token.value);
    id.value = _id;
  }

  const login = (jwt) => {
    token.value = jwt;
    const { id: _id } = jwt_decode(jwt);
    id.value = _id;

    localStorage.setItem("token", jwt);
  }

  const logout = () => {
    token.value = null;
    id.value = null;
  }

  return {
    token,
    id,
    login,
    logout
  };
});
