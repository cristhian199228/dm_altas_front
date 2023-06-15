<template>
  <v-card class="mx-auto " max-width="300" elevation="0">
    <v-toolbar dense color="#1E286C" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <h5>CONTACTOS SOPORTE MEDICO</h5>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-subtitle>
      En caso de dudas contactar al area medica a los siguientes numeros:
    </v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="transparent" class="mt-2">
              <v-card-title class="text-h6">
                CONTACTO 1
              </v-card-title>
              <v-card-subtitle>
                <p>Nro Telefonico:</p>
                <p>054(603066)</p>
              </v-card-subtitle>
            </v-card>
            <v-card color="transparent" class="mt-2">
              <v-card-title class="text-h6">
                CONTACTO 2
              </v-card-title>
              <v-card-subtitle>
             <!--    <p>Celular:</p>
                <p>947528209</p> -->
                <p>Correo</p>
                <p>dl.PE.altas@internationalsos.com</p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'BarraDerecha',
  data: () => ({
  }),
  computed: {
  },
  methods: {
  }
}
</script>
  