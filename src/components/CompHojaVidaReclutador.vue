<template>

  <v-container class="white" mt-0>
    <h1>Registro de reclutadores</h1>
    <!--Mensaje de alerta cuando los datos personales estan errados -->
    <!--     Mensaje de alerta cuando los datos de perfil estan errados 
        <v-alert v-if ="ValidPerfil == true" type="error">
          Para poder continuar revise los campos de Perfil Profesional 
        </v-alert> -->

        <br/>


      <template fluid>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
            >
              Datos de la empresa
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
            >
              Tipo de empresa 
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 3"
              step="3"
            >
              Datos de persona de contacto
            </v-stepper-step>

          

          </v-stepper-header>

          <v-stepper-items>
            <v-form   ref="form"
                      v-model="valid"
                      lazy-validation> 


                <v-stepper-content step="1">

                  <v-card
                    class="mb-12"
                    color="brown lighten-5"
                    height="43  0px"
                  >
                      <v-container >

                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ NOMBRES -------------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->

                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon  class="justify-center" style="font-size: 50px;">mdi-factory</v-icon>
                            </v-flex>
                            </div>
                          <v-flex  xs4 >
                            <v-text-field
                            :counter="20"
                            :rules="nameRules"
                            v-model="VNombreEmpresa"
                            label="Nombre comercial de la empresa"
                            filled                                                   
                            required
                            >
                            </v-text-field>
                          </v-flex>  

                          <!-- separador -->
                          <span style="color:white">-</span>  

                          <v-flex  xs4>
                            <v-text-field
                            v-model="VNroId"
                            :counter="10"
                            :rules="NroIdRules"
                            label="NIT de la empresa "
                            filled                        
                            required
                            >
                            </v-text-field>
                          </v-flex>             
                        </v-layout>

                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ SECTOR EMPRESA -----------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->              
                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px">mdi-wallet-travel</v-icon>
                            </v-flex>
                            </div>
                          <v-flex  xs4>
                            <v-select
                            :items="SectorEmpresa"
                            v-model="VSectorEmpresa"
                            :rules="[v => !!v || 'El sector es requerido']"
                            label="Sector de empresa"
                            required
                            ></v-select>
                          </v-flex>

                          <span style="color:white">-</span> 

                          <v-flex  xs4>
                            <v-select
                            :items="NroTrabajadores"
                            v-model="VVNroTrabajadores"
                            :rules="[v => !!v || 'Número de trabajadores es requerido']"
                            label="Número de trabajadores"
                            required
                            ></v-select>
                          </v-flex> 
                        </v-layout> 

                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ UBICACION -----------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->                 
                        <v-layout class="justify-center">
                            <div class="justify-left">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px">mdi-city</v-icon>
                            </v-flex>
                            </div>

                          <v-flex  xs4>
                            <v-select
                            :items="ListDepartamento"
                            v-model="VDepto"
                            :rules="[v => !!v || 'El departamento es requerido']"
                            filled
                            label="Departamento"
                            dense
                            ></v-select>
                          </v-flex>

                          <!-- separador -->
                          <span style="color:white">-</span> 

                          <v-flex  xs4>
                            <v-select
                            :items= FiltraMunicipio
                            v-model="VMuni"
                            :rules="[v => !!v || 'El municipio es requerido']"
                            filled
                            label="Municipio"
                            dense
                            ></v-select>
                          </v-flex>
                          
                        </v-layout>    


                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ DIRECCION -------------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->
                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px">mdi-cellphone-basic</v-icon>
                            </v-flex>
                            </div>

                            <v-flex  xs4 >
                            <v-text-field
                            v-model="VTelefono"
                            :counter="20"
                            :rules="telRules"
                            label="Telefono Movil principal"
                            filled                        
                            required
                            >
                            </v-text-field>
                          </v-flex> 


                          <!-- separador -->
                          <span style="color:white">-</span>    
                          <v-flex  xs4 >
                          <v-text-field
                            v-model="VTelefono2"
                            :counter="20"
                            :rules="telRules"
                            label="Telefono Movil secundario"
                            filled                        
                            required
                            >
                            </v-text-field>
                          </v-flex>               

                        </v-layout> 

                        <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ EMAIL Y DIRECCION -------------------------------------------------
                      ---------------------------------------------------------------------------------------------------- --> 
                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px">mdi-gmail</v-icon>
                            </v-flex>
                            </div>

                            <v-flex  xs4 >
                            <v-text-field
                            v-model="VMail"
                            :counter="50"
                            :rules="emailRules"
                            label="Correo Electrónico"
                            filled                        
                            required
                            disabled
                            >
                            </v-text-field>
                          </v-flex> 


                          <!-- separador -->
                          <span style="color:white">-</span>             

                          <v-flex  xs4 >
                            <v-text-field
                            v-model="VDireccion"
                            :counter="40"
                            :rules="DireccionlRules"
                            label="Direccion"
                            filled                        
                            required
                            >
                            </v-text-field>
                          </v-flex>  

                      
                        </v-layout>                                        


                      </v-container>           
                  
                  </v-card>

                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="ValidarFormularioPersonales()"
                    small
                  >
                    Siguiente
                  </v-btn>

                  <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
                    small
                  >
                    Limpiar
                  </v-btn>


                  <!-- @click="e1 = 2" -->
                <!--   <v-btn
                    color="primary"              
                    @click="e1 = 2"
                    small
                  >
                    Siguiente
                  </v-btn>  -->

                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card
                    class="mb-12"
                    color="brown lighten-5"
                    height="350px"
                  >
                    <!-- llamado al componente de PERFIL PROFESIONAL -->
                    <div>
                      <PerfilEmpresa/>  
                    </div>   

                  </v-card>

                  <v-btn
                    color="primary"
                    :disabled="!ValidarGuardarEmpresa"
                    @click="ValidarTipoEmpresa()"                    
                    small
                  >
                    Siguiente
                  </v-btn> 

                 
                  <v-btn small class="ml-4" @click="Atras()" color="accent">
                    Regresar
                  </v-btn>
                </v-stepper-content>          

                <v-stepper-content step="3">
                
                  <v-alert v-if = "ActualizacionExitosaEmpresa == true" color="green lighten-4">
                    Los datos de la empresa se actualizaron con éxito 
                  </v-alert> 

                  <v-card
                    class="mb-12"
                    color="brown lighten-5"          
                  >
                  <br/>

                         <v-layout class="justify-center">
                            <div class="justify-center">

                            <v-flex >

<!--                             <v-btn @click="AñadirFormacion()" color="info" outlined center>
                                <v-icon left style="font-size: 25px" >mdi-account-multiple-plus</v-icon>
                                  Añadir Formación
                            </v-btn>     -->                      
                              
                            </v-flex> 
                            </div>                  
                        </v-layout>

                  <!-- llamado al componente de formación, es pintado el numero de cantidades que tenga la variable CantFormacion -->
                  <div >
                    <DatosPersonaContacto/> 
                  </div> 
            
                </v-card>

<!--                   <v-btn
                    color="primary"
                    :disabled="!ValidoDatosContacto"                    
                    @click="e1 = 3"
                    small
                  >
                    Siguiente
                  </v-btn>  -->

            
                  <v-btn small color="primary" :disabled="!ValidarGuardarContacto" @click="ValidarFormularioContacto()">Guardar Datos Empresa</v-btn>
                  <v-btn small class="ml-4" @click="Atras()" color="accent">Regresar</v-btn>

                </v-stepper-content>

            </v-form>



          </v-stepper-items>
        </v-stepper>
      </template>


  </v-container>
  
</template>

<script>
import DatePicker from "../components/DatePicker";
import DatosPersonaContacto from "../components/DatosPersonaContacto.vue";
import PerfilEmpresa from "../components/PerfilEmpresa.vue";
import ExperienciaProfesional from "../components/ExperienciaProfesional.vue";
/* import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate' */
import { email, required, digits , max, regex} from '@vuelidate/validators'
import { useVuelidate,ValidationObserver, ValidationProvider,extend,minLength,alphaNum,numeric} from '@vuelidate/core'
import Departamentos from "../Data/Departamentos.js";
import Mcipios from "../Data/Municipios.js";
import {mapActions, mapMutations, mapState} from 'vuex';
import store from "../store/index.js";
import axios from "axios";
import auth from "@/auth";
import Cursos from './Cursos.vue';
import Curso from "../components/Cursos.vue";


  export default {
    components: {
        DatePicker,
        DatosPersonaContacto,
        ValidationProvider,
        ValidationObserver,
        ExperienciaProfesional,
        PerfilEmpresa,
        Cursos,
        Curso
    },
    data: () => ({
      //Datos del formulario Empresa
      VNombreEmpresa:"",
      VNroId:"",
      VSectorEmpresa:"",
      VVNroTrabajadores:"",
      VDepto:"",
      VMuni:"",
      VTelefono:"",
      VTelefono2:"",
      VMail:"",
      VDireccion:"", 

      VFecha:null,      
      ListDepartamento: Departamentos,
      ListMcipios: Mcipios,
      municipio:"",
      telefono:"",
      ameRules:"",
      e1:1,
      CantFormacion: 1,
      CantExperiencia:1,
      valid: true,
      name: '',


      SectorEmpresa:[
          { value: '1', text: 'Educación' },
          { value: '2', text: 'Gobierno' },
          { value: '3', text: 'RRHH / Personal' },
          { value: '4', text: 'Salud Medicina' },
          { value: '5', text: 'Telecomunicaciones' },
          { value: '6', text: 'Transporte' },
          { value: '7', text: 'Fabricacion' },  
          { value: '8', text: 'Hosteleria y Turismo' }, 
          { value: '9', text: 'Ventas' }, 
          { value: '10', text: 'Otros' }, 

      ],

      NroTrabajadores: [
          /* { value: null, text: 'Por favor seleccione tipo de identificación' }, */
          { value: '1', text: 'De 1 a 5 trabajadores' },
          { value: '2', text: 'De 6 a 10 trabajadores' },
          { value: '3', text: 'De 11 a 50 trabajadores' },
          { value: '4', text: 'De 51 a 100 trabajadores' },
          { value: '5', text: 'De 101 a 250 trabajadores' },
          { value: '6', text: 'De 251 a 500 trabajadores' },
          { value: '7', text: 'Mas de 500 trabajadores' },
        ],  
 

      municipio: [
          { value: null, text: 'Por favor seleccione un género' },
          { value: '1', text: 'Hombre' },
          { value: '0', text: 'Mujer' }
        ],  
      email: '',      
      /* Reglas de validacion     */               
      nameRules: [
        v => !!v || 'Campo requerido',
        v => (v && v.length <= 20 && v.length > 2) || 'El campo debe contener entre 3 y 20 caracteres',
        v => /^[a-zA-Z1-9\ ]{3,20}$/.test(v) || 'Campo no valido'
      ],
      nameContactoRules:[
        v => !!v || 'Campo requerido',
        v => (v && v.length <= 80 && v.length > 2) || 'El campo debe contener entre 3 y 80 caracteres',
        v => /^[a-zA-Z\ ]{3,80}$/.test(v) || 'Campo no valido'
      ],    
      TipoIdRules:[
        [v => !!v || 'Item is required']
      ], 
      FNacimientodRules: [
        v => !!v || 'Fecha nacimiento es requerida',
        v => /^[0-9]{4}(-[0-9]{2}){2}$/.test(v) || 'Fecha Nacimiento no valida'
      ],
      telRules:[
        v => !!v || 'El número de telefono es requerido',
        v => /^[0-9]{3,12}$/.test(v) || 'Número telefonico incorrecto'
      ],     
      emailRules: [
        v => (v && v.length <= 50 && v.length > 2) || 'El campo debe contener entre 3 y 50 caracteres',
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Campo E-mail no valido',
      ],
      NroIdRules: [
        v => !!v || 'Número de Identificacion es requerido',
        v => /^[0-9]{3,10}$/.test(v) || 'Número de Identificacion no valido, mas de 3 y menos de 11 digitos',
      ],
      DireccionlRules:[
         v => !!v || 'Campo requerido',
        v => (v && v.length <= 40 && v.length > 2) || 'El campo debe contener entre 3 y 40 caracteres',
        v => /^[a-zA-Z0-9\ ,áéíóú-]{3,40}$/.test(v) || 'Campo no valido'       
      ],
      ShowForm:0,
      select: null,
      checkbox: false
      
    }),

    beforeMount() {
      const Name = auth.getUserLogged();
      
      if(this.userLogged == undefined)
      {
          store.commit('AsignarValorLoginEmpresa', { ValorLoginEmpresa: 0 , user:'',tipoususrio :'' });
      }
      else
      {
          store.commit('AsignarValorLoginEmpresa', { ValorLoginEmpresa: 1 , user:Name.username ,tipoususrio :Name.tipousuario});
          store.commit('IndicadorActualizacionHVEmpresa', { valor: false }) 
          //Se asignan los valores de datos personales sacdos del API a los Vmodels del formulario
          this.VNombreEmpresa     = store.state.DatosPersonalesEmpresa[0].NombreEmpresa
          this.VNroId             = store.state.DatosPersonalesEmpresa[0].Nit;
          this.VSectorEmpresa     = store.state.DatosPersonalesEmpresa[0].Sector;
          this.VVNroTrabajadores  = store.state.DatosPersonalesEmpresa[0].NoTrabajadores;
          this.VDepto             = store.state.DatosPersonalesEmpresa[0].Departamento;
          this.VMuni              = store.state.DatosPersonalesEmpresa[0].Municipio;
          this.VTelefono          = store.state.DatosPersonalesEmpresa[0].Telefono1;
          this.VTelefono2         = store.state.DatosPersonalesEmpresa[0].Telefono2;
          this.VMail              = Name.email;
          this.VDireccion         = store.state.DatosPersonalesEmpresa[0].Direccion;      
      }       
    },

    setup: () => ({ v$: useVuelidate() }),


    methods: {

      ...mapMutations(['AsignarValoresPersonalesEmpresa','CambiarMuestraFormExperiencia','AsignarValoresPerfilProfesional','AsignarValorLogin','CambiarMuestraFormCursos','IndicadorActualizacionHVEmpresa']),
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
    
      ValidarFormularioPersonales(){
      
         if (this.$refs.form.validate())
        {
             this.valid = this.$refs.form.validate()
             this.e1 = this.e1 + 1

             console.log("this.VNombreEmpresa_",this.VNombreEmpresa)

            store.commit('AsignarValoresPersonalesEmpresa', {  NombreEmpresa: this.VNombreEmpresa, 
                                                               Nit:this.VNroId, 
                                                               Sector:this.VSectorEmpresa, 
                                                               NoTrabajadores: this.VVNroTrabajadores ,
                                                               Departamento: this.VDepto,
                                                               Municipio:this.VMuni,
                                                               Telefono1:this.VTelefono,
                                                               Telefono2: this.VTelefono2,
                                                               Email: this.VMail,
                                                               Direccion:this.VDireccion });      
            /*  store.commit('CambiarMuestraForm', { show: 0 });
             */
        }
        else{
          this.$refs.form.validate()
        } 

      }, 

      ValidarTipoEmpresa(){
        console.log("ValidarGuardarEmpresa",this.ValidarGuardarEmpresa)

        if(this.ValidarGuardarEmpresa == true){
            this.e1 = this.e1 + 1
        }
        else{
          this.valid = false
          alert("Por favor Valide y guarde la información")
        }

        
        //@click="e1 = 3"
      },

      ValidarFormularioContacto(){

        if(this.ValidarGuardarContacto == true)
        {
              if (this.$refs.form.validate())
              {
                  //Llamar a la accion que almacena la información de la empresa
                  store.dispatch('GuardarDatosEmpresa');
              }
              else{
                this.$refs.form.validate()
              }

        }
        else{
          this.valid = false
          alert("Por favor Valide y guarde la información antes de seguir")           
        }

      },      

/*       ValidarPerfilProfesional(){
         
        if (this.$refs.form.validate())
        {
          alert("hola perfil")
            this.e1 = this.e1 + 2
             store.commit('AsignarValoresPerfilProfesional', { DatoCargoTitulo: this.VCargoTitulo, DatoDescripcionPerfil:this.VDescripcionPerfil });
   
        }
        else{
          this.$refs.form.validate()
        } 

      }, */

      ValidarFormularioAcademicos(){
        if (this.$refs.form.validate())
        {
            this.e1 = this.e1 + 2
            const result = FormacionAcademica.filter(Form => Form == this.VTipoId);
             //store.commit('AsignarValoresAcademicos', { nikename: this.VNombres, apellido:this.VApellidos, TipoId:this.VTipoId, NroId: this.VNroId });
   
        }
        else{
          this.$refs.form.validate()
        }

      }, 

      Atras(){
        store.commit('IndicadorActualizacionHVEmpresa', { valor: false })        
        this.e1 = this.e1 - 1
      },

      AñadirFormacion (){
        store.commit('CambiarIndexFormacion', { IndexFormacion: '' }); 
        store.commit('CambiarMuestraForm', { show: 1 });  
        store.commit('CambiarAccionFormacion', { AccionFormacion: 1 });            
      },

      AñadirExperiencia(){
        store.commit('CambiarIndexExperiencia', { IndexExperiencia: '' });         
        store.commit('CambiarMuestraFormExperiencia', { show: 1 });
        store.commit('CambiarAccionExperiencia', { AccionExperiencia: 1 });                     
      },

      AñadirCurso (){
        store.commit('CambiarIndexCursos', { IndexCurso: '' }); 
        store.commit('CambiarMuestraFormCursos', { show: 1 });  
        store.commit('CambiarAccionCursos', { AccionCurso: 1 });            
      },      

      EditarFormacion(valor){
        store.commit('CambiarMuestraForm', { show: 0 });
        store.commit('CambiarIndexFormacion', { IndexFormacion: valor }); 
        store.commit('CambiarMuestraForm', { show: 1 });
        store.commit('CambiarAccionFormacion', { AccionFormacion: 'Editar'}); 
      },

      EditarExperiencia(valor){
        //alert(valor);
        store.commit('CambiarMuestraFormExperiencia', { show: 0 });
        store.commit('CambiarIndexExperiencia', { IndexExperiencia: valor }); 
        store.commit('CambiarMuestraFormExperiencia', { show: 1 });
        store.commit('CambiarAccionExperiencia', { AccionExperiencia: 'Editar'}); 
      }, 
      
      EditarCursos(valor){
        store.commit('CambiarMuestraFormCursos', { show: 0 });
        store.commit('CambiarIndexCursos', { IndexCurso: valor }); 
        store.commit('CambiarMuestraFormCursos', { show: 1 });
        store.commit('CambiarAccionCursos', { AccionCursos: 'Editar'}); 
      },    
        

      EliminarFormacion(id){
      var mensaje = window.confirm("¿ESTA SEGURO DE ELIMINAR LA FORMACIÓN ?");
      if(mensaje)
        {
          store.commit('EliminarFormacionAcademica', { index: id });
        }
      },

      EliminarExpProfesional(id){
      var mensaje = window.confirm("¿ESTA SEGURO DE ELIMINAR LA EXPERIENCIA PROFESIONAL ?");
      if(mensaje)
        {
          store.commit('EliminarExperienciaProfesional', { index: id });
        }
      },

      EliminarCursos(id){
      var mensaje = window.confirm("¿ESTA SEGURO DE ELIMINAR EL CURSO ?");
      if(mensaje)
        {
          store.commit('EliminarCurso', { index: id });
        }
      },      


    },

      computed: {
        FiltraMunicipio: function () {
          return this.ListMcipios = Mcipios.filter(mcpio => mcpio.depto == this.VDepto);
        },
        
        userLogged() 
        {
          return auth.getUserLogged();
        },
        
        ...mapState(['DatosPersonalesEmpresa',
                     'VarLoginEmpresa',
                     'ActualizacionExitosaEmpresa',
                     'ValidoDatosContacto',
                     'ValidoTipoEmpresa',
                     'ValidarGuardarEmpresa',
                     'ValidarGuardarContacto',
                     ])
      },

  

    }
</script>

<style scoped>

  .right{
    float: right;
  }

</style>