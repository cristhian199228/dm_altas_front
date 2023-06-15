<template>
  <v-card class="mb-12" elevation="0">
    <viewer :images="images" @inited="inited" class="viewer" ref="viewer">
      <img v-for="(src, i) in images" :src="src" :key="i" class="image" />
    </viewer>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          Introduzca el nombre del medicamento ,si el medicamento no se encuentra en la lista presione Agregar.
          <v-autocomplete v-model="medicamento_seleccionado" :loading="loading" :items="medicamentos"
            :search-input.sync="search" item-text="descripcion" item-value="id" cache-items prepend-icon="mdi-medication"
            class="mx-4" flat hide-no-data label="Medicamento">
            <template v-slot:append-outer>
              <v-btn color="primary" @click="agregarMedicamento()">
                Agregar
              </v-btn>
              <!-- <v-slide-x-reverse-transition mode="out-in">
                <v-icon v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"></v-icon>
              </v-slide-x-reverse-transition> -->
            </template>
          </v-autocomplete>
          <v-file-input show-size ref="photo" label="Adjuntar Receta Medica" messages="Archivos admitidos: imagenes y pdf"
            class="mx-4" accept="image/*,.pdf" @change="seleccionarFoto" v-model="foto">
            <template v-slot:append-outer>
              <v-btn color="primary" @click="upload()">
                SUBIR
              </v-btn>
              <v-btn v-if="medicamentosEvidencia[0].evidencias.length > 0" color="#6988C0" @click="verFotosEvidencia(medicamentosEvidencia[0].evidencias)" fab small icon dark
                elevation="0">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <!-- <v-slide-x-reverse-transition mode="out-in">
                <v-icon v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"></v-icon>
              </v-slide-x-reverse-transition> -->
            </template>
          </v-file-input>

          <!--    <v-btn color="primary" class="mt-2">
            Agregar
          </v-btn> -->
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
            <template v-slot:[`item.receta`]="{}">
              <v-switch v-model="tiene_receta" inset small></v-switch>
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
          <!--           <span class="pt-4">NO REPORTABLE: Medicamentos que no impacta en fatiga y somnolencia.</span><br>
          <span class="pt-4">NO REPORTABLE: Medicamentos que no impactan en conducción y operación de equipos</span><br> -->
          <span class="pt-4">NO REPORTABLE: El consumo de este medicamento no impacta en sus actividad regulares.</span>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            MEDICAMENTOS SIN RECETA
          </v-card-title>
          <v-card-text>USTED ESTA CONSUMIENDO MEDICAMENTOS SIN RECETA , EL SOPORTE MEDICO SE CONTACTARA CON USTED PARA
            DARLE INDICACIONES .</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              DE ACUERDO
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      dialog: false,
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
        { text: "Tiene Receta", value: "receta", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    }
  },
  watch: {
    search(val) {
      if (val.length > 2) {
        this.loading = true
        /* if (this.loading) return */
        const data = {
          valor: val
        };
        this.$store.dispatch('searchMedicamentos', data)
        this.loading = false
        this.medicamento_string = val
      }

      /* if (this.medicamentos.length > 0) return 'hola'
      
     
      console.log(val.length) */
      //

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
    }
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
  },
  created() {
    this.$store.dispatch('fetchTablaMedicamentos', this.$store.state.atencion_medicamento_id)
  },
}
</script>