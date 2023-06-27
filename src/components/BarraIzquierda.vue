<template>
  <v-card class="mx-auto " max-width="300" elevation="0">
    <v-toolbar dense color="#232762" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <h5>DATOS DEL TRABAJADOR<!-- <v-btn class="mx-4"  x-small color="orange">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn> --></h5>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-img class="align-end" contain height="250" src="user.jpg">
      <v-card-actions>
        <!-- <v-btn class="mx-2" absolute :disabled="!editar" bottom right dark small color="#EF820F">
          <v-icon dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn> -->
      </v-card-actions>
    </v-img>
    <v-card-text>
      <v-text-field v-model="paciente.nombres" dense disabled label="NOMBRES"></v-text-field>
      <v-text-field v-model="apellidos" dense disabled label="APELLIDOS"></v-text-field>
      <v-row>
        <v-col> <v-text-field v-model="paciente.numero_documento" disabled dense label="DNI"></v-text-field></v-col>
        <v-col> <v-text-field v-model="paciente.nro_registro" :disabled="!editar" dense
            label="REGISTRO"></v-text-field></v-col>
      </v-row>
      <v-text-field v-model="paciente.celular" :disabled="!editar" dense label="CELULAR"></v-text-field>
      <v-text-field v-model="paciente.correo" :disabled="!editar" dense label="CORREO"></v-text-field>
      <v-text-field v-model="paciente.puesto" :disabled="!editar" dense label="PUESTO"></v-text-field>
      <v-row>
        <v-col>
          <v-text-field v-model="paciente.edad" readonly dense disabled label="EDAD"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="paciente.sexo" readonly dense disabled label="SEXO"></v-text-field>
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
    <v-card-text v-if="paciente.contactos_emergencia[0]">
      <v-text-field :disabled="!editar" dense v-model="paciente.contactos_emergencia[0].nombre_completo"
        label="NOMBRES"></v-text-field>
      <v-text-field :disabled="!editar" dense v-model="paciente.contactos_emergencia[0].parentesco"
        label="PARENTESCO"></v-text-field>
      <v-text-field :disabled="!editar" dense v-model="paciente.contactos_emergencia[0].celular"
        label="CELULAR"></v-text-field>
    </v-card-text>
    <v-card-text v-else>
      <v-text-field :disabled="!editar" v-model="contacto_nombres" dense label="NOMBRES"></v-text-field>
      <v-text-field :disabled="!editar" v-model="contacto_parentesco" dense label="PARENTESCO"></v-text-field>
      <v-text-field :disabled="!editar" v-model="contacto_celular" dense label="CELULAR"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="!editar" @click="editarPaciente()" outlined medium color="orange" dark>
        Editar
      </v-btn>
      <v-btn v-if="editar" @click="guardarPaciente()" outlined medium color="#232762" dark>
        Guardar
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'BarraDerecha',
  data: () => ({
    editar: false,
    contacto_nombres: null,
    contacto_parentesco: null,
    contacto_celular: null,
    nombre_completo: null,
    parentesco: null,
    celular: null,
  }),
  computed: {
    paciente() {
      return this.$store.state.paciente
    },
    apellidos() {
      return this.$store.getters.apellidos
    },
    contacto() {
      return this.$store.state.contacto
    }
  },
  methods: {
    editarPaciente() {
      this.editar = true
    },
    async guardarPaciente() {
      if (this.paciente.contactos_emergencia[0]) {
        this.nombre_completo = this.paciente.contactos_emergencia[0].nombre_completo
        this.parentesco = this.paciente.contactos_emergencia[0].parentesco
        this.celular = this.paciente.contactos_emergencia[0].celular

      }
      else {
        this.nombre_completo = this.contacto_nombres
        this.parentesco = this.contacto_parentesco
        this.celular = this.contacto_celular

      }
      const data = {
        id_paciente: this.paciente.idpacientes,
        nro_registro: this.paciente.nro_registro,
        celular: this.paciente.celular,
        puesto: this.paciente.puesto,
        nombre_contacto: this.nombre_completo,
        parentesco_contacto: this.parentesco,
        celular_contacto: this.celular,
      }
      await this.$store.dispatch('storeDatosPaciente', data);
      this.editar = false

    }
  }
}
</script>
  