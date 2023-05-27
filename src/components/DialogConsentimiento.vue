<template>
    <v-container>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card outlined>
                <v-card-title> CONSENTIMIENTO DESCANSO MEDICO</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Inicio y Fin de Descanso Medico" prepend-icon="mdi-calendar"
                                readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker range v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-text-field label="Nombre del medico que otorgo el Descanso medico" required></v-text-field>
                    <v-select label="Motivo del descanso medico" :items="motivoDescansoMedico"></v-select>
                    <v-select label="Centro medico donde se otorgo el Descanso Medico" :items="centrosMedicos"></v-select>
                    <v-row>
                        <v-col>
                            El descanso medico que se entregara es producto de una intervencion quirurgica
                        </v-col>
                        <v-col>
                            <v-switch color="primary" :model-value="true" label="SI"></v-switch>
                        </v-col>
                    </v-row>
                    <v-select label="En qué establecimiento de salud fue intervenido quirúrgicamente?"
                        :items="centrosMedicosQuirurgicos"></v-select>
                    POR LO TANTO:
                    <validation-provider v-slot="{}" name="agree" rules="required">
                        <v-radio-group v-model="estado" row>
                            <v-radio label="DECLARO" :value="1"></v-radio>
                            <v-radio label="NO DECLARO" :value="0"></v-radio>
                        </v-radio-group>
                    </validation-provider>
                    Que los datos consignados son verdaderos, estando la empresa facultada a realizar las
                    verificaciones y aplicar, de ser el caso, las sanciones administrativas contempladas en las normas
                    vigentes.
                    <br>
                    <br>
                    FIRMAR EN EL RECUADRO
                    <vueSignature class="mt-1" id="signature" ref="signature" w="100%" h="100%" :sigOption="option"></vueSignature>
                    <!--  <template>
                        <v-card width="400px" elevation="5">
                            <v-img :src="fc.firma"></v-img>
                            <v-divider></v-divider>
                            <v-card-subtitle>
                                <div class="d-flex">
                                    FIRMA
                                    <v-spacer></v-spacer>
                                    <v-btn color="info" dark @click="dialog = true"><v-icon dark>mdi-pencil</v-icon></v-btn>
                                </div>
                            </v-card-subtitle>
                        </v-card>
                    </template> -->
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <!--    <v-btn text color="normal" @click="regresar">ATRAS</v-btn> -->
                    <v-btn text color="normal">ATRAS</v-btn>
                    <!--   <v-btn :disabled="!fc.firma || invalid" color="primary" @click="updateFc">GUARDAR</v-btn> -->
                    <v-btn color="primary">GUARDAR</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <DialogFirma />
    </v-container>
</template>
<script>
import vueSignature from "vue-signature"
import DialogFirma from '../components/DialogFirma'
export default {
    name: 'DialogConsentimiento',
    components: {
        DialogFirma,
        vueSignature,
    },
    data: () => ({
        option: {
            penColor: "rgb(0, 0, 0)",
            backgroundColor: "rgb(235, 236, 237 )"
        },
        estado: false,
        centrosMedicos: [
            "Clínica Arequipa",
            "Clínica San Juan de Dios",
            "Clínica  Sanna",
            "Clínica  Monte Carmelo",
            "Clínica Auna Valle Sur",
            "Clínica San Pablo",
            "Médico Particular afiliado al PAMF",
            "International SOS",
            "Médico Particular No afiliado al PAMF"
        ],
        centrosMedicosQuirurgicos: [
            "Clínica Arequipa",
            "Clínica San Juan de Dios",
            "Clínica  Sanna",
            "Clínica  Monte Carmelo",
            "Clínica Auna Valle Sur",
            "Clínica San Pablo",
            "Otros (especifique)"
        ],
        motivoDescansoMedico: [
            'Accidente de trabajo ',
            'Accidente de transito ',
            'Accidente común',
            'Enfermedad',
            "Maternidad"
        ],
        date: null,
        menu: false,
        modal: false,
        menu2: false,
        dates: ['2019-09-10', '2019-09-20'],

    }),
    computed: {
        dialog() {
            return this.$store.state.dialogConsentimiento
        },
        paciente() {
            return this.$store.state.paciente
        },
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
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
  