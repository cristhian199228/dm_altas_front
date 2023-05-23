<template>
  <v-app>
    <v-app-bar app color="#232762" dark>
      <v-toolbar-title>PORTAL DE DESCANSOS MEDICOS</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <router-view />
  </v-app>
</template>
<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
