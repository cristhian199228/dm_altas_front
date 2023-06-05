<template>
    <v-container>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card outlined>
                <validation-observer ref="observer" v-slot="{}">
                    <form @submit.prevent="submit">
                        <v-card-title> CONSENTIMIENTO DESCANSO MEDICO</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                                transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <validation-provider v-slot="{ errors }" rules="required" name="Fechas Descanso Medico">
                                        <v-text-field v-model="data.date" label="Inicio y Fin de Descanso Medico"
                                            :error-messages="errors" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                            v-on="on">
                                        </v-text-field>
                                    </validation-provider>
                                </template>
                                <v-date-picker range v-model="data.date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                            <validation-provider v-slot="{ errors }" rules="required" name="Nombre del Medico">
                                <v-text-field label="Nombre del medico que otorgo el Descanso medico"
                                    v-model="data.nombre_medico" prepend-icon="mdi-doctor" :error-messages="errors">
                                </v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" rules="required" name="Motivo del Descanso Medico">
                                <v-select label="Motivo del descanso medico" prepend-icon="mdi-note-text"
                                    :error-messages="errors" item-text="descripcion" item-value="id"
                                    v-model="data.motivo_descanso_medico" :items="motivoDescansoMedico">
                                </v-select>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" rules="required" name="Centro Medico">
                                <v-select label="Centro medico donde se otorgo el Descanso Medico"
                                    v-model="data.centro_medico" prepend-icon="mdi-hospital-building"
                                    item-text="descripcion" :error-messages="errors" item-value="id"
                                    :items="centrosMedicos">
                                </v-select>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" rules="required" name="Documentos Presentados">
                                <v-select v-model="data.documentos_presentados" :items="documentos" prepend-icon="mdi-note"
                                    :error-messages="errors" item-text="descripcion" item-value="id"
                                    label="Documentos Presentados" multiple></v-select>
                            </validation-provider>
                            <v-row>
                                <v-col>
                                    El descanso medico que se entregara es producto de una intervencion quirurgica
                                </v-col>
                                <v-col>
                                    <v-switch color="primary" v-model="descanso_medico_producto"
                                        :label="descanso_medico_producto_texto"></v-switch>
                                </v-col>
                            </v-row>
                            <validation-provider v-slot="{ errors }" rules="required" name="Establecimiento de Salud">
                                <v-select v-if="descanso_medico_producto"
                                    label="En qué establecimiento de salud fue intervenido quirúrgicamente?"
                                    v-model="data.centro_quirurgico" :error-messages="errors" item-text="descripcion"
                                    item-value="id" :items="centrosMedicosQuirurgicos">
                                </v-select>
                            </validation-provider>
                            POR LO TANTO:
                            <validation-provider v-slot="{}" name="agree" rules="required">
                                <v-radio-group v-model="declaro_descanso_medico" row>
                                    <v-radio label="DECLARO" :value="true"></v-radio>
                                    <v-radio label="NO DECLARO" :value="false"></v-radio>
                                </v-radio-group>
                            </validation-provider>
                            Que los datos consignados son verdaderos, estando la empresa facultada a realizar las
                            verificaciones y aplicar, de ser el caso, las sanciones administrativas contempladas en las
                            normas
                            vigentes.
                            <br>
                            <br>
                            <div v-if="declaro_descanso_medico">
                                FIRMAR EN EL RECUADRO
                                <vueSignature class="mt-1" id="signature" ref="signature" w="100%" h="100%"
                                    :sigOption="option">
                                </vueSignature>
                            </div>

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
                            <v-btn text @click="regresar()" color="normal">ATRAS</v-btn>
                            <!--   <v-btn :disabled="!fc.firma || invalid" color="primary" @click="updateFc">GUARDAR</v-btn> -->
                            <v-btn type="submit" color="primary">GUARDAR</v-btn>
                        </v-card-actions>
                    </form>
                </validation-observer>
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
        data: {},
        option: {
            penColor: "rgb(0, 0, 0)",
            backgroundColor: "rgb(235, 236, 237 )"
        },
        estado: false,
        descanso_medico_producto: false,
        descanso_medico_producto_texto: 'NO',
        declaro_descanso_medico: false,
        centrosMedicos: [
            { id: "1", descripcion: "Clínica Arequipa" },
            { id: "2", descripcion: "Clínica San Juan de Dios" },
            { id: "3", descripcion: "Clínica  Sanna" },
            { id: "4", descripcion: "Clínica  Monte Carmelo" },
            { id: "5", descripcion: "Clínica Auna Valle Sur" },
            { id: "6", descripcion: "Clínica San Pablo" },
            { id: "7", descripcion: "Médico Particular afiliado al PAMF" },
            { id: "8", descripcion: "International SOS" },
            { id: "9", descripcion: "Médico Particular No afiliado al PAMF" }
        ],
        centrosMedicosQuirurgicos: [
            { id: "1", descripcion: "Clínica Arequipa" },
            { id: "2", descripcion: "Clínica San Juan de Dios" },
            { id: "3", descripcion: "Clínica  Sanna" },
            { id: "4", descripcion: "Clínica  Monte Carmelo" },
            { id: "5", descripcion: "Clínica Auna Valle Sur" },
            { id: "6", descripcion: "Clínica San Pablo" },
            { id: "7", descripcion: "Otros (especifique)" }
        ],
        motivoDescansoMedico: [
            { id: "1", descripcion: 'Accidente de trabajo ' },
            { id: "2", descripcion: 'Accidente de transito ' },
            { id: "3", descripcion: 'Accidente común' },
            { id: "4", descripcion: 'Enfermedad' },
            { id: "5", descripcion: "Maternidad" }
        ],
        date: null,
        menu: false,
        modal: false,
        menu2: false,
        documentos_presentados: [],
        documentos: []
    }),
    computed: {
        paciente() {
            return this.$store.state.paciente
        },
        dialog: {
            get() {
                return this.$store.state.dialogConsentimiento
            },
            set(val) {
                this.$store.commit('SET_DIALOG_CONSENTIMIENTO', val)
            }
        },
    },
    watch: {
        // whenever question changes, this function will run
        descanso_medico_producto(data) {
            if (data == true) this.descanso_medico_producto_texto = 'SI'
            if (data == false) this.descanso_medico_producto_texto = 'NO'
        }
    },
    methods: {
        submit() {
            this.$refs.observer.validate();
            this.data.atencion_id = this.$store.state.atencion_id;
            this.data.firma = this.$refs.signature.save('image/jpeg');
            this.$store.dispatch('storeConsentimiento', this.data)
            this.dialog = false;
        },
        seleccionarFoto(e) {
            this.$store.commit('SET_PHOTO', e);
        },
        regresar() {
            this.dialog = false;
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
        async cargarDocumentos() {
            this.documentos = await this.$store.dispatch('fetchDocumentosRequeridos')
        }
    },
    created() {
        this.cargarDocumentos();
    }
}
</script>
  