<template>
  <v-card class="mx-auto " max-width="300" elevation="0">
    <v-toolbar dense color="#232762" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <h5>DATOS DEL TRABAJADOR<v-btn class="mx-4"  x-small color="orange">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn></h5>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-img class="align-end" contain height="250" src="user.jpg">
      <v-card-actions>
        <v-btn class="mx-2" absolute bottom right dark small color="#EF820F">
          <v-icon dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-img>
    <v-card-text>
      <v-text-field v-model="paciente.nombres" dense readonly label="NOMBRES"></v-text-field>
      <v-text-field v-model="apellidos" dense readonly label="APELLIDOS"></v-text-field>
      <v-row>
        <v-col> <v-text-field v-model="paciente.numero_documento" readonly dense label="DNI"></v-text-field></v-col>
        <v-col> <v-text-field v-model="paciente.nro_registro" readonly dense label="REGISTRO"></v-text-field></v-col>
      </v-row>
      <v-text-field v-model="paciente.celular" dense label="CELULAR"></v-text-field>
      <v-text-field v-model="paciente.puesto" dense readonly label="PUESTO"></v-text-field>
      <v-row>
        <v-col>
          <v-text-field v-model="paciente.edad" readonly dense label="EDAD"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="paciente.sexo" readonly dense label="SEXO"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-toolbar dense color="#232762" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <h5>CONTACTO DE EMERGENCIA</h5>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-text-field dense label="NOMBRES"></v-text-field>
      <v-text-field dense label="PARENTESCO"></v-text-field>
      <v-text-field dense label="CELULAR"></v-text-field>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined medium color="#232762" >
        Editar
      </v-btn>
      <v-btn outlined medium color="orange" dark>
        Guardar
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions> -->
  </v-card>
</template>
<script>
export default {
  name: 'BarraDerecha',
  data: () => ({
  }),
  computed: {
    paciente() {
      return this.$store.state.paciente
    },
    apellidos() {
      return this.$store.getters.apellidos
    }
  },
  methods: {
  }
}
</script>
  