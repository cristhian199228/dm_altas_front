<template>
    <v-container>
        <v-dialog max-width="450px" v-model="dialog" persistent>
            <v-card>
                <v-card-title>AGREGAR FIRMA</v-card-title>
                <v-card-subtitle>Por favor firme en el recuadro</v-card-subtitle>
                <v-divider class="mb-5"></v-divider>
                <v-card-text style="height: 250px;">
                    <vueSignature id="signature" ref="signature" w="100%" h="100%" ></vueSignature>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="dialog = false" text color="normal">CANCELAR</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="clear" color="normal">BORRAR</v-btn>
                    <v-btn :disabled="!!($refs.signature && $refs.signature.isEmpty())" @click="save"
                        color="info">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>

import vueSignature from "vue-signature"
export default {
    name: 'DialogConsentimiento',
    components: {
        vueSignature,
    },
    data: () => ({
        estado: false
    }),
    computed: {
        dialog() {
            return this.$store.state.dialogFirma
        },
        paciente() {
            return this.$store.state.paciente
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
        save() {
            this.fc.firma = this.$refs.signature.save('image/jpeg');
            this.dialog = false;
        },
        clear() {
            this.$refs.signature.clear();
        },
    }
}
</script>
  