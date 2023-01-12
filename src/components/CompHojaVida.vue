<template>

  <v-container class="white" mt-0>
    <h1>Mi hoja de vida</h1>
    <!--Mensaje de alerta cuando los datos personales estan errados -->
     <v-alert v-if ="valid == false" type="error">
      Para poder continuar a la información academica debe llenar todos los campos del formulario datos personales  
    </v-alert> 

<!--     <v-alert v-if ="this.RegistroExitoso == true" type="error">
      Para poder continuar a la información academica debe llenar todos los campos del formulario datos personales  
    </v-alert>  -->

           <div class="text-center" v-if="this.RegistroExitoso == true ">
          <v-dialog
            v-model="RegistroExitoso"
            width="500"
          >
            <v-card v-if="this.RegistroExitoso == true ">
              <v-card-title class="text-h5 grey lighten-2">
                Registro Exitoso
              </v-card-title>

              <v-card-text>
                El registro de la información se realizó de manera exitosa 
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="LlevarHome()"
                >
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

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
              Datos Personales
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
            >
              Perfil profesional 
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 3"
              step="3"
            >
              Formación
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step 
            :complete="e1 > 4"
              step="4">
              Experiencias profesionales
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step 
            :complete="e1 > 5"
              step="5">
              Cursos
            </v-stepper-step>            

          </v-stepper-header>

          <v-stepper-items>
            <v-form   ref="form"
                      v-model="valid"
                      lazy-validation> 


                <v-stepper-content step="1">

                  <v-card
                    class="mb-12"
                    color="grey lighten-4"
                    height="500px"
                  >
                      <v-container >

                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ NOMBRES -------------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->

                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon  class="justify-center" style="font-size: 50px;">mdi mdi-account</v-icon>
                            </v-flex>
                            </div>
                          <v-flex  xs4 >
                            <v-text-field
                            :counter="20"
                            :rules="nameRules"
                            v-model="VNombres"
                            label="Nombres"
                            filled                                                   
                            required
                            >
                            </v-text-field>
                          </v-flex>  

                          <!-- separador -->
                          <span style="color:white">-</span>  

                          <v-flex  xs4 >
                            <v-text-field
                            v-model="VApellidos"
                            :counter="20"
                            :rules="nameRules"
                            label="Apellidos"
                            filled                        
                            required
                            >
                            </v-text-field>
                          </v-flex>             
                        </v-layout>


                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ IDENTIFICACION -----------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->              


                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px">mdi-account-box-outline</v-icon>
                            </v-flex>
                            </div>
                          <v-flex  xs4>
                            <v-select
                            :items="TipoId"
                            v-model="VTipoId"
                            :rules="[v => !!v || 'El tipo de identificacion es requerido']"
                            label="Tipo Identificación"
                            required
                            ></v-select>
                          </v-flex>

                          <span style="color:white">-</span> 

                          <v-flex  xs4>
                            <v-text-field
                            v-model="VNroId"
                            :counter="20"
                            :rules="NroIdRules"
                            label="Número Identificación"
                            filled                        
                            required
                            >
                            </v-text-field>
                          </v-flex>  
                        </v-layout>


                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ FECHA NACIMIENTO ---------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->                 

                        <v-layout class="justify-center">
                            <div class="justify-left">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px">mdi-cake-variant</v-icon>
                            </v-flex>
                            </div>

                            <v-flex justify-left class="grey lighten-5" xs4>
                              <v-text-field 
                              v-model="VFecha" 
                              single-line 
                              :rules="FNacimientodRules"
                              label="Fecha Nacimiento">
                                <template v-slot:append-outer>
                                  <date-picker v-model="VFecha"/>
                                </template>
                              </v-text-field>
                            </v-flex>

                          <v-flex  xs4>
                            <v-select
                            :items="Genero"
                            v-model="VGenero"
                            :rules="[v => !!v || 'El Campo Género es requerido']"
                            label="Genero"
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
                            label="Departamento Residencia"
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
                            label="Municipio Residencia"
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
          <!--         <v-btn
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
                    color="grey lighten-4"
                    height="300px"
                  >
                    <!-- llamado al componente de PERFIL PROFESIONAL -->
                    <div>
                      <PerfilProfesional/>  
                    </div>   

                  </v-card>

                  <v-btn
                    color="primary"
                    :disabled="!ValidPerfil"                    
                    @click="e1 = 3"
                    small
                  >
                    Siguiente
                  </v-btn> 

                 
                  <v-btn small class="ml-4" @click="Atras()" color="accent">
                    Regresar
                  </v-btn>
                </v-stepper-content>          

                <v-stepper-content step="3">
                
      <!--           <v-alert v-if ="valid == false" type="error">
                  Para poder continuar a Experiencia Profesional debe llenar todos los campos del formulario actual  
                </v-alert> -->


                  <v-card
                    class="mb-12"
                    color="grey lighten-4"          
                  >
                  <br/>

                         <v-alert v-if ="FormacionAcademica.length == 0" color="blue-grey lighten-1">
                          Por lo menos debe añadir una formación académica para poder continuar 
                        </v-alert> 

                        <v-layout class="justify-center">
                            <div class="justify-center">

                            <v-flex >

                            <v-btn @click="AñadirFormacion()" color="info" outlined center>
                                <v-icon left style="font-size: 25px" >mdi-account-multiple-plus</v-icon>
                                  Añadir Formación
                            </v-btn>                          
                              
                            </v-flex> 
                            </div>                  
                        </v-layout>

                  <!-- llamado al componente de formación, es pintado el numero de cantidades que tenga la variable CantFormacion -->
                  <div v-if="MuestraForm == 1 ">
                    <Formacion/> 
                  </div>

                <v-container>
                <div v-for="(item, index) in FormacionAcademica" :key="index">
                <v-layout wrap >
                    <v-flex class="blue lighten-4 pl-5 pt-3 " xs6>
                      {{item.Nivel}} 
                    </v-flex> 

                    <v-flex class="blue lighten-4 pl-5 pr-5" xs6 >                
                        <div class="right pt-3"> 

                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn  color="blue lighten-2" fab small>
                                  <v-icon
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size: 35px"
                                    @click="EditarFormacion(index)"
                                  >
                                    mdi-account-edit
                                  </v-icon>
                                  </v-btn>
                                </template>
                                <span>Editar registro</span>
                              </v-tooltip>                            

                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn class="ml-2 " color="blue lighten-2" fab small>
                                  <v-icon
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size: 35px"
                                    @click="EliminarFormacion(index)"
                                  >
                                    mdi-delete
                                  </v-icon>
                                  </v-btn>
                                </template>
                                <span>Eliminar registro</span>
                              </v-tooltip>

 
                        </div>                  
                    </v-flex> 

                    <v-flex class="blue lighten-4 pl-5 pt-2">
                      <v-divider dark:true></v-divider>
                      {{item.CentroEducativo}}               
                    </v-flex>

                    <v-flex class="blue lighten-4 pl-5 pt-2 ">
                      <v-divider dark:true></v-divider>
                      <div class="right pt-3 mr-5">
                      {{item.MesInicial}} {{item.AñoInicial}} - {{item.MesFinal}} {{item.AñoFinal}}   
                      </div>           
                    </v-flex>                

                  </v-layout>

                  <!-- separador -->
                  <span style="color:white">-</span>
                  </div> 
              
                </v-container>              
                </v-card>

                  <v-btn small color="primary" :disabled="!FormacionAcademica.length > 0" @click="e1 = 4">Siguiente</v-btn>
                  <v-btn small class="ml-4" @click="Atras()" color="accent">Regresar</v-btn>

                </v-stepper-content>

                <v-stepper-content step="4">
                  <v-card
                    class="mb-12"
                    color="grey lighten-4"          
                  >
                  <br/>

                       <v-alert v-if ="ExperienciaProfesional.length == 0" color="blue-grey lighten-3">
                          Por lo menos debe añadir una Experiencia Profesional para continuar  
                        </v-alert> 

                        <v-layout class="justify-center">
                            <div class="justify-center">

                            <v-flex >

                            <v-btn small @click="AñadirExperiencia()" color="success" outlined center>
                                <v-icon left style="font-size: 25px" >mdi-account-multiple-plus</v-icon>
                                  Añadir Experiencia
                            </v-btn>                          
                              
                            </v-flex> 
                            </div>                  
                        </v-layout>

                  <!-- llamado al componente de formación, es pintado el numero de cantidades que tenga la variable CantFormacion -->
                  <div v-if="MuestraFormExperiencia == 1 ">
                    <ExperienciaProfesional/>           
                  </div>


                <v-container>
                <div v-for="(item, index) in ExperienciaProfesional" :key="index">
                  
                <v-layout wrap >
                    <v-flex class="green lighten-4 pl-5 pt-3 " xs6>
                      {{item.Empresa}} 
                    </v-flex> 

                    <v-flex class="green lighten-4 pl-5 pr-5" xs6 >                
                        <div class="right pt-3"> 
                              <v-tooltip bottom>
                                <template  v-slot:activator="{ on, attrs }">
                                  <v-btn  color="green lighten-2" fab small>
                                  <v-icon
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size: 35px"
                                    @click="EditarExperiencia(index)"
                                  >
                                    mdi-account-edit
                                  </v-icon>
                                  </v-btn>
                                </template>
                                <span>Editar registro</span>
                              </v-tooltip>  

                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn class="ml-2" color="green lighten-2" fab small>
                                  <v-icon
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size: 35px"
                                    @click="EliminarExpProfesional(index)"
                                  >
                                    mdi-delete
                                  </v-icon>
                                  </v-btn>
                                </template>
                                <span>Eliminar registro</span>
                              </v-tooltip>


                        </div>                  
                    </v-flex> 

                    <v-flex class="green lighten-4  pl-5 pt-2">
                      <v-divider dark:true></v-divider>
                      {{item.Area}}               
                    </v-flex>

                    <v-flex class="green lighten-4 pl-5 pt-2">
                      <v-divider dark:true></v-divider>
                      <div class="right pt-3 mr-5">
                      {{item.MesInicialExperiencia}} {{item.AñoInicialExperiencia}} - {{item.MesFinalExperiencia}} {{item.AñoFinalExperiencia}}   
                      </div>           
                    </v-flex> 
                  

                  </v-layout>

                              <!-- separador -->
                  <span style="color:white">-</span>
                  </div>  

                    <!-- asi se pintan otro tipo de botones

                    <v-btn color="primary" icon flat>
                    <v-icon style="font-size: 40px">mdi-delete</v-icon>
                    </v-btn>
                    <v-btn color="#42A5F5" icon flat>
                    <v-icon @click="alerta()" style="font-size: 40px">mdi-account-edit</v-icon>
                    </v-btn>   -->  
              
                </v-container>              
                </v-card>
               <!--  @click="e1 = 1" --> 
                  <v-btn small color="primary" :disabled="!ExperienciaProfesional.length > 0" @click="e1 = 5">Siguiente</v-btn>              
                  <!-- <v-btn small  color="primary" :disabled="!ExperienciaProfesional.length > 0" @click="GuardarDatos" >Guardar mi hoja de vida</v-btn> -->
                  <v-btn small class="ml-4" @click="Atras()" color="accent">Regresar</v-btn>

                </v-stepper-content> 

                <v-stepper-content step="5">

                  <v-alert v-if = "ActualizacionExitosa == true" color="green lighten-4">
                    Hoja de vida actualizada correctamente 
                  </v-alert> 

                  <v-card
                    class="mb-12"
                    color="grey lighten-4"          
                  >
                  <br/>

                        <v-layout class="justify-center">
                            <div class="justify-center">

                            <v-flex >

                            <v-btn small @click="AñadirCurso()" color="deep-purple lighten-2" outlined center>
                                <v-icon left style="font-size: 25px" >mdi-account-multiple-plus</v-icon>
                                  Nuevo Curso
                            </v-btn>                          
                              
                            </v-flex> 
                            </div>                  
                        </v-layout>

                  <!-- llamado al componente de formación, es pintado el numero de cantidades que tenga la variable CantFormacion -->

                  <div v-if="MuestraFormCursos == 1 ">
                    <Curso/>          
                  </div>



                <v-container>
                <div v-for="(item, index) in FormacionCursos" :key="index">
                
                  
                <v-layout wrap >
                    <v-flex class="deep-purple lighten-4 pl-5 pt-3 " xs6>
                      {{item.CentroEducativo}} - {{item.NombreCurso}}
                    </v-flex> 

                    <v-flex class="deep-purple lighten-4 pl-5 pr-5" xs6 >                
                        <div class="right pt-3"> 
                              <v-tooltip bottom>
                                <template  v-slot:activator="{ on, attrs }">
                                  <v-btn  color="deep-purple lighten-2" fab small>
                                  <v-icon
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size: 35px"
                                    @click="EditarCursos(index)"
                                  >
                                    mdi-account-edit
                                  </v-icon>
                                  </v-btn>
                                </template>
                                <span>Editar registro</span>
                              </v-tooltip>  

                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn class="ml-2" color="deep-purple lighten-2" fab small>
                                  <v-icon
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size: 35px"
                                    @click="EliminarCursos(index)"
                                  >
                                    mdi-delete
                                  </v-icon>
                                  </v-btn>
                                </template>
                                <span>Eliminar registro</span>
                              </v-tooltip>


                        </div>                  
                    </v-flex> 

                    <v-flex class="deep-purple lighten-4  pl-5 pt-2">
                      <v-divider dark:true></v-divider>
                      Tipo Educación: {{item.Tipo}}               
                    </v-flex>

                    <v-flex class="deep-purple lighten-4 pl-5 pt-2">
                      <v-divider dark:true></v-divider>
                      <div class="right pt-3 mr-5">
                      {{item.CantTiempo}} {{item.Temporalidad}}   
                      </div>           
                    </v-flex> 
                  

                  </v-layout>

                              <!-- separador -->
                  <span style="color:white">-</span>
                  </div>  

                    <!-- asi se pintan otro tipo de botones

                    <v-btn color="primary" icon flat>
                    <v-icon style="font-size: 40px">mdi-delete</v-icon>
                    </v-btn>
                    <v-btn color="#42A5F5" icon flat>
                    <v-icon @click="alerta()" style="font-size: 40px">mdi-account-edit</v-icon>
                    </v-btn>   -->  
              
                </v-container>              
                </v-card>
               <!--  @click="e1 = 1" -->                  
                  <!-- :to="{name:'areapersona'}"  <v-btn small  color="primary" :disabled="!FormacionCursos.length > 0" @click="GuardarDatos" >Guardar mi hoja de vida</v-btn> -->
                  <v-btn small  color="primary"  @click="GuardarDatos" >Guardar mi hoja de vida</v-btn>
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
import Formacion from "../components/Formacion.vue";
import PerfilProfesional from "../components/PerfilProfesional.vue";
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
        Formacion,
        ValidationProvider,
        ValidationObserver,
        ExperienciaProfesional,
        PerfilProfesional,
        Cursos,
        Curso
    },
    data: () => ({
      //Datos del formulario
      VNombres:"",
      VApellidos:"",
      VTipoId:"",
      VNroId:"",
      VFecha:null,
      VGenero:"",
      VDepto:"",
      VMuni:"",
      VTelefono:"",
      VTelefono2:"",
      VMail:"",
      VDireccion:"",      
      ListDepartamento: Departamentos,
      ListMcipios: Mcipios,
      municipio:"",
      telefono:"",
      Vdireccion:"",
      ameRules:"",
      e1:1,
      CantFormacion: 1,
      CantExperiencia:1,
      valid: true,
      name: '',
      TipoId: [
          /* { value: null, text: 'Por favor seleccione tipo de identificación' }, */
          { value: 'CC', text: 'CC - Cedula de Ciudadania' },
          { value: 'CE', text: 'CC - Cedula de Extranjeria' },
          { value: 'PA', text: 'PA - Pasaporte' },
        ],  
      // Formacion: [
      //     { CentroEducativo: 'Universidad Central', Nivel: 'Postgrado / Especializaciónww', AñoInicial: '2020', MesInicial: '01', AñoFinal: '2020', MesFinal: '12', Estado: 'Culminado' },
      //     { CentroEducativo: 'Universidad Distrital', Nivel: 'Postgrado / Especializaciónww', AñoInicial: '2020', MesInicial: '01', AñoFinal: '2020', MesFinal: '12', Estado: 'Culminado' },
      //     { CentroEducativo: 'El cena', Nivel: 'Postgrado / Especializaciónww', AñoInicial: '2020', MesInicial: '01', AñoFinal: '2020', MesFinal: '12', Estado: 'Culminado' },
      //     { CentroEducativo: 'El cena', Nivel: 'Postgrado / Especializaciónww', AñoInicial: '2020', MesInicial: '01', AñoFinal: '2020', MesFinal: '12', Estado: 'Culminado' },

      //   ], 
      Genero: [
          { value: '1', text: 'Hombre' },
          { value: '0', text: 'Mujer' }
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
        v => /^[a-zA-Z\ ]{3,20}$/.test(v) || 'Campo no valido'
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
        v => /^[0-9]{3,17}$/.test(v) || 'Número de Identificacion no valido',
      ],
      DireccionlRules:[
         v => !!v || 'Campo requerido',
        v => (v && v.length <= 40 && v.length > 2) || 'El campo debe contener entre 3 y 40 caracteres',
        v => /^[a-zA-Z0-9\ #,.áéíóú-]{3,40}$/.test(v) || 'Campo no valido, revise caracteres especiales'       
      ],
      ShowForm:0,
      select: null,
      checkbox: false,
      dialog: false,
      
    }),

    beforeMount() {
      const Name = auth.getUserLogged();

      //console.log("RegistroExitoso:",RegistroExitoso)
      
      if(this.userLogged == undefined)
      {
          store.commit('AsignarValorLogin', { ValorLogin: 0 , user:'',tipoususrio :'' });
      }
      else
      {
          store.commit('AsignarValorLogin', { ValorLogin: 1 , user:Name.username ,tipoususrio :Name.tipousuario});
          //Se asignan los valores de datos personales sacdos del API a los Vmodels del formulario
          this.VNombres   = store.state.Nombre;
          this.VApellidos = store.state.Apellido;
          this.VTipoId    = store.state.TipoIdentificacion;
          this.VNroId     = store.state.NroId;
          this.VFecha     = store.state.FechaNacimiento;
          this.VGenero    = store.state.Genero;
          this.VDepto     = store.state.Depto;
          this.VMuni      = store.state.Mcpio;
          this.VTelefono  = store.state.Movil;
          this.VTelefono2 = store.state.Movil2;
          this.VMail      = store.state.Email;
          this.VDireccion = store.state.Direccion;  
          //
      
      }       
    },

    
    setup: () => ({ v$: useVuelidate() }),


    methods: {
      ...mapMutations(['AsignarValoresPersonales','CambiarMuestraFormExperiencia','AsignarValoresPerfilProfesional','AsignarValorLogin','CambiarMuestraFormCursos','AsignarValorRegistroExitoso']),
      ...mapActions(['GuardarDatos']),      

      validate() {
        this.$refs.form.validate()
      },

      LlevarHome(){
      store.commit('AsignarValorRegistroExitoso', { Valor: false });
      this.dialog = false;
      this.$router.push("/")
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
             this.e1 = this.e1 + 1
             store.commit('CambiarMuestraForm', { show: 0 });
             store.commit('CambiarMuestraFormCurso', { show: 0 });
             store.commit('AsignarValoresPersonales', { nikename: this.VNombres, 
                                                        apellido:this.VApellidos, 
                                                        TipoId:this.VTipoId, 
                                                        NroId: this.VNroId ,
                                                        FechaNacimiento: this.VFecha,
                                                        Genero:this.VGenero,
                                                        Depto:this.VDepto,
                                                        Mcpio: this.VMuni,
                                                        Movil: this.VTelefono,
                                                        Movil2:this.VTelefono2,
                                                        Email:this.VMail,
                                                        Direccion:this.VDireccion });

  
        }
        else{
          this.$refs.form.validate()
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
        
        ...mapState(['numero',
                     'wilson',
                     'Nombre',
                     'Apellido',
                     'TipoIdentificacion',
                     'NroId',
                     'MuestraForm',
                     'MuestraFormExperiencia',
                     'FormacionAcademica',
                     'FormacionCursos',
                     'EliminarFormacionAcademica',
                     'ExperienciaProfesional',
                     'ExperienciaCursos',
                     'ValidPerfil',
                     'VarLogin',
                     'AccionFormacion',
                     'MuestraFormCursos',
                     'ActualizacionExitosa',
                     'RegistroExitoso'])
      },

  

    }
</script>

<style scoped>

  .right{
    float: right;
  }

</style>