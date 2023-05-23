<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Info</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">DC</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">AE</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 4" step="4">Signos</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 5" step="5">Vacunas</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 6" step="6">Hosp.</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="7">Reinfección</v-stepper-step>
      </v-stepper-header>

     <!--  <v-stepper-items>
        <v-stepper-content step="1">
          <InfoPersonal ref="infoPersonalRef" @save-info="onSaveData" />
        </v-stepper-content>

        <v-stepper-content step="2">
          <DatosClinicos ref="datosClinicosRef" @back="step--" @save-sintomas="onSaveData" />
        </v-stepper-content>

        <v-stepper-content step="3">
          <AntecedentesEp ref="antecedentesRef" @back="step--" @save-antecedentes="onSaveData" />
        </v-stepper-content>

        <v-stepper-content step="4">
          <Signos ref="signosRef" @back="step--" @save-signos="onSaveData" />
        </v-stepper-content>

        <v-stepper-content step="5">
          <Vacunas ref="vacunasRef" @back="step--" @save-vacunas="onSaveData" />
        </v-stepper-content>

        <v-stepper-content step="6">
          <Hospitalizacion ref="hospitalizacionRef" @back="step--" @save-hospitalizacion="onSaveData" />
        </v-stepper-content>

        <v-stepper-content step="7">
          <Reinfeccion ref="reinfeccionRef" @back="step--" @save-reinfeccion="onSaveReinfeccion" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper> -->

    <v-dialog v-model="dialog.confirmacion" max-width="500px" persistent>
      <v-card>
        <v-card-title>Aviso</v-card-title>
        <v-card-text>
          <v-alert outlined type="warning">
            Al enviar este documento, declaro bajo juramento que los datos contenidos en el mismo son fidedignos. <br>
            En caso este documento
            no sea enviado, no se podrá realizar la "Evaluación médica en la fecha programada"
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.confirmacion = false">CANCELAR</v-btn>
          <v-btn :loading="loading" color="primary" @click="guardar">GUARDAR FICHA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {setInteractionMode} from "vee-validate";
/* import DatosClinicos from "@/components/DatosClinicos";
import AntecedentesEp from "@/components/AntecedentesEp";
import Signos from "@/components/Signos";
import InfoPersonal from "@/components/InfoPersonal";
import Vacunas from "@/components/Vacunas";
import Hospitalizacion from "@/components/Hospitalizacion";
import Reinfeccion from "@/components/Reinfeccion"; */

setInteractionMode("aggressive");
export default {
  name: "NuevaFicha",
  components: {
   /*  Reinfeccion,
    Hospitalizacion, Vacunas, InfoPersonal, Signos, AntecedentesEp, DatosClinicos */},
  data() {
    return {
      step: 1,
      params: {},
      dialog: {
        confirmacion: false,
      },
      loading: false,
    }
  },
  methods: {
    onSaveData(data) {
      this.params = {
        ...this.params,
        ...data
      }
      this.step++
    },
    onSaveReinfeccion(data) {
      this.params = {
        ...this.params,
        ...data
      }
      this.dialog.confirmacion = true
    },
    guardar() {
      this.loading = true
      if (this.$route.params.id_ficha) {
        this.params.id_ficha = this.$route.params.id_ficha
        this.$store.dispatch('updateAtencion', this.params)
          .then(() => {
            this.loading = false
            this.$router.push("/fichas")
          }).catch(() => this.loading = false)
      } else {
        this.$store.dispatch('storeAtencion', this.params)
          .then(id => {
            this.loading = false
            this.$router.push("/fichas")
            window.open(`${process.env.VUE_APP_API_URL}/api/v1/fichaTemp/${id}/sticker`, '_blank')
          }).catch(() => this.loading = false)
      }
    },
  },
  watch: {
    step(currentStep) {
      switch (currentStep) {
        case 1: this.$refs.infoPersonalRef.scrollTop(); break;
        case 2: this.$refs.datosClinicosRef.scrollTop(); break;
        case 3: this.$refs.antecedentesRef.scrollTop(); break;
        case 4: this.$refs.signosRef.scrollTop(); break;
        case 5: this.$refs.vacunasRef.scrollTop(); break;
        case 6: this.$refs.hospitalizacionRef.scrollTop(); break;
        case 7: this.$refs.reinfeccionRef.scrollTop(); break;
      }
    }
  }
}
</script>

<style scoped>

</style>
