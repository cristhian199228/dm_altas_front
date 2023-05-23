<template>
    <v-container>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>SUBIR DESCANSO MEDICO</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <br>
                    <v-file-input
              show-size
              ref="photo"
              label="SELECCIONE DOCUMENTO"
              messages="Archivos admitidos: imagenes y pdf"
              accept="image/*,.pdf"
              @change="seleccionarFoto"
            ></v-file-input>
                    <!--  <v-file-input show-size ref="photo" label="SELECCIONE DOCUMENTO"
                        messages="Archivos admitidos: imagenes y pdf" accept="image/*,.pdf"
                        @change="seleccionarFoto"></v-file-input> -->
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="normal" @click="close">CANCELAR</v-btn>
                    <v-btn color="primary" @click="upload()"><v-icon left>mdi-cloud-upload</v-icon>SUBIR</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    name: 'DialogSubirDescansoMedico',
    data: () => ({
    }),
    computed: {
        dialog() {
            return this.$store.state.dialogSubirDescansoMedico
        },
        photo(){
            return this.$store.state.photo
        }
    },
    methods: {
        seleccionarFoto(e) {
            this.$store.commit('SET_PHOTO', e);
        },
        close() {
            this.$store.commit('SET_DIALOG_SUBIR_DESCANSO_MEDICO', false)
        },
        upload() {
            if (this.photo) {
                this.$store.dispatch('uploadDescansoMedico');
            } else {
                const snackbar = {
                    show: true,
                    color: 'error',
                    message: 'Por favor seleccione un archivo!'
                };
                this.$store.commit('SHOW_SNACKBAR', snackbar);
            }
        },
    }
}
</script>
  