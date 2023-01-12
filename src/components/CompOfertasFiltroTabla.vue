<template>
  <v-container mt-8>
    <template>
      <v-data-table
        
        :headers="headers"
        :items="FiltraOfertas"
        sort-by="NombreOferta"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
        <template v-slot:top>
<!--           <v-text-field
            v-model="search"
            label="Busque aqui por nombre de oferta (SOLO MAYÚSCULAS)"
            class="mx-4"
          ></v-text-field> -->
          <v-card>
            <v-form ref="form2" v-model="valid2" lazy-validation>
              <v-layout class="justify-center">
                <v-flex mt-3 xs8 md1>
                  <v-icon class="justify-center" style="font-size: 50px"
                    >mdi-file-find</v-icon
                  >
                </v-flex>
                <v-flex mt-3 xs8>
                  <v-text-field
                    :counter="50"
                    :rules="BuscaCargoRules"
                    v-model="VCargo"
                    label="Cargo o área profesional"
                    filled
                    required
                  >
                  </v-text-field>
                </v-flex>

                <!-- separador -->
                <span style="color: white">-</span>

                <v-flex mt-3 xs8 md1>
                  <v-icon style="font-size: 50px"
                    >mdi-map-marker-outline</v-icon
                  >
                </v-flex>

                <v-flex mt-3 xs8>
                  <v-select
                    :items="ListDepartamento"
                    v-model="VDepartamento"
                    :rules="[(v) => !!v || 'El departamento es requerido']"
                    filled
                    label="Departamento"
                    dense
                  ></v-select>
                </v-flex>
              </v-layout>
            
            <v-card-actions class="justify-center">
               <v-btn
                :disabled="!valid"
                color="info"
                @click="FiltrarOfertasForm()"
                small
                class="mb-2"
              >
                Buscar
              </v-btn>
              <v-btn
                :disabled="!valid"
                color="info"
                @click="DeleteFilter"
                small
                class="mb-2"
              >
                Limpiar
              </v-btn>               
            </v-card-actions>
          </v-form>
          </v-card>
          <v-toolbar flat >
            <v-toolbar-title
              ><h2 class="mt-3">Ofertas laborales para: {{ CargoFiltro }}</h2>
              <v-btn
                class="mb-10"
                small
                outlined
                color="primary"
                style="position: right; bottom: 0"
                @click="DeleteFilter"
                >ver todas las ofertas</v-btn
              >
              <v-btn
                class="ml-5 mb-10"
                small
                outlined
                color="success"
                style="position: right; bottom: 0"
                @click="MisPostulaciones"
                >Mis postulaciones</v-btn
              >
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="900px">
              <!--               <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nueva Oferta
                </v-btn>
              </template> -->
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card>
                  <v-alert v-if="AplicacionExitosa == '1'" type="success">
                    Usted aplico con exito a la oferta
                  </v-alert>
                  <v-alert v-if="AplicacionExitosa == '0'" type="error">
                    Error al tratar de aplicar a la oferta - no es posible
                    aplicar dos veces a la misma oferta
                  </v-alert>
                  <v-alert color="red" dark dense icon="mdi-school" prominent type="error" v-if="AplicacionNoRethus == '1'">
                  Error al tratar de aplicar a la oferta - no es posible
                    aplicar si no esta inscrito en Rethus
                  </v-alert>

                  <v-card-title>
                    <span class="text-h5">Descripción de la oferta</span>
                  </v-card-title>

                  <v-card-title>{{ editedItem.NombreOferta }} </v-card-title>
                  <v-card-text
                    >Descripcion Oferta:
                    {{ editedItem.DescripcionOferta }}</v-card-text
                  >
                  <v-card-subtitle
                    >Perfil requerido: {{ editedItem.Perfil }}</v-card-subtitle
                  >
                  <v-card-text>Horario: {{ editedItem.Horario }}</v-card-text>
                  <v-card-text
                    >Tipo Contrato: {{ editedItem.TipoContrato }}</v-card-text
                  >
                  <v-card-text
                    >Salario: ${{
                      new Intl.NumberFormat("de-DE").format(editedItem.Salario)
                    }}</v-card-text
                  >
                <v-card-text
                    >Ciudad: {{ValorMcipio}} </v-card-text
                  >              

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Salir
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="AplicarOferta">
                      Aplicar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Seguro que quiere eliminar esta oferta?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-layout>
            <v-flex>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue lighten-2" fab small>
                    <v-icon
                      small
                      dark
                      v-bind="attrs"
                      v-on="on"
                      style="font-size: 35px"
                      @click="editItem(item)"
                    >
                      mdi-eye-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>Ver oferta</span>
              </v-tooltip>
            </v-flex>
            <!--             <v-flex>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ml-0" color="red lighten-2" fab small>
                    <v-icon
                      dark
                      small
                      v-bind="attrs"
                      v-on="on"
                      style="font-size: 35px"
                      @click="deleteItem(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Eliminar oferta</span>
              </v-tooltip>
            </v-flex>
            <v-flex>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ml-0" color="yellow lighten-2" fab small>
                    <v-icon
                      dark
                      small
                      v-bind="attrs"
                      v-on="on"
                      style="font-size: 35px"
                      @click="deleteItem(item)"
                    >
                      mdi-account-multiple-plus
                    </v-icon>
                  </v-btn>
                </template>
                <span>Verificar aspirantes</span>
              </v-tooltip>
            </v-flex>
 -->
          </v-layout>

          <!--           <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>

          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </template>
  </v-container>
</template>


<script>
import auth from "@/auth";
import axios from "axios";
import Departamentos from "../Data/Departamentos.js";
import Mcipios from "../Data/Municipios.js";
import { mapActions, mapMutations, mapState } from "vuex";
import store from "../store/index.js";

export default {
  data: () => ({
    McipioValor:"",
    jsonMunicipio:[],
    ListOfertas: [],
    dialog: false,
    search: "",
    valid: true,
    valid2: true,
    dialogDelete: false,
    ListDepartamento: Departamentos,
    ListMcipios: Mcipios,
    loadTable: true,
    VCargo: "",
    VDepartamento: "",
    ValMcipio:"",
    headers: [
      {
        text: "NOMBRE DE LA OFERTA",
        align: "start",
        sortable: false,
        value: "NombreOferta",
      },
      /* { text: "DESCRIPCIÓN OFERTA", value: "DescripcionOferta" }, */
      { text: "TIPO CONTRATO", value: "TipoContrato" },
      /*       { text: "HORARIO", value: "Horario" },
      { text: "PERFIL", value: "Perfil" }, */
      { text: "SALARIO", value: "Salario" },
      { text: "ACCIONES", value: "actions", sortable: false },
    ],
    desserts: [],
    TiposContrato: [
      { value: "Prestación de servicios", text: "Prestación de servicios" },
      { value: "Termino Fijo", text: "Termino Fijo" },
      { value: "Termino Indefinido", text: "Termino Indefinido" },
      { value: "Por obra o labor", text: "Por obra o labor" },
      { value: "Temporal", text: "Temporal" },
    ],
    Estado: [
      { value: true, text: "Activo" },
      { value: false, text: "Inactivo" },
    ],
    editedIndex: -1,
    ciudad: {
      depto: "",
      text: "",
      value: ""
    },    
    editedItem: {
      DescripcionOferta: "",
      Horario: "",
      NombreOferta: "",
      Perfil: "",
      Salario: "",
      TipoContrato: "",
      empresa: "",
      Estado: true,
      Departamento: "",
      Municipio: "",
    },
    defaultItem: {
      DescripcionOferta: "",
      Horario: "",
      NombreOferta: "",
      Perfil: "",
      Salario: "",
      TipoContrato: "",
      empresa: "",
      Estado: "",
      Departamento: "",
      Municipio: "",
    },
    IdPersona: "",
    AplicacionExitosa: 0,
    AplicacionNoRethus:"",
    NombreOfertaAplicar: "ssss",
    NroIdPersona: "",
    TipoIdPersona:"",
    IdRethus : 0,
    /* Reglas de validacion     */
    nameRules: [
      (v) => !!v || "Campo Nombre de la oferta requerido",
      (v) =>
        (v && v.length <= 50 && v.length > 2) ||
        "El campo debe contener entre 3 y 50 caracteres",
      (v) => /^[a-zA-Z0-9\, áéíóúÁÉÍÓÚñÑ]{3,50}$/.test(v) || "Campo no valido",
    ],
    RulesTipoContrato: [(v) => !!v || "Campo Horario es requerido"],
    RulesHorario: [
      (v) => !!v || "Campo Horario requerido",
      (v) =>
        (v && v.length <= 50 && v.length > 2) ||
        "El campo debe contener entre 3 y 50 caracteres",
      (v) =>
        /^[a-zA-Z0-9\, -.:,áéíóúÁÉÍÓÚñÑ]{3,50}$/.test(v) || "Campo no valido",
    ],
    RulesDescripcion: [
      (v) => !!v || "Campo requerido",
      (v) =>
        (v && v.length <= 400 && v.length > 2) ||
        "El campo debe contener entre 3 y 400 caracteres",
      (v) =>
        /^[a-zA-Z0-9\, -.,áéíóúÁÉÍÓÚñÑ]{3,400}$/.test(v) || "Campo no valido",
    ],
    RulesSalario: [
      (v) => !!v || "Campo Salario requerido",
      (v) =>
        (v && v.length <= 30 && v.length > 2) ||
        "El campo debe contener entre 3 y 20 caracteres",
      (v) => /^[0-9]{3,20}$/.test(v) || "Campo no valido",
    ],
    /* Reglas de validacion     */
    BuscaCargoRules: [
      (v) => !!v || "Campo requerido",
      (v) =>
        (v && v.length <= 50 && v.length > 2) ||
        "El campo debe contener entre 3 y 50 caracteres",
      (v) => /^[a-zA-Z0-9\ ,áéíóú-]{3,50}$/.test(v) || "Campo no valido",
    ],
  }),

  computed: {
    ...mapState(["CargoFiltro", "DeptoFiltro", "DataFiltroOferta","DataFiltroAplicacionOferta"]),

    formTitle() {
      return this.editedIndex === -1
        ? "Adición de Ofertar"
        : "Edición de Ofertar";
    },

    ValorMcipio(){

      if (this.McipioValor == ""){
        this.ciudad = JSON.parse(JSON.stringify(Mcipios.filter((mcpio) => mcpio.value == 11001))) 
      }else{
        this.ciudad = JSON.parse(JSON.stringify(Mcipios.filter((mcpio) => mcpio.value == this.McipioValor)))
      }
      return this.ciudad[0].text
    },

    userLogged() {  
      return auth.getUserLogged();
    },

    FiltraMunicipio: function () {
      return (
        this.ListMcipios = Mcipios.filter((mcpio) => mcpio.depto == this.editedItem.Departamento).text
        );
    },
    


    FiltraOfertas() {
      let expresion = new RegExp(`${store.state.CargoFiltro}.*`, "i");
      let expresion2 = new RegExp(`${store.state.DeptoFiltro}.*`, "i");

      this.ListOfertas = store.state.DataFiltroOferta.filter(
        (oferta) =>
          expresion.test(oferta.NombreOferta) &&
          expresion2.test(oferta.Departamento)
      );

      if (this.ListOfertas.length > 0) {
        this.loadTable = false;
      } else {
        this.loadTable = true;
      }

      return this.ListOfertas;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {



    FiltrarOfertasForm() {
      // alert("hola")
      if (this.$refs.form2.validate()) {
        store.commit("AsignarValoresFiltroOferta", {
          CargoFiltro: this.VCargo,
          DeptoFiltro: this.VDepartamento,
        });
       } else {
        this.$refs.form2.validate();
      } 
    },


    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
    ...mapMutations([""]),
    ...mapActions(["GetDatosOfertaFiltro","GetDatosAplicaciones"]),


    MisPostulaciones() {

        store.dispatch("GetDatosAplicaciones"); 


/*       console.log("store.state.DataFiltroOferta:",store.state.DataFiltroOferta)
      this.ListOfertas = store.state.DataFiltroOferta.filter((oferta) => oferta.oferta_persona.IdPersona == 76)
      return this.ListOfertas; */
    },

    
  /*     validate() {
        this.$refs.form.validate()
      },      
     
      reset () {
        this.$refs.form.reset()
      },
      
      resetValidation () {
        this.$refs.form.resetValidation()
      },
*/

    async initialize() {
      store.dispatch("GetDatosOfertaFiltro");

    },

    async DeleteFilter() {
      store.commit("AsignarValoresFiltroOferta", {
        CargoFiltro: "",
        DeptoFiltro: "",
      });

      store.dispatch("GetDatosOfertaFiltro");

      this.VDepartamento = ""
      this.VCargo = ""
      this.valid = true
      },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.AplicacionExitosa = "";
      this.McipioValor = this.editedItem.Municipio
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.AplicacionNoRethus = 0;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async AplicarOferta() {
      //Inserta el registro Llamado al API para almacenar los datos
      const Key = "Bearer " + auth.getUserLogged().token;
      const EmailLogin = auth.getUserLogged().email;
      await axios
        .get("http://104.248.56.215:1337/t-personas/mail/" + EmailLogin, {
          headers: {
            Authorization: Key,
          },
        })
        .then((response) => {
          if (response.data) {
            this.IdPersona = response.data.id;
            this.NroIdPersona = response.data.NroId;
            this.TipoIdPersona = response.data.TipoId;
          } else {
            alert("Error al tratar traer el id de la empresa");
          }
        });

      //Sentencia para validar si el profesional se encuentra en Rethus
      await axios
        .get("http://104.248.56.215:1337/Rethuses?NroId=" + this.NroIdPersona +"&TipoId="+this.TipoIdPersona, {
          headers: {
            Authorization: Key,
          },
        })
        .then((response) => {
          if (response.data) {
            try {
              this.IdRethus = response.data[0].id;
            } catch (error) {
              this.IdRethus = 0
            }
            
          } else {
            alert("Error al tratar traer el id de la empresa");
          }
        });


      // Puede aplicar siempre y cuando exista en la tabla de Rethus
      if (this.IdRethus != 0) 
      {
            const OfertaPersona = {
              IdOferta: this.editedItem.id,
              IdPersona: this.IdPersona,
              t_persona: this.IdPersona,
              oferta:this.editedItem.id
            };

            try {
              await axios
                .post("http://104.248.56.215:1337/postulaciones/", OfertaPersona, {
                  headers: {
                    Authorization: Key,
                  },
                })
                .then((response) => {
                  //console.log(response.data)
                  if (response.data) {
                    //this.initialize();
                    this.AplicacionExitosa = 1;
                    console.log("Registro de la postulacion insertado con éxito");
                  } else {
                    console.log(
                      "Error al tratar de insertar el registro de la postulacion"
                    );
                  }
                });
            } catch (error) {
              console.log(error);
              this.AplicacionExitosa = 0;
            }
      }
      else{
          this.AplicacionNoRethus = 1;
      }


    },

    async save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          //Edicion del registro
          const Key = "Bearer " + auth.getUserLogged().token;
          axios
            .put(
              "http://104.248.56.215:1337/ofertas/" + this.editedItem.id,
              this.editedItem,
              {
                headers: {
                  Authorization: Key,
                },
              }
            )
            .then((response) => {
              //console.log(response.data)
              if (response.data) {
                console.log("Registro Editado con éxito");
                this.initialize();
              } else {
                console.log("Error al tratar de editar el registro");
              }
            })
            .catch(
              (e) =>
                function (error) {
                  console.log(error);
                }
            );
        } else {
          //Se realiza consulta del id de la empresa
          const Key = "Bearer " + auth.getUserLogged().token;
          const EmailLogin = auth.getUserLogged().email;
          await axios
            .get("http://104.248.56.215:1337/empresas/mail/" + EmailLogin, {
              headers: {
                Authorization: Key,
              },
            })
            .then((response) => {
              if (response.data) {
                this.IdEmpresa = response.data.id;
              } else {
                alert("Error al tratar traer el id de la empresa");
              }
            });

          //Inserta el registro Llamado al API para almacenar los datos
          this.editedItem.empresa = this.IdEmpresa;
          console.log("this.editedItem:", this.editedItem);
          axios
            .post("http://104.248.56.215:1337/ofertas/", this.editedItem, {
              headers: {
                Authorization: Key,
              },
            })
            .then((response) => {
              //console.log(response.data)
              if (response.data) {
                this.initialize();
                console.log("Registro de la oferta insertado con éxito");
              } else {
                console.log(
                  "Error al tratar de insertar el registro de la oferta"
                );
              }
            })
            .catch(
              (e) =>
                function (error) {
                  console.log(error);
                }
            );
        }
        this.close();
      } else {
        this.$refs.form.validate();
      }
    },
  },
};
</script>