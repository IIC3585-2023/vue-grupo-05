<script setup>
import { ref } from 'vue';
import PocketBase from 'pocketbase';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
const email = ref('');
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref(false);
const alertText = ref('');
const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const authStore = useAuthStore();
const router = useRouter();

async function register() {
  if (!email.value || !name.value || !password.value || !confirmPassword.value) {
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
  if (name.value.length < 3) {
    error.value = true;
    alertText.value = 'Name must be at least 3 characters';
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = true;
    alertText.value = 'Passwords do not match';
    return;
  }
  if (password.value.length < 6) {
    error.value = true;
    alertText.value = 'Password must be at least 6 characters';
    return;
  }
  

  try {
    const record = await pb.collection('users').create({
    email: email.value,
    name: name.value,
    password: password.value,
    passwordConfirm: confirmPassword.value,
    });
    const {token, record: {id}} = await pb.collection('users').authWithPassword(
      email.value,
      password.value,
    );
    authStore.login(token);
    router.push('/');
  } catch (e) {
    console.log(e);
    error.value = true;
    alertText.value = 'Failed to create user';
    return;
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title class="display-1">Create an account</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
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
          <v-btn type="submit" color="primary">Register</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
