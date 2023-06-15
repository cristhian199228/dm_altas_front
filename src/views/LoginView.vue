<template>
  <div>
  <!--   <v-snackbar bottom right :value="updateExists" :timeout="-1" color="primary">
      An update is available
      <v-btn text @click="refreshApp">
        Update
      </v-btn>
    </v-snackbar> -->
    <v-col cols="12" offset-lg="2" offset-md="1" lg="8" md="10" sm="12" xs="12">
      <v-card outlined>
        <p class="display-1 mt-5 text-center">ISOS SALUD</p>
        <v-tabs>
          <v-tab exact to="/login">Peruanos</v-tab>
         <!--  <v-tab exact to="/login/extranjeros">Extranjeros</v-tab>
          <v-tab exact to="/login/invitados">Invitados</v-tab> -->
        </v-tabs>
        <router-view></router-view>
      </v-card>
    </v-col>
  </div>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
