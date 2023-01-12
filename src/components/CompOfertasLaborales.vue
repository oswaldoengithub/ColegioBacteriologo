<template>
  <v-container mt-8>




    <template>

      <v-data-table
        :loading = "loadTable"
        loading-text="Cargando... Por Favor espere"
        :headers="headers"
        :items="desserts"
        sort-by="NombreOferta"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Busque aqui por nombre de oferta (SOLO MAYÚSCULAS)"
            class="mx-4"
          ></v-text-field>
          <v-toolbar flat>
            <v-toolbar-title
              ><h2>Registro de ofertas laborales</h2></v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="900px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="CargarValores()"
                >
                  Nueva Oferta
                </v-btn>
              </template>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card>
                <v-alert v-if ="PintarErrorSalario == 1" type="error">
                  El salario propuesto no cumple con los estandares del colegio seleccione entre:
                   $  {{new Intl.NumberFormat('es-MX').format(valorminsalario)}} a
                   $ {{new Intl.NumberFormat('es-MX').format (valormaxsalario)}}               
                </v-alert>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :counter="50"
                            :rules="nameRules"
                            v-model="editedItem.NombreOferta"
                            label="Nombre de la oferta"
                            filled
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="TiposContrato"
                            v-model="editedItem.TipoContrato"
                            :rules="RulesTipoContrato"
                            label="Tipo de Contrato"
                            required
                            filled
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.Horario"
                            :rules="RulesHorario"
                            :counter="50"
                            label="Horario"
                            required
                            filled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-textarea
                            name="input-7-4"
                            v-model="editedItem.DescripcionOferta"
                            :counter="400"
                            :rules="RulesDescripcion"
                            label="Descripción de la oferta"
                            filled
                            required
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-textarea
                            name="input-7-4"
                            v-model="editedItem.Perfil"
                            :counter="200"
                            :rules="RulesDescripcion"
                            label="Perfil de la oferta"
                            filled
                            required
                          ></v-textarea>
                        </v-col>

                        <!-- cargo -->
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="TipoCargos"
                            v-model="editedItem.CargoSelect"
                            :rules="[
                              (v) => !!v || 'El cargo es requerido',
                            ]"
                            label="Cargo" 
                            required
                            filled
                          ></v-select>
                       
                            <!-- :rules="RulesSalario" -->
                        
                          <v-text-field
                            :counter="20"
                            :rules="RulesSalario"
                            v-model="editedItem.Salario"
                            label="Salario"
                            filled
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="ListDepartamento"
                            v-model="editedItem.Departamento"
                            :rules="[
                              (v) => !!v || 'El departamento es requerido',
                            ]"
                            filled
                            label="Departamento"
                            dense
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                            :items= FiltraMunicipio
                            v-model="editedItem.Municipio"
                            :rules="[v => !!v || 'El municipio es requerido']"
                            filled
                            label="Municipio"
                            dense
                            ></v-select>
                        </v-col>  
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                            :items= Estado
                            v-model="editedItem.Estado"
                            :rules="[v => !!v || 'El estado es requerido']"
                            filled
                            label="Estado"
                            dense
                            ></v-select>
                        </v-col>  
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Guardar
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

            <v-dialog v-model="dialogAspirante" max-width="900px">

              <v-card>
                <template>
                    <v-card-title>
                      Candidatos para: {{TituloOferta}}
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="searchcandidatos"
                        append-icon="mdi-magnify"
                        label="Buscar Candidatos"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="headerCandidatos"
                      :items="candidatos"
                      :search="searchcandidatos" 
                      :custom-filter="filterOnlyCapsText2"                     
                    >
                    <template v-slot:item.descarga="{ item }">
                    <v-icon
                      class="ml-5"
                      @click="downloadItem(item)"
                    >
                      mdi-download
                    </v-icon>
                    </template>
                    </v-data-table>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeAspirante">
                        Cancelar
                      </v-btn>
<!--                       <v-btn color="blue darken-1" text @click="save">
                        Guardar
                      </v-btn> -->
                    </v-card-actions>
                </template>
                
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogAspiranteError" max-width="700px" >
            <v-card
            elevation="2"
            shaped
            tile
            >
            <v-card-title>NO SE ENCONTRARON ASPIRANTES PARA ESTA OFERTA</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeAspiranteError">
                Cancelar
              </v-btn>
<!--                       <v-btn color="blue darken-1" text @click="save">
                Guardar
              </v-btn> -->
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
                      mdi-account-edit
                    </v-icon>
                  </v-btn>
                </template>

                <span>Editar oferta</span>
              </v-tooltip>
            </v-flex>
            <v-flex>
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
                      @click="VerAspitantes(item)"
                    >
                      mdi-account-multiple-plus
                    </v-icon>
                  </v-btn>
                </template>
                <span>Ver aspirantes</span>
              </v-tooltip>
            </v-flex>
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
import jsPDF from 'jspdf';


export default {
  data: () => ({
    match: '',
    dialog: false,
    search: "",
    searchcandidatos:"",
    valid: true,
    dialogDelete: false,
    dialogAspirante: false,
    dialogAspiranteError:false,
    ListDepartamento: Departamentos,
    ListMcipios: Mcipios,
    loadTable: true,
    TituloOferta:"",
    Cargos:[],
    DatosPostulaciones:[],
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
    candidatos:[],
    headerCandidatos: [
      {
        text: 'NOMBRE DEL CANDIDATO',
        align: 'start',
        sortable: false,
        value: 'NombrePersona',
      },
      { text: 'IDENTIFICACIÓN', value: 'NroId' },
      { text: 'EMAIL', value: 'Email' },
      { text: 'DESCARGAR', value: 'descarga' },          
/*      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' }, */
    ],
    TipoCargos:[],
    AllCargos:[],
    TiposContrato: [
      { value: "Prestación de servicios", text: "Prestación de servicios" },
      { value: "Termino Fijo", text: "Termino Fijo" },
      { value: "Termino Indefinido", text: "Termino Indefinido" },
      { value: "Por obra o labor", text: "Por obra o labor" },
      { value: "Temporal", text: "Temporal" },
    ],

    Estado:[
      { value: true, text: "Activo" },
      { value: false, text: "Inactivo" },      
    ],
    editedIndex: -1,
    editedItem: {
      DescripcionOferta: "",
      Horario: "",
      NombreOferta: "",
      Perfil: "",
      Salario: "",
      TipoContrato: "",
      empresa: "",
      Estado: true,
      Departamento:"",
      Municipio:"",
      CargoSelect:""

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
      Departamento:"",
      Municipio:"" ,
      CargoSelect:""
    },
    IdEmpresa: "",
    valorminsalario:0,
    valormaxsalario:0,
    PintarErrorSalario:0,
    /* Reglas de validacion     */
    nameRules: [
      (v) => !!v || "Campo Nombre de la oferta requerido",
      (v) =>
        (v && v.length <= 50 && v.length > 2) ||
        "El campo debe contener entre 3 y 50 caracteres",
      (v) => /^[a-zA-Z0-9\, áéíóúÁÉÍÓÚñÑ]{3,50}$/.test(v) || "Campo no valido",
    ],
    RulesTipoCargo: [(v) => !!v || "Campo cargo es requerido"],
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
      (v) =>(v && v.length <= 30 && v.length > 2) ||
        "El campo debe contener entre 3 y 20 caracteres",
      (v) => /^[0-9]{3,20}$/.test(v) || "Campo no valido, caracteres ilegales"//,
      //(v) => !( v <= this.valorminsalario || v > this.valormaxsalario)  || "Salario no valido"
      
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Adición de la Oferta"
        : "Edición de la Oferta";
    },

    userLogged() {
      return auth.getUserLogged();
    },

    FiltraMunicipio: function () {
      return this.ListMcipios = Mcipios.filter(mcpio => mcpio.depto == this.editedItem.Departamento);
    }, 
    
    rules() 
    {
      console.log("Wilson")
        const rules = []

        if (this.match) {
          const rule =
                    (v) => !!v || "Campo Salario requerido"
          
          rules.push(rule)
        }
        return rules
      },
   
  },

  watch: {

    match: 'validateField',

    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogAspirante(val) {
      val || this.closeAspirante();
    },
    dialogAspiranteError(val) {
      val || this.closeAspiranteError();
    },    
  },

  created() {
   this.initialize();
  },

  methods: {

    validateField () {
      alert("hola");
        this.$refs.form.validate()
    },

   async CargarValores(){
    this.PintarErrorSalario = 0;
    
    },

    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },

    filterOnlyCapsText2(value, searchcandidatos, item) {
      return (
        value != null &&
        searchcandidatos != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(searchcandidatos) !== -1
      );
    },


    /*       ...mapMutations(['AsignarValoresPersonalesEmpresa','CambiarMuestraFormExperiencia','AsignarValoresPerfilProfesional','AsignarValorLogin','CambiarMuestraFormCursos']),
      ...mapActions(['GuardarDatosEmpresa']), 

      validate() {
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
      //Se llama al API para obtener las ofertas de la empresa en sesion
      const Name = auth.getUserLogged();
      if (this.userLogged != undefined) 
      {
        const Key = "Bearer " + auth.getUserLogged().token;        

        var response = await axios.get(
          "http://104.248.56.215:1337/empresas/mail/" + Name.email,
          {
            headers: {
              Authorization: Key,
            },
          }
        );

        if (response.data) {
          this.desserts = response.data.ofertas.filter(
            (word) => word.Estado == true
          );
          this.loadTable = false
        }
      }

      //const Name = auth.getUserLogged();
      if (this.userLogged != undefined) 
      {
        const Key = "Bearer " + auth.getUserLogged().token;        

          //Trae la lista de cargos actuales para seleccionar
            var response2 = await axios.get(
              "http://104.248.56.215:1337/cargos" ,
            {
              headers: {
                Authorization: Key,
              },
            }
          );

          if (response2.data) {
            this.AllCargos = response2.data;

             for(let item in response2.data)
             {
                  const Cargos = {
                    value: response2.data[item].Descripcion,
                    text:response2.data[item].Descripcion
                  }
                  this.TipoCargos.push(Cargos)
             }

          
         }
      }          
    },

    editItem(item) {
      //console.log("this.desserts:",this.desserts,item)
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.PintarErrorSalario = 0;
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

    async downloadItem(item){

      try {
          //Se realiza consulta de los datos de la persona para armar el PDF de descarga
          const Key = "Bearer " + auth.getUserLogged().token;
          await axios
            .get("http://104.248.56.215:1337/t-personas/" + item.IdPersona, {
              headers: {
                Authorization: Key,
              },
            })
            .then((response) => {

              if (response.data) {
                const doc = new jsPDF();
                //Datos personales
                doc.setFontSize(12);
                doc.text("INFORMACIÓN DEL POSTULANTE", 65, 15);
                doc.text("DATOS PERSONALES", 25, 30);
                doc.setFontSize(10);
                doc.text("NOMBRES:", 25, 40);
                doc.text(response.data.NombrePersona.toUpperCase() +" "+ response.data.ApellidoPersona.toUpperCase(), 70, 40);
                doc.text("IDENTIFICACIÓN:", 25, 45)
                doc.text(response.data.TipoId.toUpperCase() + "-" + response.data.NroId ,70, 45);
                doc.text("FECHA NACIMIENTO:", 25, 50)
                doc.text(response.data.FechaNacimiento ,70, 50);
                doc.text("TELEFONOS:", 25, 55)
                doc.text(response.data.MovilPrincipal + ' - ' + response.data.MovilSecundario ,70, 55);
                doc.text("EMAIL:", 25, 60)
                doc.text(response.data.Email ,70, 60);
                doc.text("DIRECCIÓN:", 25, 65)
                doc.text(response.data.DireccionResidencia ,70, 65);
                //Perfil Profesional
                doc.setFontSize(12);
                doc.text("PERFIL PROFESIONAL", 25, 75);
                doc.setFontSize(10);
                doc.text("TÍTULO:", 25, 85)
                doc.text(response.data.t_perfil_profesionals[0].TituloPerfil.toUpperCase() ,43, 85,{lineHeightFactor: 1.5, maxWidth: 160 });
                doc.text("PERFIL:", 25, 90)
                doc.text(response.data.t_perfil_profesionals[0].DescripcionPerfil,43, 90,{lineHeightFactor: 1.5, maxWidth: 160 });
                //Formaciones
                doc.setFontSize(12);
                doc.text("FORMACIÓN", 25, 110);
                doc.setFontSize(10); 
                let X = 25
                let y = 120
                for (let item = 0; item < response.data.t_formacions.length; item++) 
                  {
                    doc.text(response.data.t_formacions[item].CentroEducativo.toUpperCase() +" - " +response.data.t_formacions[item].Nivel.toUpperCase() ,X, y);
                    doc.text("Desde "+response.data.t_formacions[item].AnioInicial +"-"+ response.data.t_formacions[item].MesInicial + " hasta "+response.data.t_formacions[item].AnioFinal +"-"+ response.data.t_formacions[item].MesFinal ,X, y+5);
                   // doc.text(" hasta "+response.data.t_formacions[item].AnioFinal +"-"+ response.data.t_formacions[item].MesFinal ,70, 125);
                    y = y + 15;
                  } 

                let z = 25
                let k = 190
                //para las experinecias
                doc.setFontSize(12);
                doc.text("EXPERIENCIA PROFESIONAL", 25, 180);   
                doc.setFontSize(10);             
                for (let item = 0; item < response.data.t_experiencias.length; item++) 
                  {
                    doc.text(response.data.t_experiencias[item].NombreEmpresa.toUpperCase() +" - " +response.data.t_experiencias[item].Cargo.toUpperCase() ,z, k);
                    doc.text("Desde "+response.data.t_experiencias[item].AnioInicial +"-"+ response.data.t_experiencias[item].MesInicial + " hasta "+response.data.t_experiencias[item].AnioFinal +"-"+ response.data.t_experiencias[item].MesFinal ,z, k+5);
                   // doc.text(" hasta "+response.data.t_formacions[item].AnioFinal +"-"+ response.data.t_formacions[item].MesFinal ,70, 125);
                    k = k + 15;
                  }    
                  
                  
                let a = 25
                let b = 25
                doc.addPage();
                //para las experinecias
                doc.setFontSize(12);
                doc.text("CURSOS", a, b);   
                doc.setFontSize(10);             
                for (let item = 0; item < response.data.t_cursos.length; item++) 
                  {
                    doc.text(response.data.t_cursos[item].CentroEducativo.toUpperCase() +" - " +response.data.t_cursos[item].NombreCurso.toUpperCase() ,a, b+10);
                    doc.text("TEMPORALIDAD "+response.data.t_cursos[item].CantidadTiempo +"-"+ response.data.t_cursos[item].Temporalidad ,a, b+15);
                   // doc.text(" hasta "+response.data.t_formacions[item].AnioFinal +"-"+ response.data.t_formacions[item].MesFinal ,70, 125);
                    b = b + 15;
                  }                     

                doc.save("HojaVida.pdf"); 


              } else {
                alert("Error al tratar traer el aspirante");
              }
            });
      } catch (error) {
        console.log(error)        
      }
    },

    async VerAspitantes(item){

      const idOferta = item.id

      try 
      {
          //Se realiza consulta de los candidatos de una oferta determinada
          const Key = "Bearer " + auth.getUserLogged().token;
          await axios
            .get("http://104.248.56.215:1337/postulaciones/", {
              headers: {
                Authorization: Key,
              },
            })
            .then((response) => {
              if (response.data) {
                this.candidatos = []
                //this.candidatos.push(response.data.t_persona)
                this.DatosPostulaciones = response.data;
                 const Postulante = []
                 for(let item2 in this.DatosPostulaciones)
                //for (let item2 = 0; item2 < this.DatosPostulaciones.length; item2++) 
                  {
                    Postulante.push({
                    NombrePersona:this.DatosPostulaciones[item2].t_persona.NombrePersona.toUpperCase() + " " + this.DatosPostulaciones[item2].t_persona.ApellidoPersona.toUpperCase(),
                    NroId:this.DatosPostulaciones[item2].t_persona.TipoId.toUpperCase() +"-"+this.DatosPostulaciones[item2].t_persona.NroId,
                    Email:this.DatosPostulaciones[item2].t_persona.Email,
                    IdPersona:this.DatosPostulaciones[item2].t_persona.id,
                    IdOferta: this.DatosPostulaciones[item2].oferta.id
                    })

                    this.candidatos.push(Postulante[item2])
                  } 

                  //console.log("this.candidatos:",this.candidatos)

                  this.candidatos = this.candidatos.filter(oferta => oferta.IdOferta == item.id);
                  //console.log("this.candidatos:",this.candidatos)
                  if(this.candidatos.length == 0){
                    this.dialogAspiranteError = true
                  }
              } else {
                alert("Error al tratar traer el aspirante");
              }
            });

            if(this.candidatos.length == 0){              
              this.dialogAspirante = false
            }else{
              this.TituloOferta = item.NombreOferta;
              this.dialogAspirante = true
            }

      } catch (error) {
        this.dialogAspiranteError = true
        console.log(error)
        
      }

    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeAspirante() {
      this.dialogAspirante = false;
    },

    closeAspiranteError() {
      this.dialogAspiranteError = false;
    },

    async save() 
    {    
      
      if (this.$refs.form.validate()) {

            const result = this.AllCargos.filter(word => word.Descripcion == this.editedItem.CargoSelect);
            this.valorminsalario = result[0].SalarioMinimo
            this.valormaxsalario = result[0].SalarioMaximo

            if(parseInt(this.editedItem.Salario) <= parseInt(this.valorminsalario) || parseInt(this.editedItem.Salario) > parseInt(this.valormaxsalario))   
            {
              this.PintarErrorSalario = 1;
             
            }
            else
            {

                if (this.$refs.form.validate()) {
                  if (this.editedIndex > -1) {
                    //Edicion del registro
                    const Key = "Bearer " + auth.getUserLogged().token;
                    //console.log("this.editedItem:", this.editedItem);
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
                    //console.log("this.editedItem:", this.editedItem);
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

                this.PintarErrorSalario = 0;
            }
    }

    },


  },
};
</script>