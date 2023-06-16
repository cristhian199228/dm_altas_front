<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card-text>
      <v-alert type="warning" outlined>
        Declaro que no cuento con los datos para el ingreso regular al portal de fichas digitales, autorizo el uso de la
        información que registraré
        en este formulario con el fin de procesarla para mi tamizaje de Covid19.
      </v-alert>
      <validation-observer ref="observer" v-slot="{  }">
        <validation-provider v-slot="{ errors }" name="número de documento" rules="required|min:8">
          <v-text-field v-model.trim="form.numero_documento" :error-messages="errors" label="Número de documento *">
          </v-text-field>
        </validation-provider>
        <p class="caption">(*) Campos obligatorios</p>
      </validation-observer>
      <validation-observer ref="observer" v-slot="{  }">
        <validation-provider v-slot="{ errors }" name="Ubigeo" rules="required|min:6|max:6">
          <v-text-field v-model.trim="form.ubigeo" :error-messages="errors" label="Ubigeo de Nacimiento *"></v-text-field>
        </validation-provider>
        <p class="caption">(*) Campos obligatorios</p>
      </validation-observer>
   <!--     <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <validation-provider v-slot="{errors}" name="fecha de caducidad" rules="required">
              <v-text-field
                v-model="form.fecha_caducidad"
                label="Fecha de caducidad de DNI *"
                readonly
                v-bind="attrs"
                v-on="on"
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
          </template>
          <v-date-picker
            v-model="form.fecha_caducidad"
            @input="menu = false"
            locale="es"
            :active-picker.sync="activePicker"
            max="2035-01-01"
            min="1930-01-01"
          ></v-date-picker>
        </v-menu> -->
      <v-menu
          v-model="menu_nacimiento"
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
                label="Fecha de nacimiento *"
                readonly
                v-bind="attrs"
                v-on="on"
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
          </template>
          <v-date-picker
            v-model="form.fecha_nacimiento"
            @input="menu_nacimiento = false"
            locale="es"
            :active-picker.sync="activePickerNacimiento"
            :max="moment().format('YYYY-MM-DD')"
            min="1930-01-01"
          ></v-date-picker>
        </v-menu>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="ingresar">INGRESAR</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "LoginInvitados",
  data() {
    return {
      form: {
        numero_documento: null,
        fecha_nacimiento: null,
        ubigeo: null,
      },
      menu: false,
      menu_nacimiento:false,
      conforme: false,
      activePicker: null,
      activePickerNacimiento: null,
      overlay: false,
      moment,
    }
  },
  methods: {
    ingresar() {
      this.$refs.observer.validate().then(isValid => {
        if (!isValid) return
        this.overlay = true
        this.$store.dispatch('loginInvitados', this.form)
          .then(() => {
            this.overlay = false
            this.$router.push('/fichas')
          })
          .catch(() => this.overlay = false)
      })
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    menu_nacimiento(val) {
      val && setTimeout(() => (this.activePickerNacimiento = 'YEAR'))
    },
  }
}
</script>

<style scoped>
</style>
