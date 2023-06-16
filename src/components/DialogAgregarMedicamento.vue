<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar dark color="#1E286C">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>AGREGAR MEDICAMENTO</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col>
            <v-card class="my-2" elevation="0">
              <v-card-subtitle>
                NUEVO MEDICAMENTO
                <v-spacer></v-spacer>
              </v-card-subtitle>
              <v-card-text>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">
                      Medicamento
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2">
                      Validación
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3">
                      Anotaciones
                    </v-stepper-step>
                  </v-stepper-header>
                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <AgregarMedicamentoStepper />
                      <v-card transparent>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" :disabled="!validadoMedicamentos" @click="e1 = 2">
                            Siguiente
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                      <AgregarRecetaStepper />
                      <v-card>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="e1 = 1">
                            Anterior
                          </v-btn>
                          <v-btn color="primary" @click="e1 = 3">
                            Siguiente
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                      <AgregarObservacionesStepper />
                      <v-card>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="e1 = 2">
                            Anterior
                          </v-btn>
                          <v-btn color="primary" @click="cerrarDialogMedicamentos()">
                            Guardar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import AgregarMedicamentoStepper from './AgregarMedicamentoStepper.vue'
import AgregarObservacionesStepper from './AgregarObservacionesStepper.vue';
import AgregarRecetaStepper from './AgregarRecetaStepper.vue';
export default {
  data() {
    return {
      radios: "false",
      e1: 1,
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    validadoTieneEvidencias: function (newValue) {
      console.log(newValue)
      if (newValue == true && this.validadoRequiereReceta == true) this.validadoMedicamentos = true
    },
  },
  computed: {
    dialog() {
      return this.$store.state.dialogAgregarMedicamento;
    },
    validadoMedicamentos: {
      get() { return this.$store.state.validadoMedicamentos },
      set(val) { this.$store.commit('SET_VALIDADO_MEDICAMENTOS', val) }
    },
    validadoTieneEvidencias() {
      return this.$store.state.validadoTieneEvidencias
    },
    validadoRequiereReceta: {
      get() { return this.$store.state.validadoRequiereReceta },
      set(val) { this.$store.commit('SET_VALIDADO_REQUIERE_RECETA', val) }
    },
    tablaMedicamentosTieneTotal: {
      get() { return this.$store.state.tablaMedicamentosTieneTotal},
      set(val) { this.$store.commit('SET_TABLA_MEDICAMENTOS_TIENE_TOTAL', val) }
    },
  },
  methods: {
    close() {
      this.$store.commit("SET_DIALOG_AGREGAR_MEDICAMENTO", false);
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0)
        this.friends.splice(index, 1);
    },
    cerrarDialogMedicamentos() {
      this.$store.commit("SET_DIALOG_AGREGAR_MEDICAMENTO", false);
      this.$store.commit('SHOW_SUCCESS_SNACKBAR', 'Los medicamentos se guardaron exitosamente,')
      this.e1 = 1;
    }
  },
  async mounted() {
    if (this.validadoTieneEvidencias && this.tablaMedicamentosTieneTotal >0 ) this.validadoMedicamentos = true
  },
  components: { AgregarMedicamentoStepper, AgregarRecetaStepper, AgregarObservacionesStepper }
}
</script>