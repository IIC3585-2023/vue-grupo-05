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

<script>
export default {
  data() {
    return {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      error: false,
      alertText: ''
    };
  },
  methods: {
    register() {
      if (!this.email || !this.name || !this.password || !this.confirmPassword) {
        this.error = true;
        this.alertText = 'Please fill out all fields';
        return;
      }
      const emailRegex = /.+@.+\..+/;
      if (!emailRegex.test(this.email)) {
        this.alertText = 'Please enter a valid email';
        this.error = true;
        return;
      }
      if (this.name.length < 3) {
        this.error = true;
        this.alertText = 'Name must be at least 3 characters';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = true;
        this.alertText = 'Passwords do not match';
        return;
      }
      if (this.password.length < 6) {
        this.error = true;
        this.alertText = 'Password must be at least 6 characters';
        return;
      }
      
      // Passwords match, continue with login logic
      const userData = {
        email: this.email,
        name: this.name,
        password: this.password
      };
      
      // Example: log the user data to the console
      console.log(userData);
      
      // Clear the form fields
      this.email = '';
      this.name = '';
      this.password = '';
      this.confirmPassword = '';
      this.error = false;
    }
  }
};
</script>

