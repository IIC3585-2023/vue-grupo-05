<script setup>
import { ref } from 'vue';
import PocketBase from 'pocketbase';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref(false);
const alertText = ref('');
const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const authStore = useAuthStore();
const router = useRouter();

async function login() {
  if (!email.value || !password.value) {
    error.value = true;
    alertText.value = 'Please fill out all fields';
    return;
  }
  const emailRegex = /.+@.+\..+/;
  if (!emailRegex.test(email.value)) {
    alertText.value = 'Please enter a valid email';
    error.value = true;
    return;
  }
  if (password.value.length < 8) {
    error.value = true;
    alertText.value = 'Password must be at least 8 characters';
    return;
  }

  try {
    const {token, record: {id}} = await pb.collection('users').authWithPassword(
      email.value,
      password.value,
    );
    authStore.login(token);
    router.push('/');
  } catch (e) {
    console.log(e);
    error.value = true;
    alertText.value = 'Failed to authenticate user';
    return;
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title class="display-1">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-alert
            v-if="error"
            type="error"
            dense
            outlined
          >
            {{alertText}}
          </v-alert>
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
