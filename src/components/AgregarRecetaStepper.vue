<template>
  <v-card class="mb-12" height="200px" elevation="0">
    <v-card-text v-if="tablaMedicamentosTieneReceta < tablaMedicamentosTieneTotal && tablaMedicamentosTieneReceta !== 0">
      USTED ESTA TOMANDO MEDICAMENTOS CON RECETA Y SIN RECETA EL SOPORTE MEDICO SE CONTACTARA CON USTED PARA DARLE
      INDICACIONES
    </v-card-text>
    <v-card-text v-if="tablaMedicamentosTieneReceta < tablaMedicamentosTieneTotal && tablaMedicamentosTieneReceta == 0 ">
      USTED ESTA TOMANDO MEDICAMENTOS SIN RECETA ,EL SOPORTE MEDICO SE CONTACTARA CON USTED PARA DARLE
      INDICACIONES
    </v-card-text>
    <v-card-text v-if="tablaMedicamentosTieneReceta == tablaMedicamentosTieneTotal">
      SUS MEDICAMENTOS Y RECETAS HAN SIDO RECIBIDOS , EL AREA MEDICA SE PONDRA EN CONTACTO CON USTED PARA COORDINAR LOS
      SIGUIENTES PASOS.
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      radios: false,
    }
  },
  watch: {
    radios() {

    }
  },
  computed: {
    medicamentos() {
      return this.$store.state.medicamentos
    },
    validadoTieneEvidencias() {
      return this.$store.state.validadoTieneEvidencias
    },
    tablaMedicamentosTieneReceta: {
      get() { return this.$store.state.tablaMedicamentosTieneReceta },
      set(val) { this.$store.commit('SET_TABLA_MEDICAMENTOS_TIENE_RECETA', val) }
    },
    tablaMedicamentosTieneTotal: {
      get() { return this.$store.state.tablaMedicamentosTieneTotal },
      set(val) { this.$store.commit('SET_TABLA_MEDICAMENTOS_TIENE_TOTAL', val) }
    },
  },
  methods: {
  },
}
</script>