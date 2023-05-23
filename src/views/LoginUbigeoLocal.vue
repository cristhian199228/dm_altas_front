<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-card-text>
      <p>Ingrese los siguientes datos para ingresar al sistema.</p>
      <validation-observer ref="observer" v-slot="{}">
        <validation-provider v-slot="{errors}" name="número de documento" rules="required|min:8">
          <v-text-field
            v-model.trim="form.numero"
            :error-messages="errors"
            label="Número de documento *"
            type="number"
            id="v-step-0"
          ></v-text-field>
        </validation-provider>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <validation-provider v-slot="{errors}" name="fecha de nacimiento" rules="required">
              <v-text-field
                v-model="form.fenac"
                label="Fecha de nacimiento *"
                readonly
                v-bind="attrs"
                v-on="on"
                :error-messages="errors"
                id="v-step-1"
              ></v-text-field>
            </validation-provider>
          </template>
          <v-date-picker
            v-model="form.fenac"
            @input="menu = false"
            locale="es"
            :active-picker.sync="activePicker"
            :max="moment().format('YYYY-MM-DD')"
            min="1920-01-01"
          ></v-date-picker>
        </v-menu>

        <validation-provider v-slot="{errors}" name="nombre padre" rules="required">
          <v-text-field
            v-model.trim="form.nompadre"
            :error-messages="errors"
            label="Nombre de su Padre *"
            hint="Ej: Pedro"
            id="v-step-2"
          ></v-text-field>
        </validation-provider>

        <validation-provider v-slot="{errors}" name="nombre madre" rules="required">
          <v-text-field
            v-model.trim="form.nommadre"
            :error-messages="errors"
            label="Nombre de su Madre *"
            hint="Ej: Maria"
            id="v-step-3"
          ></v-text-field>
        </validation-provider>

        <validation-provider v-slot="{errors}" name="departamento" rules="required">
          <v-select
            label="Departamento de nacimiento *"
            v-model="form.coDepartamento"
            :items="departamentos"
            item-text="departamento"
            item-value="coDepartamento"
            @change="onChangeDepartamento"
            :error-messages="errors"
            id="v-step-4"
          ></v-select>
        </validation-provider>

        <validation-provider v-slot="{errors}" name="provincia" rules="required">
          <v-select
            label="Provincia de nacimiento *"
            v-model="form.coProvincia"
            :items="provincias"
            item-text="provincia"
            return-object
            @change="onChangeProvincia"
            :error-messages="errors"
            :disabled="disabled.provincia"
            id="v-step-5"
          ></v-select>
        </validation-provider>

        <validation-provider v-slot="{errors}" name="distrito" rules="required">
          <v-select
            label="Distrito de nacimiento *"
            v-model="form.coDistrito"
            :items="distritos"
            item-text="distrito"
            item-value="coDistrito"
            :error-messages="errors"
            :disabled="disabled.distrito"
            id="v-step-6"
          ></v-select>
        </validation-provider>

        <p class="caption">(*) Campos obligatorios</p>
      </validation-observer>
    </v-card-text>
    <v-card-actions>
      <v-btn outlined color="info" @click="$tours['myTour'].start()">AYUDA</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="ingresar">INGRESAR</v-btn>
    </v-card-actions>
    <v-tour name="myTour" :steps="steps" :options="myOptions"></v-tour>
  </div>
</template>

<script>
import moment from "moment";
import {setInteractionMode} from "vee-validate";

setInteractionMode("eager");
export default {
  name: "LoginUbigeoLocal",
  data() {
    return {
      form: {
        numero: null,
        fenac: null,
        nompadre: null,
        nommadre: null,
        coDepartamento: null,
        coProvincia: null,
        coDistrito: null,
      },
      disabled: {
        provincia: true,
        distrito: true
      },
      overlay: false,
      menu: false,
      activePicker: null,
      departamentos: [],
      provincias: [],
      distritos: [],
      moment,
      steps: [
        {
          target: '#v-step-0',  // We're using document.querySelector() under the hood
          content: `Ingrese su número de DNI`,
          header: {
            title: 'Número de documento',
          },
        },
        {
          target: '#v-step-1',
          content: 'Presione el campo e ingrese su fecha de nacimiento',
          header: {
            title: 'Fecha de nacimiento',
          },
          params: {
            placement: 'top'
          }
        },
        {
          target: '#v-step-2',
          content: 'Ingrese el primer o segundo nombre de su padre. Ejemplo: \'Manuel\'',
          header: {
            title: 'Nombre de su padre',
          },
        },
        {
          target: '#v-step-3',
          content: 'Ingrese el primer o segundo nombre de su madre. Ejemplo: \'Maria\'',
          header: {
            title: 'Nombre de su madre',
          },
        },
        {
          target: '#v-step-4',
          content: 'Seleccione el departamento donde nació',
          header: {
            title: 'Departamento de nacimiento',
          },
          params: {
            placement: 'top'
          }
        },
        {
          target: '#v-step-5',
          content: 'Seleccione la provincia donde nació',
          header: {
            title: 'Provincia de nacimiento',
          },
          params: {
            placement: 'top'
          }
        },
        {
          target: '#v-step-6',
          content: 'Seleccione el distrito donde nació',
          header: {
            title: 'Distrito de nacimiento',
          },
          params: {
            placement: 'top'
          }
        },
      ],
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: 'Saltar tutorial',
          buttonPrevious: 'Anterior',
          buttonNext: 'Siguiente',
          buttonStop: 'Finalizar'
        }
      },
    }
  },
  methods: {
    ingresar() {
      this.$refs.observer.validate().then(isValid => {
        if (!isValid) return
        this.overlay = true
        this.$store.dispatch('loginLugarNacimiento', this.form)
          .then(() => {
            this.overlay = false
            this.$router.push('/fichas')
          })
          .catch(() => this.overlay = false)
      })
    },
    cargarDepartamentos() {
      this.$store.dispatch('fetchDepartamentos')
        .then(data => this.departamentos = data)
    },
    onChangeDepartamento(coDepartamento) {
      this.form.coProvincia = null
      this.form.coDistrito = null
      this.provincias = []
      this.distritos = []
      this.overlay = true
      this.disabled.provincia = true
      this.disabled.distrito = true
      this.$store.dispatch('fetchProvincias', coDepartamento)
        .then(data => {
          this.provincias = data
          this.overlay = false
          this.disabled.provincia = false
        })
        .catch(() => this.overlay = false)
    },
    onChangeProvincia(data) {
      this.distritos = []
      this.overlay = true
      this.form.coDistrito = null
      this.disabled.distrito = true
      this.$store.dispatch('fetchDistritos', data)
        .then(data => {
          this.distritos = data
          this.overlay = false
          this.disabled.distrito = false
        })
        .catch(() => this.overlay = false)
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  created() {
    this.cargarDepartamentos()
  },
  mounted() {
    this.$tours['myTour'].start()
  }
}
</script>

<style scoped>

</style>
