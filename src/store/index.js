import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_URL ?? 'http://localhost:8000'

export default new Vuex.Store({
  state: {
    dialogSubirDescansoMedico: false,
    dialogDesicionMedicamento: false,
    dialogSubirEvidencia: false,
    dialogConsentimiento: false,
    dialogPdfConsentimiento: false,
    dialogEvidencias: false,
    dialogEvidenciasMedicamento: false,
    dialogAgregarMedicamento: false,
    tablaMedicamentos:[],
    photo: undefined,
    photo_medicamento: undefined,
    paciente: {},
    atencion_id: null,
    atencion_medicamento_id: null,
    consentimiento_id: null,
    tableOptions: {},
    loading: false,
    data: [],
    medicamentos: [],
    medicamentosBusqueda: [],
    snackbar: {
      message: null,
      color: null,
      show: false,
    },
    isAuthenticated: false,
    isForeign: false,
    steps: [
      {
        target: '#v-step-0',  // We're using document.querySelector() under the hood
        content: `Presione este boton para declarar un medicamento`,
        header: {
          title: 'Boton Agregar',
        },
        params: {
          placement: 'top',

        }
      },
      {
        target: '#v-step-1',
        content: 'Una nueva declaración ha sido creada , presionar para agregar medicamentos',
        header: {
          title: 'NUEVA DECLARACIÓN',
        },
        params: {
          placement: 'bottom'
        }
      }
    ],
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
    SET_MEDICAMENTOS(state, data) {
      state.medicamentos = data
    },
    SET_MEDICAMENTOS_BUSQUEDA(state, data) {
      state.medicamentosBusqueda = data
    },
    SET_TABLA_MEDICAMENTOS(state, data) {
      state.tablaMedicamentos = data
    },
    SET_PHOTO(state, photo) {
      state.photo = photo;
    },
    SET_PHOTO_MEDICAMENTO(state, photo) {
      state.photo_medicamento = photo;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    },
    SET_DIALOG_SUBIR_DESCANSO_MEDICO(state, dialog) {
      state.dialogSubirDescansoMedico = dialog
    },
    SET_DIALOG_SUBIR_EVIDENCIA(state, dialog) {
      state.dialogSubirEvidencia = dialog
    },
    SET_DIALOG_CONSENTIMIENTO(state, dialog) {
      state.dialogConsentimiento = dialog
    },
    SET_DIALOG_PDF_CONSENTIMIENTO(state, dialog) {
      state.dialogPdfConsentimiento = dialog
    },
    SET_DIALOG_EVIDENCIAS(state, dialog) {
      state.dialogEvidencias = dialog
    },
    SET_DIALOG_EVIDENCIAS_MEDICAMENTO(state, dialog) {
      state.dialogEvidenciasMedicamento = dialog
    },
    SET_DIALOG_AGREGAR_MEDICAMENTO(state, dialog) {
      state.dialogAgregarMedicamento = dialog
    },
    SET_ATENCION_ID(state, id) {
      state.atencion_id = id
    },
    SET_ATENCION_MEDICAMENTO_ID(state, id) {
      state.atencion_medicamento_id = id
    },
    SET_CONSENTIMIENTO_ID(state, id) {
      state.consentimiento_id = id
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
    async fetchMedicamentos({ commit }, id_paciente) {
      try {
        const res = await axios.get(`/api/fetchMedicamento/${id_paciente}`)
        //console.log(res)
        commit('SET_MEDICAMENTOS', res.data)
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
    async storeMedicamento({ dispatch }, params) {
      try {
        await axios.post(`/api/storeMedicamento`, params)
        //commit('SHOW_SUCCESS_SNACKBAR', await res.data.message)
        console.log(params)
        dispatch('fetchMedicamentos', params.id_paciente)
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
    uploadEvidencias({ commit, dispatch, state }) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const snackbar = {};
      const formData = new FormData();
      formData.append("file", state.photo);
      formData.append("id_atencion", state.atencion_id);
      //commit('SET_LOADING', true, { root: true });

      axios.post('/api/evidencias', formData, config)
        .then(res => {
          if (res && res.data) {
            commit('SET_LOADING', false, { root: true });
            snackbar.show = true;
            snackbar.color = "success";
            snackbar.message = "Se subió la foto correctamente";
            commit('SET_DIALOG_EVIDENCIAS', false);
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
    uploadEvidenciasMedicamento({ commit, dispatch, state }) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const snackbar = {};
      const formData = new FormData();
      formData.append("file", state.photo_medicamento);
      formData.append("id_atencion", state.atencion_medicamento_id);
      //commit('SET_LOADING', true, { root: true });

      axios.post('/api/evidenciasMedicamento', formData, config)
        .then(res => {
          if (res && res.data) {
            commit('SET_LOADING', false, { root: true });
            snackbar.show = true;
            snackbar.color = "success";
            snackbar.message = "Se subió la foto correctamente";
            commit('SET_DIALOG_EVIDENCIAS_MEDICAMENTO', false);
            commit('SHOW_SNACKBAR', snackbar);
            dispatch('fetchMedicamentos', state.paciente.idpacientes)
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
    async fetchDocumentosRequeridos() {
      try {
        const res = await axios.get('/api/fetchDocumentosRequeridos')
        return await res.data
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async storeConsentimiento({ dispatch, state }, params) {
      try {
        await axios.post(`/api/storeConsentimiento/`, params)
        //commit('SHOW_SUCCESS_SNACKBAR', await res.data.message)
        /*         console.log(params) */
        dispatch('fetchAtencion', state.paciente.idpacientes)
        //return await res.data.data.id_temp_fichapaciente
      } catch (e) {
        // commit('SHOW_ERROR_SNACKBAR', await e.response.data.message)
        throw new Error(await e.response.data.message)
      }
    },
    async showPdfFichaInvestigacion(_, id) {
      const config = {
        responseType: 'blob'
      }
      try {
        const response = await axios.get(`api/showConsentimientoPdf/${id}`, config)
        return window.URL.createObjectURL(new Blob([response.data]));
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async searchMedicamentos({ commit }, params) {
      try {
        const res = await axios.post(`/api/searchMedicamento/`, params)
        commit('SET_MEDICAMENTOS_BUSQUEDA', await res.data)
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async agregarMedicamentoAtencion({dispatch,state}, params) {
      console.log(params)
      try {
        /* const res = */ await axios.post(`/api/storeMedicamentoAtencion/`, params)
        dispatch('fetchTablaMedicamentos', state.atencion_medicamento_id)
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async fetchTablaMedicamentos({ commit }, id_atencion) {
      try {
        const res = await axios.get(`/api/fetchTablaMedicamentos/${id_atencion}`)
        //console.log(res)
        commit('SET_TABLA_MEDICAMENTOS', res.data)
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
    async eliminarMedicamento({dispatch,state}, params) {
      try {
        await axios.post(`/api/eliminarMedicamento`, params)
        dispatch('fetchTablaMedicamentos', state.atencion_medicamento_id)
      } catch (e) {
        throw new Error(await e.response.data.message)
      }
    },
  },
  modules: {
  }
})
