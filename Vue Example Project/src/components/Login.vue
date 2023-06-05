<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref(false);
const alertText = ref("");

const authStore = useAuthStore();
const router = useRouter();

async function login() {
  if (!email.value || !password.value) {
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
  if (password.value.length < 8) {
    error.value = true;
    alertText.value = "Password must be at least 8 characters";
    return;
  }

  try {
    await authStore.login(email.value, password.value);
    router.push("/feed");
  } catch (e) {
    console.log(e);
    error.value = true;
    alertText.value = "Failed to authenticate user";
    return;
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title class="display-1">Iniciar Sesión</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            required
          ></v-text-field>
          <v-alert v-if="error" type="error" dense outlined>
            {{ alertText }}
          </v-alert>
          <v-btn type="submit" color="primary">Iniciar Sesión</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
