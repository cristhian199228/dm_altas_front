<template>
  <div class="mt-2">
    <viewer :images="images" @inited="inited" class="viewer" ref="viewer">
      <img v-for="(src, i) in images" :src="src" :key="i" class="image" />
    </viewer>
    <v-row class="mx-2">
      <v-col cols="12" sm="2">
        <BarraIzquierda />
      </v-col>
        <v-col cols="12" sm="8">      
        <DeclaracionMedicamentos />
        <v-card color="grey lighten-4" flat height="200px" tile>
          <v-toolbar dense color="#1E286C" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title><h5>DECLARACION DE DESCANSOS MEDICOS</h5></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn id="v-step-0" fab @click="nuevaAtencion()" small color="#EF820F">
        <v-icon dark>
          mdi-plus
        </v-icon>
        </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-data-table :headers="headers" :items="atenciones" hide-default-footer class="elevation-1">
              <template v-slot:[`item.estado`]="{ item }">
                <v-chip v-if="item.estado == 0" small color="orange" dark>
                  EN PROCESO
                </v-chip>
                <v-chip v-if="item.estado == 1" small color="green" dark>
                  CERRADO
                </v-chip>
              </template>
              <template v-slot:[`item.f_inicio`]="{ item }">
                <div v-if="item.descansos_medicos">
                  -
                </div>
                <div v-else>
                  {{ item.descansos_medicos[0].fecha_inicio }}
                </div>
              </template>
              <template v-slot:[`item.f_fin`]="{ item }">
                <div v-if="item.descansos_medicos">
                  -
                </div>
                <div v-else>
                  {{ item.descansos_medicos[0].fecha_fin }}
                </div>
              </template>
              <template v-slot:[`item.descanso_medico`]="{ item }">
                <v-btn color="#6988C0" @click="abrirDialogSubirDescansoMedico(item.id)" small dark icon elevation="0">
                  <v-icon>mdi-cloud-upload-outline</v-icon>
                </v-btn>
                <v-btn v-if="item.descansos_medicos && item.descansos_medicos.length > 0" color="#6988C0"
                  @click="verFotos(item.descansos_medicos)" fab small icon dark elevation="0">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <template v-slot:[`item.evidencia`]="{ item }">
                <v-btn color="#6988C0" @click="abrirDialogEvidencias(item.id)" fab small dark icon elevation="0">
                  <v-icon>mdi-cloud-upload-outline</v-icon>
                </v-btn>
                <v-btn v-if="item.evidencias && item.evidencias.length > 0" color="#6988C0"
                  @click="verFotosEvidencia(item.evidencias)" fab small icon dark elevation="0">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <template v-slot:[`item.consentimiento`]="{ item }">
                <v-btn v-if="item.descansos_medicos[0] && item.descansos_medicos[0].consentimientos" color="#6988C0"
                  @click="abrirDialogPdfConsentimiento(item.descansos_medicos[0].consentimientos.id)" fab small dark icon
                  elevation="0">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn v-else color="#6988C0" :disabled="!item.descansos_medicos[0]"
                  @click="abrirDialogConsentimiento(item.id)" fab small icon elevation="0">
                  <v-icon>mdi-text-box-plus</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" sm="8">
       
      </v-col> -->
      <v-col cols="12" sm="2">
        <BarraDerecha />
      </v-col>
    </v-row>
    <DialogSubirDescansoMedico />
    <DialogConsentimiento />
    <DialogSubirEvidencias />
    <DialogSubirEvidenciasMedicamento />
    <DialogPdfConsentimiento ref="dialogPdf" />
    <v-tour name="myTour" :steps="steps">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step v-if="tour.steps[tour.currentStep]" :key="tour.currentStep" :step="tour.steps[tour.currentStep]"
            :previous-step="tour.previousStep" :next-step="tour.nextStep" :stop="tour.stop" :skip="tour.skip"
            :is-first="tour.isFirst" :is-last="tour.isLast" :labels="tour.labels">
            <template v-if="tour.currentStep === 0">
              <div slot="actions">
                <v-btn @click="tour.skip" x-small>
                  CERRAR TUTORIAL
                </v-btn>
              </div>
            </template>
            <template v-if="tour.currentStep === 1">
              <div slot="actions">
                <v-btn @click="tour.skip" class="mx-2" x-small>
                  CERRAR TUTORIAL
                </v-btn>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"
import DialogSubirDescansoMedico from '../components/DialogSubirDescansoMedico'
import DialogConsentimiento from '../components/DialogConsentimiento'
import DialogSubirEvidencias from '../components/DialogSubirEvidencias'
import DialogSubirEvidenciasMedicamento from '../components/DialogSubirEvidenciasMedicamento'
import DialogPdfConsentimiento from '@/components/DialogPdfConsentimiento.vue'
import BarraDerecha from '@/components/BarraDerecha.vue'
import BarraIzquierda from '@/components/BarraIzquierda.vue'
import DeclaracionMedicamentos from '@/components/DeclaracionMedicamentos.vue'
/* import AtencionDescansoMedicos from '@/components/AtencionDescansoMedicos.vue' */

export default {
  name: 'FichasView',
  components: {
    DialogSubirDescansoMedico,
    DialogConsentimiento,
    DialogSubirEvidencias,
    DialogSubirEvidenciasMedicamento,
    DialogPdfConsentimiento,
    Viewer,
    BarraDerecha,
    BarraIzquierda,
    DeclaracionMedicamentos,
    /* AtencionDescansoMedicos */
},
  data: () => ({
    myOptions: {
      useKeyboardNavigation: false,
      labels: {
        buttonSkip: 'Saltar tutorial',
        buttonPrevious: 'Anterior',
        buttonNext: 'Siguiente',
        buttonStop: 'Finalizar'
      }
    },
    headers: [
      { text: 'Fecha', align: 'center', sortable: false, value: 'created_at' },
      { text: 'Descanso Medico', align: 'center', value: 'descanso_medico' },
      { text: 'Consentimiento', align: 'center', value: 'consentimiento' },
      { text: 'Evidencias', align: 'center', value: 'evidencia' },
      { text: 'Estado', align: 'center', value: 'estado' },
    ],
    images: []
  }),
  methods: {
    inited(viewer) {
      this.$viewer = viewer
    },
    agregarAtencion() {
      const data = {
        id_paciente: this.$store.state.paciente.idpacientes
      }
      this.$store.dispatch('storeAtencion', data)
    },
    agregarMedicamento() {
      const data = {
        id_paciente: this.$store.state.paciente.idpacientes
      }
      this.$store.dispatch('storeMedicamento', data)
    },
    listarAtencion(id) {
      this.$store.dispatch('fetchAtencion', id)
      //console.log(this.$store.state.data)
    },
    listarMedicamento(id) {
      this.$store.dispatch('fetchMedicamentos', id)
      //console.log(this.$store.state.data)
    },
    abrirDialogSubirDescansoMedico(id) {
      this.$store.commit('SET_ATENCION_ID', id)
      this.$store.commit('SET_DIALOG_SUBIR_DESCANSO_MEDICO', true)
    },
    abrirDialogConsentimiento(id) {
      this.$store.commit('SET_ATENCION_ID', id)
      this.$store.commit('SET_DIALOG_CONSENTIMIENTO', true)
    },
    abrirDialogEvidencias(id) {
      this.$store.commit('SET_ATENCION_MEDICAMENTO_ID', id)
      this.$store.commit('SET_DIALOG_EVIDENCIAS', true)
    },
    abrirDialogPdfConsentimiento(id) {
      this.$store.commit('SET_CONSENTIMIENTO_ID', id)
      this.$refs.dialogPdf.onShowPdf(id)
      this.$store.commit('SET_DIALOG_PDF_CONSENTIMIENTO', true)
    },
    verFotos(fotos) {
      this.images = [];
      fotos.forEach(foto => {
        this.images.push(process.env.VUE_APP_API_URL + '/api/showdm/' + foto.ruta);
      });
      this.$viewer.show();
    },

  },
  computed: {
    atenciones() {
      return this.$store.state.data
    },
    steps() {
      return this.$store.state.steps
    }
  },
  created() {
    this.listarAtencion(this.$store.state.paciente.idpacientes)
    this.listarMedicamento(this.$store.state.paciente.idpacientes)
  },
  mounted() {
    this.$tours['myTour'].start()
  }
}
</script>
<style>
.image {
  display: none;
}
</style>