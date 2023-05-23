<template>
  <div>
    <v-card-text>
      <p>Ingrese su número de documento y fecha de nacimiento para ingresar al sistema.</p>
      <p class="caption blue--text">Fill your document number and date of birth to enter the system.</p>
      <validation-observer ref="observer" v-slot="{}">
        <validation-provider v-slot="{errors}" name="número de documento" rules="required|min:8">
          <v-text-field
            v-model.trim="form.numero_documento"
            :error-messages="errors"
            label="CARNET EXTRANJERIA / PASAPORTE"
          ></v-text-field>
          <p class="caption blue--text">ACR/PASSPORT</p>
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
                v-model="form.fecha_nacimiento"
                label="FECHA DE NACIMIENTO *"
                readonly
                v-bind="attrs"
                v-on="on"
                :error-messages="errors"
              ></v-text-field>
               <p class="caption blue--text">DATE OF BIRTH</p>
            </validation-provider>
          </template>
          <v-date-picker
            v-model="form.fecha_nacimiento"
            @input="menu = false"
            locale="es"
            :active-picker.sync="activePicker"
            :max="moment().format('YYYY-MM-DD')"
            min="1930-01-01"
          ></v-date-picker>
        </v-menu>
        <p class="caption">(*) Campos obligatorios</p>
      </validation-observer>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="ingresar">INGRESAR</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import moment from "moment";
import {setInteractionMode} from "vee-validate";

setInteractionMode("eager");
export default {
  name: "LoginView",
  data() {
    return {
      form: {
        numero_documento: null,
        fecha_nacimiento: null,
      },
      menu: false,
      activePicker: null,
      moment,
    }
  },
  methods: {
    ingresar() {
      this.$refs.observer.validate().then(isValid => {
        if (!isValid) return
        this.$store.dispatch('login', this.form)
          .then(() => this.$router.push('/fichas'))
          .catch(() => {})
      })
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  }
}
</script>

<style scoped>

</style>
