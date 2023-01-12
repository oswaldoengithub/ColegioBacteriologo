<template>
    <v-container >

        <!-- ----------------------------------------------------------------------------------------------------
        ------------------------------------------ CENTRO EDUCATIVO ---------------------------------------------
        ---------------------------------------------------------------------------------------------------- -->
        <!-- hola desde componente {{numero}} -->
        <v-form ref="form" v-model="valid" lazy-validation>
        <br/>

            <!--    <p>El switch: {{ this.VEstudio }}</p>
             <p>El ne es: {{ Vestudio }}</p>
              <p>El pia es: {{ VAñoInicial }}</p>
              <p>El centro es es: {{ CentroEducativo }} {{this.Veducativo}}</p> -->

              <v-layout class="justify-center">
                  <div class="justify-center">
                  <v-flex xs6 md1>
                    <v-icon  text  class="justify-center" style="font-size: 50px;">mdi-library</v-icon>
                  </v-flex>
                  </div>
                <v-flex  xs4 >
                  <v-text-field
                  v-model="VEducativo"
                  :counter="100"
                  :rules="ceducativo"
                  label="Centro Educativo"
                  filled                        
                  required
                  >
                  </v-text-field>
                </v-flex>  

                <!-- separador -->
                <span style="color:white">-</span>  

                <v-flex  xs4>
                  <v-select
                  :items="nestudios"
                  v-model="VTipoEducacion"
                  :rules="[v => !!v || 'El tipo de educación es requerido']"
                  filled
                  label="Tipo Educación"
                  dense
                  ></v-select>
                </v-flex>

              </v-layout>


             <!-- ----------------------------------------------------------------------------------------------------
             ------------------------------------------ Nombre curso ------------------------------------------------------
             ---------------------------------------------------------------------------------------------------- -->  

                <v-layout class="justify-center">
                  <div class="justify-left">
                  <v-flex xs6 md1>
                    <v-icon class="justify-center" style="font-size: 50px">mdi-update</v-icon>
                  </v-flex>
                  </div>

                <v-flex  xs8 >
                  <v-text-field
                  v-model="VNombreCurso"
                  :counter="80"
                  :rules="nombrecurso"
                  label="Nombre del curso"
                  filled                        
                  required
                  >
                  </v-text-field>
                </v-flex> 

                <!-- separador -->
                <span style="color:white">-</span>    

              </v-layout>  

             <!-- ----------------------------------------------------------------------------------------------------
             ------------------------------------------ PERIODO ------------------------------------------------------
             ---------------------------------------------------------------------------------------------------- -->                 

               <v-layout class="justify-center">
                  <div class="justify-left">
                  <v-flex xs6 md1>
                    <v-icon class="justify-center" style="font-size: 50px">mdi-update</v-icon>
                  </v-flex>
                  </div>

                <v-flex  xs4>
                  <v-select
                  :items="Temporalidades"
                  v-model="VTemporalidad"
                  :rules="[v => !!v || 'La temporalidad es requerida']"
                  filled
                  label="Temporalidad"
                  dense
                  ></v-select>
                </v-flex>

                <!-- separador -->
                <span style="color:white">-</span>                 

                <!-- separador -->
                <span style="color:white">-</span> 

                <v-flex  xs4 >
                  <v-text-field
                  v-model="VCantidadTiempo"
                  :counter="5"
                  :rules="cantidadtiempo"
                  label="Cantidad Tiempo"
                  filled                        
                  required
                  >
                  </v-text-field>
                </v-flex>  

                <!-- separador -->
                <span style="color:white">-</span>                 

 <!--                <v-flex  xs2>
                  <v-select
                  :items="mes"
                  v-model="VMesFinal"
                  :rules="[v => !!v || 'El mes final es requerido']"
                  filled
                  label="Periodo final mes"
                  dense
                  ></v-select>
                </v-flex>   -->              
                
              </v-layout>  


             <!-- ----------------------------------------------------------------------------------------------------
             ------------------------------------------ ESTADO -------------------------------------------------------
             ---------------------------------------------------------------------------------------------------- -->              

              <v-layout class="justify-center">
                  <div class="justify-center">
                    <v-flex xs6 md1>
                      <v-icon class="justify-center" style="font-size: 50px">mdi-checkbox-multiple-marked</v-icon>
                    </v-flex>
                  </div>
                <v-flex  xs4>
                  <v-select
                  :items="eeducacion"
                  v-model="VEstado"
                  :rules="[v => !!v || 'El Estado de educación es requerido']"
                  filled
                  label="Estado educación"
                  dense
                  ></v-select>
                </v-flex>

                <span style="color:white">-</span> 

                 <v-flex xs4>
           <!--     <v-select
                    :items="TipoEducacion"
                    v-model="tipoeducacion"
                    filled
                    label="Nivel educativo"
                    dense
                    ></v-select> -->
                    
                </v-flex> 
  
              </v-layout>  
           
              <!-- Botones de accion en el componente de formacion -->
              <v-layout class="justify-center"> 
                  <div class="justify-center">
                  <v-flex >
                      <v-btn outlined center :disabled="!valid" color="success" class=" mr-4" @click="ValidarFormulario()">
                        Validar y Guardar
                      </v-btn> 
                      <v-btn outlined center color="info" class=" mr-4" @click="Limpiar">Limpiar</v-btn>
                      <v-btn outlined center color="error" class=" mr-4" @click="reset">Cancelar</v-btn>                        

                  </v-flex>
                  </div>
              </v-layout>  
       
         

        </v-form>           

    </v-container>  

</template>



<script>

import {mapMutations, mapState} from 'vuex';
import store from "../store/index.js";



  export default {
    name: 'Formacion',

    data: () => ({
        FormacionValid:true,
        VEducativo:"",
        VTipoEducacion:"",
        VEstado:"",
        VTemporalidad:'',
        VCantidadTiempo:'',
        VNombreCurso:'',
        valid: true,
        eeducacion: [
          { value: '1', text: 'Culminado' },
          { value: '2', text: 'En curso' },
          { value: '3', text: 'Abandonado / aplazado' },
        ], 
        tipoeducacion:"",
        TipoEducacion : [
          { value: '1', text: 'Educacon superior' },
          { value: '2', text: 'Educacion técnica'},
          { value: '3', text: 'Cursos y/o seminarios' },
        ],        
        nestudios: [
          { value: '1', text: 'Curso' },
          { value: '2', text: 'Diplomado' },
          { value: '3', text: 'Seminario' },
          { value: '4', text: 'Congreso' },
        ],   
        
        Temporalidades:[
          { value: 'Horas', text: 'Horas' },
          { value: 'Dias', text: 'Dias' },
          { value: 'Semanas', text: 'Semanas' },
          { value: 'Meses', text: 'Meses' },
          { value: 'Niveles', text: 'Niveles' }
        ],
        ceducativo: [
        v => !!v || 'Descripción del centro educativo es requerido',
        v => (v && v.length <= 80) || 'Descripción debe ser menor que 80 caracteres',
      ],   
      nombrecurso: [
        v => !!v || 'El nombre del curso es requerido',
        v => (v && v.length <= 80) || 'Nombre del curso debe ser menor que 80 caracteres',
      ],
        cantidadtiempo: [
        v => !!v || 'Cantidad es requerido',
        v => /^[0-9]{1,3}$/.test(v) || 'Cantidad de tiempo incorrecto, debe ser numerico y menor a 3 digitos' 
      ],      
      
      

    }),

  
    beforeMount() 
    {
       if (store.state.IndexCursos !== '' && store.state.AccionCursos == "Editar"){

      for(let i=0; i< store.state.FormacionCursos.length; i++){
          
          if( i == store.state.IndexCursos)
          {                              
               var FiltroTipo =  this.nestudios.filter(function(nivel) {
                    return nivel.text == store.state.FormacionCursos[i].Tipo;
                });

              this.VEducativo       = store.state.FormacionCursos[i].CentroEducativo
              this.VTipoEducacion   = FiltroTipo[0].value
              this.VNombreCurso     = store.state.FormacionCursos[i].NombreCurso
              this.VTemporalidad    = store.state.FormacionCursos[i].Temporalidad
              this.VCantidadTiempo  = store.state.FormacionCursos[i].CantTiempo
              this.VEstado          = store.state.FormacionCursos[i].Estado


          }
        } 
      }
    },



  methods: 
       {

            // Se mapean las mutaciones
            ...mapMutations(['AsignarValoresAdademicos','CambiarMuestraFormCursos']),

            validate() {
              this.$refs.form.validate()
            },
            
            reset () {
              store.commit('CambiarMuestraFormCursos', { show: 0 });
              this.$refs.form.reset()              
            },
            Limpiar () {
              this.$refs.form.reset()              
            },            
            
            resetValidation () {
              this.$refs.form.resetValidation()
            },
          
            ValidarFormulario(){

             
              if (this.$refs.form.validate())
              {
                let FiltroTipoEducacion = "";
                FiltroTipoEducacion = this.nestudios.filter(number => number.value == this.VTipoEducacion );

                if (store.state.IndexCursos !== '')
                {                  
                    store.state.FormacionCursos.splice(store.state.IndexCursos, 1);
                }
                
                store.commit('AsignarValoresCursos', { CentroEducativo: this.VEducativo, 
                                                       Tipo:FiltroTipoEducacion[0].text, 
                                                       NombreCurso:this.VNombreCurso, 
                                                       Temporalidad:this.VTemporalidad ,
                                                       CantTiempo:this.VCantidadTiempo, 
                                                       Estado:this.VEstado });
                this.reset();
                this.e1 = this.e1 + 1;
                
              }
              else{
                this.$refs.form.validate()
              }

            }, 
            Atras(){
              this.e1 = this.e1 - 1
            },

          
       },

    computed: 
    {   
      ...mapState(['numero','TipoIdentificacion','CentroEducativo','MuestraForm',
                  'NivelEstudios',
                  'EstadoEducacion',
                  'FormacionCursos',
                  'IndexCursos',
                  'AccionCursos',
                  'IndexAccion',
                  'MuestraFormCursos'])
    },
  }
</script>


<style scoped>

.right{
 /* background-color: yellow;
  
   IMPORTANTE */
  width: 200px;
  margin: 0 auto;
  }

</style>
