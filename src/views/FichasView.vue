<template>
  <v-main class="grey lighten-3 mt-4">

    <v-row class="mx-2">
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="320">
          <v-card class="mx-auto " max-width="300" elevation="0">
            <v-toolbar dense color="#232762" dark>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <h5>DATOS DEL TRABAJADOR</h5>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-img class="align-end" contain height="250" src="user.jpg">
              <v-card-actions>
                <v-btn class="mx-2" absolute bottom right dark small color="#EF820F">
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-img>


            <v-card-text>
              <v-text-field v-model="paciente.nombres" dense readonly label="NOMBRES"></v-text-field>
              <v-text-field v-model="apellidos" dense readonly label="APELLIDOS"></v-text-field>
              <v-row>
                <v-col> <v-text-field v-model="paciente.numero_documento" readonly dense
                    label="DNI"></v-text-field></v-col>
                <v-col> <v-text-field v-model="paciente.nro_registro" readonly dense
                    label="REGISTRO"></v-text-field></v-col>
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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined medium color="#232762" dark>
                Guardar
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">

        <v-sheet min-height="70vh" rounded="lg">

          <v-card color="grey lighten-4" flat height="200px" tile>

            <v-toolbar dense color="#1E286C" dark>

              <v-spacer></v-spacer>
              <v-toolbar-title>LISTADO DE ATENCIONES</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>

              <v-data-table :headers="headers" :items="atenciones" class="elevation-1">
                <template v-slot:[`item.calories`]="{ item }">
                  <v-chip small :color="getColor(item.calories)" dark>
                    {{ item.calories }}
                  </v-chip>
                </template>
                <template v-slot:[`item.descanso_medico`]="{}">
                  <v-btn color="#6988C0" fab x-small dark elevation="0">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <template v-slot:[`item.evidencia`]="{}">
                  <v-btn color="#6988C0" fab x-small dark elevation="0">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <template v-slot:[`item.consentimiento`]="{}">
                  <v-btn color="#6988C0" fab x-small dark elevation="0">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
              <v-btn color="#EF820F" @click="agregarAtencion()" fixed bottom right fab
                dark><v-icon>mdi-plus</v-icon></v-btn>

            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <v-card class="mx-auto " max-width="300" elevation="0">
            <v-toolbar dense color="#1E286C" dark>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <h5>CONTACTOS DE EMERGENCIA</h5>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <v-card color="transparent" class="mt-2">
                    <v-card-title class="text-h6">
                      CONTACTO SALUD OCUPACIONAL
                    </v-card-title>
                    <v-card-subtitle>
                      <p>Celular:</p>
                      <p>961498695</p>
                      <p>Correo</p>
                      <p>prueba@internationalsos.com</p>
                    </v-card-subtitle>
                  </v-card>
                  <v-card color="transparent" class="mt-2">
                    <v-card-title class="text-h6">
                      CONTACTO SALUD OCUPACIONAL
                    </v-card-title>
                    <v-card-subtitle>
                      <p>Celular:</p>
                      <p>961498695</p>
                      <p>Correo</p>
                      <p>prueba@internationalsos.com</p>
                    </v-card-subtitle>
                  </v-card>
                  <v-card color="transparent" class="mt-2">
                    <v-card-title class="text-h6">
                      CONTACTO SALUD OCUPACIONAL
                    </v-card-title>
                    <v-card-subtitle>
                      <p>Celular:</p>
                      <p>961498695</p>
                      <p>Correo</p>
                      <p>prueba@internationalsos.com</p>
                    </v-card-subtitle>
                  </v-card>

                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-sheet>
      </v-col>
    </v-row>

  </v-main>
</template>

<script>
export default {
  name: 'FichasView',
  data: () => ({
    headers: [
      { text: 'F.Inicio', align: 'center', sortable: false, value: 'name' },
      { text: 'F.Fin', align: 'center', value: 'f_fin' },
      { text: 'Descanso Medico', align: 'center', value: 'descanso_medico' },
      { text: 'Consentimiento', align: 'center', value: 'consentimiento' },
      { text: 'Evidencias', align: 'center', value: 'evidencia' },
      { text: 'Estado', align: 'center', value: 'estado' },
    ],
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
  methods: {
    getColor(calories) {
      if (calories == "0") return 'orange'
      else if (calories == "1") return 'green'
      else return 'orange'
    },
    agregarAtencion(id) {
      this.$store.dispatch('storeAtencion', id)
    },
    listarAtencion(id) {
      this.$store.dispatch('fetchAtencion', id)
      //console.log(this.$store.state.data)
    }
  },
  computed: {
    paciente() {
      return this.$store.state.paciente
    },
    apellidos() {
      return this.$store.getters.apellidos
    },
    atenciones() {
      return this.$store.state.data
    }
  },
  created() {
    this.listarAtencion(this.$store.state.paciente.idpacientes)
  }
}
</script>