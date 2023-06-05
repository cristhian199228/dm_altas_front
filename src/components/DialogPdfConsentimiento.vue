<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar dark color="#1E286C">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>CONSENTIMIENTO DESCANSO MEDICO</v-toolbar-title>
      </v-toolbar>
      <!-- <pdf v-for="i in numPages" :key="i" :src="src" :page="i"></pdf> -->
      <vue-pdf-embed :source="source1" />
    </v-card>
  </v-dialog>
</template>
  
<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
export default {
  name: "DialogPdfFichaInvestigacion",
  components: {
    VuePdfEmbed,
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      src: null,
      source1: {},
      numPages: undefined,
    }
  },
  computed: {
    dialog() {
      return this.$store.state.dialogPdfConsentimiento
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.$store.commit('SET_DIALOG_PDF_CONSENTIMIENTO', false)
    },
    onShowPdf() {
      this.$store.dispatch('showPdfFichaInvestigacion', this.$store.state.consentimiento_id)
        .then(url => {
          this.source1 = url
        })
        .catch(() => { })
    }
  },
}
</script>