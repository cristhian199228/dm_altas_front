import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { extend, ValidationProvider, ValidationObserver, setInteractionMode, localize } from "vee-validate";
import { required, integer, min, max, required_if, double, length, between, email } from "vee-validate/dist/rules";
import es from 'vee-validate/dist/locale/es.json'
import VueTour from 'vue-tour'
import axios from 'axios'

require('vue-tour/dist/vue-tour.css')

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true

setInteractionMode("eager");

Vue.config.productionTip = false


extend("required", {
  ...required,
});

extend("min", {
  ...min,
});

extend("email", {
  ...email,
});

extend("max", {
  ...max,
});

extend("integer", {
  ...integer,
});

extend("required_if", {
  ...required_if,
});

extend("double", {
  ...double,
});

extend("length", {
  ...length,
});

extend("between", {
  ...between,
});

localize('es')
localize({
  es
})

if (window.localStorage.getItem('digitalizacion-paciente') != null) {
  const paciente = JSON.parse(window.localStorage.getItem('digitalizacion-paciente'))
  store.commit('SET_PACIENTE', paciente)
}

if (window.localStorage.getItem('digitalizacion-paciente-extranjero') != null) {
  store.commit('SET_EXTRANJERO', true)
}






Vue.use(VueTour)
Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
