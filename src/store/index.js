import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_URL ?? 'http://localhost:8000'

export default new Vuex.Store({
  state: {
    paciente: {},
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
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
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
    }
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
        console.log(res)
        commit('SET_DATA', res.data)
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async storeAtencion(_, params) {
      try {
        const res = await axios.post(`/api/storeAtencion/`, params)
        //commit('SHOW_SUCCESS_SNACKBAR', await res.data.message)
        return await res.data.data.id_temp_fichapaciente
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
    async fetchPaises(buscar) {
      const config = {
        params: { buscar }
      }
      try {
        const { data } = await axios.get('/api/v1/paises/buscar', config)
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchCiudadesByIdPais(id_pais) {
      try {
        const { data } = await axios.get(`/api/v1/paises/${id_pais}/ciudades`)
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchTransportes() {
      try {
        const { data } = await axios.get(`/api/v1/transportes`)
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchComorbilidades() {
      try {
        const { data } = await axios.get('/api/v1/comorbilidades')
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchSintomas({ state }) {
      if (state.isForeign) {
        try {
          const { data } = await axios.get('/api/v1/datosClinicosEn')
          return data
        } catch (e) {
          throw new Error(await e.response.data.message)
        }
      }
      else {
        try {
          const { data } = await axios.get('/api/v1/datosClinicos')
          return data
        } catch (e) {
          throw new Error(await e.response.data.message)
        }
      }
    },
    async fetchSintomasNuevo({ state }) {
      if (state.isForeign) {
        try {
          const { data } = await axios.get('/api/v1/datosClinicosNuevoEn')
          return data
        } catch (e) {
          throw new Error(await e.response.data.message)
        }
      }
      else {
        try {
          const { data } = await axios.get('/api/v1/datosClinicosNuevo')
          return data
        } catch (e) {
          throw new Error(await e.response.data.message)
        }
      }
    },
    async fetchMarcasVacuna() {
      try {
        const { data } = await axios.get('/api/v1/marcasVacuna')
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
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
    async showPaciente({ getters }) {
      try {
        const { data } = await axios.get(`/api/v1/showPaciente/${getters.idPaciente}`)
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async buscarEmpresa(buscar) {
      const config = {
        params: { buscar }
      }
      try {
        const res = await axios.get('/api/v1/searchEmpresa', config)
        return await res.data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchDepartamentosUbigeo() {
      try {
        const { data } = await axios.get('/api/departamentos')
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchProvinciasPorDepartamento(idDepartamento) {
      try {
        const { data } = await axios.get(`/api/departamentos/${idDepartamento}/provincias`)
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchDistritosPorProvincia(idProvincia) {
      try {
        const { data } = await axios.get(`/api/provincias/${idProvincia}/distritos`)
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchDosisCovid19({ getters }) {
      try {
        const { data } = await axios.get(`/api/v1/pacientes/${getters.idPaciente}/dosisCovid19`)
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchHospitalizacion({ getters }) {
      try {
        const { data } = await axios.get(`/api/v1/pacientes/${getters.idPaciente}/hospitalizacion`)
        return data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    }
  },
  modules: {
  }
})
