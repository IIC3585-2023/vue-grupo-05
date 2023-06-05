<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref(false);
const alertText = ref("");

const authStore = useAuthStore();
const router = useRouter();

async function register() {
  if (
    !email.value ||
    !name.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    error.value = true;
    alertText.value = "Please fill out all fields";
    return;
  }
  const emailRegex = /.+@.+\..+/;
  if (!emailRegex.test(email.value)) {
    alertText.value = "Please enter a valid email";
    error.value = true;
    return;
  }
  if (name.value.length < 3) {
    error.value = true;
    alertText.value = "Name must be at least 3 characters";
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = true;
    alertText.value = "Passwords do not match";
    return;
  }
  if (password.value.length < 6) {
    error.value = true;
    alertText.value = "Password must be at least 6 characters";
    return;
  }

  try {
    await authStore.register(
      email.value,
      name.value,
      password.value,
      confirmPassword.value
    );
    router.push("/feed");
    return;
  } catch (e) {
    console.log(e);
    error.value = true;
    alertText.value = "Failed to create user";
    return;
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title class="display-1">Crear una cuenta</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field v-model="name" label="Nombre" required></v-text-field>
          <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
          <v-text-field v-model="confirmPassword" label="Confirmar Contraseña" type="password" required></v-text-field>
          <v-alert v-if="error" type="error" dense outlined>
            {{ alertText }}
          </v-alert>
          <v-btn type="submit" color="primary">Registrarse</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
