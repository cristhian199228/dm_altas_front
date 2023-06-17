<template>
  <v-app>
    <v-snackbar transition="scale-transition" top :color="snackbar.color" v-model="snackbar.show" timeout="3500">
      {{ snackbar.message }}
    </v-snackbar>
    <v-app-bar app color="#232762" dark>
      <v-toolbar-title><h4>ISOS -SALUD -</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
      @click="salir()"
              icon
              dark
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
    </v-app-bar>
    <v-main>
    <router-view />
    </v-main>
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
  methods: {
    salir() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch(() => { })
    }
  }
};
</script>
