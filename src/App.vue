<template>
  <v-app>
    <v-snackbar transition="scale-transition" top :color="snackbar.color" v-model="snackbar.show" timeout="3500">
      {{ snackbar.message }}
    </v-snackbar>
    <v-app-bar app color="#232762" dark>
      <v-toolbar-title><h4>PORTAL DE DECLARACION DE MEDICAMENTOS</h4></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <router-view />
  </v-app>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapState(['snackbar']),
  },
};
</script>
