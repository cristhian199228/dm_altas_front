<template>
  <v-card class="mb-12" elevation="0">
    <viewer :images="images" @inited="inited" class="viewer" ref="viewer">
      <img v-for="(src, i) in images" :src="src" :key="i" class="image" />
    </viewer>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          Introduzca el nombre del medicamento ,si el medicamento no se encuentra en la lista presione Agregar.
          <v-row>
            <v-col cols="12" sm="10">
              <v-autocomplete v-model="medicamento_seleccionado" :loading="loading" :items="medicamentos"
                :search-input.sync="search" item-text="descripcion" item-value="id" cache-items
                prepend-icon="mdi-medication" class="" flat hide-no-data label="Medicamento">
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn color="primary" @click="agregarMedicamento()">
                Agregar
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="10">
              <v-file-input :disabled="!validadoRequiereReceta" show-size ref="photo" label="Adjuntar Receta" class=""
                accept="image/*,.pdf" @change="seleccionarFoto" v-model="foto">
              </v-file-input>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn color="primary" :disabled="!validadoRequiereReceta" @click="upload()">
                SUBIR
              </v-btn>
              <div v-if="medicamentosEvidencia[0].evidencias.length > 0">
                <v-btn color="#6988C0" @click="verFotosEvidencia(medicamentosEvidencia[0].evidencias)" fab small icon dark
                  elevation="0">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn color="#6988C0" @click="verFotosEvidencia(medicamentosEvidencia[0].evidencias)" fab small icon dark
                  elevation="0">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card-subtitle>
            LISTADO DE MEDICAMENTOS
            <v-spacer></v-spacer>
          </v-card-subtitle>
          <v-data-table hide-default-footer :headers="headers" :items="tablamedicamentos" class="elevation-3">
            <template v-slot:[`item.actions`]="{ item }">
              <!--   <v-icon small class="mr-2">
                mdi-pencil
              </v-icon> -->
              <v-icon small @click="eliminarMedicamento(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              Ningun medicamento ha sido agregado
            </template>
            <template v-slot:[`item.pivot.tiene_receta`]="{ item }">
              <v-switch v-model="item.pivot.tiene_receta" @change="cambiarTieneReceta(item)" inset small></v-switch>
            </template>
            <template v-slot:[`item.descripcion`]="{ item }">
              <div v-if="item.reportable == 1">
                {{ item.descripcion }} <v-chip class="ma-2" color="green" outlined>
                  NO REPORTABLE
                </v-chip>
              </div>
              <div v-else>
                {{ item.descripcion }}
              </div>
            </template>
          </v-data-table>
          <div class="mt-4">
            <span class="mt-4">NO REPORTABLE: El consumo de este medicamento no impacta en sus actividades
              regulares.</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"
export default {
  components: {
    Viewer,
  },
  data() {
    return {
      images: [],
      foto: null,
      medicamento_string: null,
      switch1: 'SI',
      search: null,
      medicamento_seleccionado: null,
      loading: false,
      headers: [
        {
          text: "Medicamento",
          align: "start",
          sortable: false,
          value: "descripcion",
        },
        { text: "Tiene Receta", value: "pivot.tiene_receta", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      contador_receta: 0
    }
  },
  watch: {
    search(val) {
      if (val.length > 2) {
        this.loading = true
        const data = {
          valor: val
        };
        this.$store.dispatch('searchMedicamentos', data)
        this.loading = false
        this.medicamento_string = val
      }
    },
    tablamedicamentos: function (newValue) {
      this.contador_receta = 0
      this.validadoRequiereReceta = false
      let me = this;
      newValue.forEach(function (element) {
        if (element.pivot.tiene_receta == 1) {
          me.contador_receta++
        }
      });
      if (me.contador_receta > 0) {
        me.validadoRequiereReceta = true
      }
      this.tablaMedicamentosTieneReceta = me.contador_receta
      this.tablaMedicamentosTieneTotal = newValue.length
      /* if (me.contador_receta == 0) {
        me.validadoMedicamentos = false
      } */
    },

  },
  computed: {
    medicamentos() {
      return this.$store.state.medicamentosBusqueda;
    },
    medicamentosEvidencia() {
      return this.$store.state.medicamentos;
    },
    tablamedicamentos() {
      return this.$store.state.tablaMedicamentos
    },
    photo() {
      return this.$store.state.photo_medicamento
    },
    tablaMedicamentosTieneReceta: {
      get() { return this.$store.state.tablaMedicamentosTieneReceta },
      set(val) { this.$store.commit('SET_TABLA_MEDICAMENTOS_TIENE_RECETA', val) }
    },
    tablaMedicamentosTieneTotal: {
      get() { return this.$store.state.tablaMedicamentosTieneTotal},
      set(val) { this.$store.commit('SET_TABLA_MEDICAMENTOS_TIENE_TOTAL', val) }
    },
   /*  tablaMedicamentosTieneReceta() {
      return this.$store.state.tablaMedicamentosTieneReceta
    },
    tablaMedicamentosTieneTotal() {
      return this.$store.state.tablaMedicamentosTieneTotal
    }, */
    validadoMedicamentos: {
      get() { return this.$store.state.validadoMedicamentos },
      set(val) { this.$store.commit('SET_VALIDADO_MEDICAMENTOS', val) }
    },
    validadoRequiereReceta: {
      get() { return this.$store.state.validadoRequiereReceta },
      set(val) { this.$store.commit('SET_VALIDADO_REQUIERE_RECETA', val) }
    },
    validadoTieneEvidencias() {
      return this.$store.state.validadoTieneEvidencias
    },
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer
    },
    seleccionarFoto(e) {
      this.$store.commit('SET_PHOTO_MEDICAMENTO', e);
    },
    regresar() {
      this.dialog = false;
    },
    upload() {
      if (this.photo) {
        this.$store.dispatch('uploadEvidenciasMedicamento');
      } else {
        const snackbar = {
          show: true,
          color: 'error',
          message: 'Por favor seleccione un archivo!'
        };
        this.$store.commit('SHOW_SNACKBAR', snackbar);
      }
      this.foto = []
    },
    agregarMedicamento() {
      console.log()
      const data = {
        medicamento_string: this.medicamento_string,
        id_atencion: this.$store.state.atencion_medicamento_id,
        id_medicamento: this.medicamento_seleccionado
      }
      this.$store.dispatch('agregarMedicamentoAtencion', data)
      this.medicamento_seleccionado = null
    },
    eliminarMedicamento(item) {
      const data = {
        id_medicamento: item.pivot.medicamento_id,
        id_atencion: item.pivot.atencion_medicamento_id
      }
      this.$store.dispatch('eliminarMedicamento', data)
    },
    verFotosEvidencia(fotos) {
      this.images = [];
      fotos.forEach(foto => {
        this.images.push(process.env.VUE_APP_API_URL + '/api/showImagen/' + foto.ruta);
      });
      this.$viewer.show();
    },
    cambiarTieneReceta(val) {
      const data = {
        id_medicamento: val.id,
        id_atencion: val.pivot.atencion_medicamento_id,
        tiene_receta: val.pivot.tiene_receta
      }
      this.$store.dispatch('cambiarTieneReceta', data)
      //console.log(this.tablamedicamentos)


      /*  if(this.tablamedicamentos.) */
    }

  },
  created() {
    this.$store.dispatch('fetchTablaMedicamentos', this.$store.state.atencion_medicamento_id)
  },
}
</script>