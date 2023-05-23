<template>
    <v-container>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>SUBIR DESCANSO MEDICO</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <br>
                    <input type="file" ref="photo" accept="image/*,.pdf" />
                    <!--  <v-file-input show-size ref="photo" label="SELECCIONE DOCUMENTO"
                        messages="Archivos admitidos: imagenes y pdf" accept="image/*,.pdf"
                        @change="seleccionarFoto"></v-file-input> -->
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="normal" @click="close">CANCELAR</v-btn>
                    <v-btn color="primary" @click="upload"><v-icon left>mdi-cloud-upload</v-icon>SUBIR</v-btn>
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
        }
    },
    methods: {
        close() {
           this.$store.commit('SET_DIALOG_SUBIR_DESCANSO_MEDICO',false)
        },
    }
}
</script>
  