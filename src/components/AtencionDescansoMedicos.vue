<template>
  <v-card color="grey lighten-4" flat tile>
    <viewer :images="images" @inited="inited" class="viewer" ref="viewer">
      <img v-for="(src, i) in images" :src="src" :key="i" class="image" />
    </viewer>
    <v-toolbar dense color="#1E286C" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <h5>ATENCION DE DESCANSOS MEDICOS</h5>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn id="v-step-0" fab @click="nuevaAtencion()" small color="#EF820F">
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-data-table :headers="headers_medicamentos" :items="medicamentos" hide-default-footer  id="v-step-1"
        class="elevation-1">
        <template v-slot:[`item.estado`]="{ item }">
          <v-chip v-if="item.estado == 0" small color="orange" dark>
            EN REVISIÓN
          </v-chip>
          <v-chip v-if="item.estado == 1" small color="green" dark>
            REVISADO
          </v-chip>
        </template>
        <template v-slot:[`item.evidencia`]="{ item }">
          <v-btn color="#6988C0" @click="abrirDialogEvidenciasMedicamento(item.id)" fab small dark icon elevation="0">
            <v-icon>mdi-cloud-upload-outline</v-icon>
          </v-btn>
          <v-btn v-if="item.evidencias && item.evidencias.length > 0" color="#6988C0"
            @click="verFotosEvidencia(item.evidencias)" fab small icon dark elevation="0">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
        <!--    <template v-slot:[`item.certificado`]="{ item }">
          <v-btn color="#6988C0" disabled @click="abrirDialogConsentimiento(item.id)" fab small icon elevation="0">
            <v-icon>mdi-text-box-plus</v-icon>
          </v-btn>
        </template> -->
        <template v-slot:[`item.medicamentos`]="{ item }">
          <v-btn  v-if="item.estado == 0" color="#6988C0" fab small @click="abrirDialogAgregarMedicamento(item.id)" icon elevation="0">
            <v-icon>mdi-medical-cotton-swab</v-icon>
          </v-btn>
          <v-btn  v-if="item.estado == 1" color="#6988C0" disabled fab small @click="abrirDialogAgregarMedicamento(item.id)" icon elevation="0">
            <v-icon>mdi-medical-cotton-swab</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <!-- <v-speed-dial v-model="fab" fixed bottom right fab dark>
        <template v-slot:activator>
          <v-btn v-model="fab" color="#EF820F" dark fab id="v-step-0">
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab dark small color="red" v-bind="attrs" v-on="on" @click="agregarMedicamento()">
              <v-icon>mdi-medication</v-icon>
            </v-btn>
          </template>
          <span>Medicamento</span>
        </v-tooltip>
      </v-speed-dial> -->
    </v-card-text>
    <DialogAgregarMedicamento />

  </v-card>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"
import DialogAgregarMedicamento from './DialogAgregarMedicamento.vue'
export default {
  name: 'DeclaracionMedicamentos',
  components: {
    Viewer,
    DialogAgregarMedicamento
  },
  data: () => ({

    images: [],
    fab: false,
    headers_medicamentos: [
      { text: 'Fecha', align: 'center', sortable: false, value: 'created_at' },
      /*  { text: 'Certificado', align: 'center', value: 'certificado' }, */

      { text: 'Medicamento', align: 'center', value: 'medicamentos' },
     /*  { text: 'Evidencias', align: 'center', value: 'evidencia' }, */
      { text: 'Estado', align: 'center', value: 'estado' },
    ],
  }),
  computed: {
    medicamentos() {
      return this.$store.state.medicamentos
    },
    steps() {
      return this.$store.state.steps
    }
  },

  methods: {
    nuevaAtencion() {
      this.$tours['myTour'].nextStep();
      const data = {
        id_paciente: this.$store.state.paciente.idpacientes
      }
      this.$store.dispatch('storeMedicamento', data)
    },
    inited(viewer) {
      this.$viewer = viewer
    },
    abrirDialogEvidenciasMedicamento(id) {
      console.log('seee')
      this.$store.commit('SET_ATENCION_MEDICAMENTO_ID', id)
      this.$store.commit('SET_DIALOG_EVIDENCIAS_MEDICAMENTO', true)
    },
    verFotosEvidencia(fotos) {
      this.images = [];
      fotos.forEach(foto => {
        this.images.push(process.env.VUE_APP_API_URL + '/api/showImagen/' + foto.ruta);
      });
      this.$viewer.show();
    },
    abrirDialogAgregarMedicamento(id) {
      this.$tours['myTour'].skip()
      this.$store.commit('SET_ATENCION_MEDICAMENTO_ID', id)
      this.$store.commit('SET_DIALOG_AGREGAR_MEDICAMENTO', true)
    }
  },
  mounted() {

  }
}
</script>
  