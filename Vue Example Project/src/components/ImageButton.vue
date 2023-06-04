<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" icon="mdi-pin"> </v-btn>
      </template>

      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped>
  .text-center {
    top:0;
    left:0;
  }
</style>
<script>
  export default {
    data() {
      return {
        dialog: false,
      }
    },
  }
</script>
