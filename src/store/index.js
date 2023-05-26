import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_URL ?? 'http://localhost:8000'

export default new Vuex.Store({
  state: {
    dialogSubirDescansoMedico: false,
    dialogConsentimiento: false,
    photo: undefined,
    paciente: {},
    atencion_id: null,
    tableOptions: {},
    loading: false,
    data: [],
    snackbar: {
      message: null,
      color: null,
      show: false,
    },
    isAuthenticated: false,
    isForeign: false,
  },
  getters: {
    fichas: (state, getters) => getters.esInvitado ? [] : state.data.data,
    totalItems: state => state.data.total,
    isLoading: state => state.loading,
    idPaciente: state => state.paciente.idpacientes,
    apellidos: state => state.paciente.apellido_paterno + ' ' + state.paciente.apellido_materno,
    esInvitado: state => state.paciente?.es_invitado,
    isAuthorized: (state, getters) => route => getters.routes.includes(route),
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
    },
    SET_PHOTO(state, photo) {
      state.photo = photo;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    },
    SET_DIALOG_SUBIR_DESCANSO_MEDICO(state, dialog) {
      state.dialogSubirDescansoMedico = dialog
    },
    SET_DIALOG_CONSENTIMIENTO(state, dialog) {
      state.dialogConsentimiento = dialog
    },
    SET_ATENCION_ID(state, id) {
      state.atencion_id = id
    },
    SET_TABLE_OPTIONS(state, options) {
      state.tableOptions = options
    },
    SHOW_SUCCESS_SNACKBAR(state, message) {
      state.snackbar.color = 'success'
      state.snackbar.message = message
      state.snackbar.show = true
    },
    SHOW_ERROR_SNACKBAR(state, message) {
      state.snackbar.color = 'error'
      state.snackbar.message = message
      state.snackbar.show = true
    },
    SET_PACIENTE(state, data) {
      state.paciente = data
      state.isAuthenticated = Boolean(data)
    },
    SET_EXTRANJERO(state) {
      state.isForeign = true
    },
    SHOW_SNACKBAR(state, snackbar) {
      state.snackbar.show = snackbar.show;
      state.snackbar.message = snackbar.message;
      state.snackbar.color = snackbar.color;
    },
  },
  actions: {
    async logout({ commit }) {
      window.localStorage.removeItem('digitalizacion-paciente')
      commit('SET_PACIENTE', null)
    },
    async login({ commit }, data) {
      try {
        const res = await axios.post(`/api/v1/loginFechaNacimiento`, data)
        commit('SHOW_SUCCESS_SNACKBAR', await res.data.message)
        commit('SET_PACIENTE', await res.data.data)
        commit('SET_EXTRANJERO', 1)
        window.localStorage.setItem('digitalizacion-paciente', JSON.stringify(res.data.data))
        window.localStorage.setItem('digitalizacion-paciente-extranjero', true)
      } catch (e) {
        commit('SET_PACIENTE', null)
        commit('SHOW_ERROR_SNACKBAR', await e.response.data.message);
        throw new Error(await e.response.data.message)
      }
    },
    async loginInvitados({ commit }, data) {
      try {
        const res = await axios.post(`/api/v1/loginInvitados`, data)
        commit('SHOW_SUCCESS_SNACKBAR', await res.data.message)
        commit('SET_PACIENTE', await res.data.data)
        commit('SET_PACIENTE', await res.data.data)
        window.localStorage.setItem('digitalizacion-paciente', JSON.stringify(res.data.data))
      } catch (e) {
        commit('SET_PACIENTE', null)
        commit('SHOW_ERROR_SNACKBAR', await e.response.data.message);
        throw new Error(await e.response.data.message)
      }
    },
    async loginLugarNacimiento({ commit }, data) {
      try {
        const res = await axios.post(`/api/loginLugarNacimiento`, data)
        commit('SHOW_SUCCESS_SNACKBAR', await res.data.message)
        commit('SET_PACIENTE', await res.data.data)
        window.localStorage.setItem('digitalizacion-paciente', JSON.stringify(res.data.data))
      } catch (e) {
        commit('SET_PACIENTE', null)
        commit('SHOW_ERROR_SNACKBAR', await e.response.data.message);
        throw new Error(await e.response.data.message)
      }
    },
    async fetchAtenciones({ commit, rootState, getters }) {
      const config = {
        params: {
          ...rootState.tableOptions
        }
      }
      try {
        const res = await axios.get(`/api/v1/paciente/${getters.idPaciente}/fichaTemp`, config)
        commit('SET_DATA', await res.data)
        commit('SET_LOADING', false);
      } catch (e) {
        commit('SET_LOADING', false);
        throw new Error(await e.response.data.message)
      }
    },
    async fetchAtencion({ commit }, id_paciente) {
      try {
        const res = await axios.get(`/api/fetchAtencion/${id_paciente}`)
        //console.log(res)
        commit('SET_DATA', res.data)
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async storeAtencion({ dispatch }, params) {
      try {
        await axios.post(`/api/storeAtencion/`, params)
        //commit('SHOW_SUCCESS_SNACKBAR', await res.data.message)
        console.log(params)
        dispatch('fetchAtencion', params.id_paciente)
        //return await res.data.data.id_temp_fichapaciente
      } catch (e) {
        // commit('SHOW_ERROR_SNACKBAR', await e.response.data.message)
        throw new Error(await e.response.data.message)
      }
    },
    async updateAtencion({ commit, getters }, params) {
      try {
        const res = await axios.put(`/api/v1/paciente/${getters.idPaciente}/fichaTemp/${params.id_ficha}`, params)
        commit('SHOW_SUCCESS_SNACKBAR', await res.data.message)
      } catch (e) {
        commit('SHOW_ERROR_SNACKBAR', await e.response.data.message)
        throw new Error(await e.response.data.message)
      }
    },
    uploadDescansoMedico({ commit, dispatch, state }) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const snackbar = {};
      const formData = new FormData();
      formData.append("file", state.photo);
      formData.append("id_atencion", state.atencion_id);
      //commit('SET_LOADING', true, { root: true });

      axios.post('/api/uploadDescansoMedico', formData, config)
        .then(res => {
          if (res && res.data) {
            commit('SET_LOADING', false, { root: true });
            snackbar.show = true;
            snackbar.color = "success";
            snackbar.message = "Se subió la foto correctamente";
            commit('SET_DIALOG_SUBIR_DESCANSO_MEDICO', false);
            commit('SHOW_SNACKBAR', snackbar);
            dispatch('fetchAtencion', state.paciente.idpacientes)
          }
        })
        .catch(err => {
          if (err && err.response) {
            snackbar.show = true;
            snackbar.color = "error";
            snackbar.message = err.response.data.message;
            commit('SHOW_SNACKBAR', snackbar, { root: true });
            dispatch('getEvidencias');
          }
        });
    },
    async fetchDepartamentos() {
      try {
        const { data } = await axios.get('/api/departamentosReniec')
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchProvincias(_, coDepartamento) {
      const config = {
        params: {
          coDepartamento
        }
      }
      try {
        const res = await axios.get('/api/provinciasReniec', config)
        return await res.data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchDistritos(_, params) {
      const config = {
        params,
      }
      try {
        const res = await axios.get('/api/distritosReniec', config)
        return await res.data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
  },
  modules: {
  }
})
