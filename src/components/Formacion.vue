<template>
    <v-container >

        <!-- ----------------------------------------------------------------------------------------------------
        ------------------------------------------ CENTRO EDUCATIVO ---------------------------------------------
        ---------------------------------------------------------------------------------------------------- -->
        <!-- hola desde componente {{numero}} -->



        <v-form ref="form" v-model="valid" lazy-validation>
        <br/>

        <v-alert v-if="alertdeañoinicial == 1" dense type="error">
           La fecha inicial no puede ser mayor a la fecha final 
        </v-alert>
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
                  :counter="50"
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
                  v-model="VEstudio"
                  :rules="[v => !!v || 'El Nivel de Estudios es requerido']"
                  filled
                  label="Nivel de Estudios"
                  dense
                  ></v-select>
                </v-flex>

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

                <v-flex  xs2>
                  <v-select
                  :items="año"
                  v-model="VAñoInicial"
                  :rules="[v => !!v || 'El año inicial es requerido']"
                  filled
                  label="Periodo inicial año"
                  dense
                  ></v-select>
                </v-flex>

                <!-- separador -->
                <span style="color:white">-</span>                 

                <v-flex  xs2>
                  <v-select
                  :items="mes"
                  v-model="VMesInicial"
                  :rules="[v => !!v || 'El mes inicial es requerido']"
                  filled
                  label="Periodo inicial mes"
                  dense
                  ></v-select>
                </v-flex>                

                <!-- separador -->
                <span style="color:white">-</span> 

                <v-flex  xs2>
                  <v-select
                  :items="año"
                  v-model="VAñoFinal"
                  :rules="[v => !!v || 'El año final es requerido']"
                  filled
                  label="Periodo final año"
                  dense
                  ></v-select>
                </v-flex>

                <!-- separador -->
                <span style="color:white">-</span>                 

                <v-flex  xs2>
                  <v-select
                  :items="mes"
                  v-model="VMesFinal"
                  :rules="[v => !!v || 'El mes final es requerido']"
                  filled
                  label="Periodo final mes"
                  dense
                  ></v-select>
                </v-flex>                
                
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
                  v-model="VEeducacion"
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
                      <v-btn outlined center :disabled = "!valid" color="success" class=" mr-4" @click="ValidarFormulario()">
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
        VEstudio:"",
        VAñoInicial:"",
        VMesInicial:"",
        VAñoFinal:"",
        VMesFinal:"",
        VEeducacion:"",
        valid: true,
        eeducacion: [
          { value: '1', text: 'Culminado' },
          { value: '2', text: 'En curso' },
          { value: '3', text: 'Abandonado / aplazado' },
        ], 
        alertdeañoinicial:0,
        tipoeducacion:"",
        TipoEducacion : [
          { value: '1', text: 'Educacon superior' },
          { value: '2', text: 'Educacion técnica'},
          { value: '3', text: 'Cursos y/o seminarios' },
        ],        
        nestudios: [
          { value: '1', text: 'Auxiliar' },
          { value: '2', text: 'Universidad / Carrera Técnica' },
          { value: '3', text: 'Universidad / Carrera Tecnológica' },
          { value: '4', text: 'Universidad / Carrera Profesional' },
          { value: '5', text: 'Postgrado / Especialización' },
          { value: '6', text: 'Postgrado / Maestria' },
          { value: '7', text: 'Postgrado / Doctorado' },
        ],   
        año: [
          { value: 2030, text: '2030' },
          { value: 2029, text: '2029' },
          { value: 2028, text: '2028' },
          { value: 2027, text: '2027' },
          { value: 2026, text: '2026' },
          { value: 2025, text: '2025' },
          { value: 2024, text: '2024' },
          { value: 2023, text: '2023' },
          { value: 2022, text: '2022' },
          { value: 2021, text: '2021' },
          { value: 2020, text: '2020' },
          { value: 2019, text: '2019' },
          { value: 2018, text: '2018' },
          { value: 2017, text: '2017' },
          { value: 2016, text: '2016' },
          { value: 2015, text: '2015' },
          { value: 2014, text: '2014' },
          { value: 2013, text: '2013' },
          { value: 2012, text: '2012' },
          { value: 2011, text: '2011' },
          { value: 2010, text: '2010' },
          { value: 2009, text: '2009' },
          { value: 2008, text: '2008' },
          { value: 2007, text: '2007' },
          { value: 2006, text: '2006' },
          { value: 2005, text: '2005' },
          { value: 2004, text: '2004' },
          { value: 2003, text: '2003' },
          { value: 2002, text: '2002' },
          { value: 2001, text: '2001' },
          { value: 2000, text: '2000' },
          { value: 1999, text: '1999' },
          { value: 1998, text: '1998' },
          { value: 1997, text: '1997' },
          { value: 1996, text: '1996' },
          { value: 1995, text: '1995' },
          { value: 1994, text: '1994' },
          { value: 1993, text: '1993' },
          { value: 1992, text: '1992' },
          { value: 1991, text: '1991' },
          { value: 1990, text: '1990' },
          { value: 1989, text: '1989' },
          { value: 1988, text: '1988' },
          { value: 1987, text: '1987' },
          { value: 1986, text: '1986' },
          { value: 1985, text: '1985' },
          { value: 1984, text: '1984' },
          { value: 1983, text: '1983' },
          { value: 1982, text: '1982' },
          { value: 1981, text: '1981' },
          { value: 1980, text: '1980' },
          { value: 1979, text: '1979' },
          { value: 1978, text: '1978' },
          { value: 1977, text: '1977' },
          { value: 1976, text: '1976' },
          { value: 1975, text: '1975' },
          { value: 1974, text: '1974' },
          { value: 1973, text: '1973' },
          { value: 1972, text: '1972' },
          { value: 1971, text: '1971' },
          { value: 1971, text: '1970' },
        ], 
        mes: [
          { value: 'Enero', text: 'Enero' },
          { value: 'Febrero', text: 'Febrero' },
          { value: 'Marzo', text: 'Marzo' },
          { value: 'Abril', text: 'Abril' },
          { value: 'Mayo', text: 'Mayo' },
          { value: 'Junio', text: 'Junio' },
          { value: 'Julio', text: 'Julio' },
          { value: 'Agosto', text: 'Agosto' },
          { value: 'Septiembre', text: 'Septiembre' },
          { value: 'Octubre', text: 'Octubre' },
          { value: 'Noviembre', text: 'Noviembre' },
          { value: 'Diciembre', text: 'Diciembre' }   
        ], 
        ceducativo: [
        v => !!v || 'Descripción del centro educativo es requerido',
        v => (v && v.length <= 50) || 'Descripción debe ser menor que 20 caracteres',
      ],       

    }),

  
    beforeMount() 
    {
      if (store.state.IndexFormacion !== '' && store.state.AccionFormacion == "Editar"){

      for(let i=0; i< store.state.FormacionAcademica.length; i++){
          
          if( i == store.state.IndexFormacion)
          {                              
               var FiltroNivel =  this.nestudios.filter(function(nivel) {
                    return nivel.text == store.state.FormacionAcademica[i].Nivel;
                });

              this.VEducativo   = store.state.FormacionAcademica[i].CentroEducativo
              this.VEstudio     = FiltroNivel[0].value
              this.VAñoInicial  = store.state.FormacionAcademica[i].AñoInicial
              this.VMesInicial  = store.state.FormacionAcademica[i].MesInicial
              this.VAñoFinal    = store.state.FormacionAcademica[i].AñoFinal
              this.VMesFinal    = store.state.FormacionAcademica[i].MesFinal
              this.VEeducacion  = store.state.FormacionAcademica[i].Estado
          }
        } 
      }
    },



  methods: 
       {

            // Se mapean las mutaciones
            ...mapMutations(['AsignarValoresAdademicos']),

            validate() {
              this.$refs.form.validate()
            },
            
            reset () {
              store.commit('CambiarMuestraForm', { show: 0 });
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
                //this.valid = true
                //validar los periodos
                let mes1 = ""
                let mes2 = ""

                switch (this.VMesInicial) {
                case "Enero":
                  mes1 = "01"
                break;
                case "Febrero":
                  mes1 = "02"
                break;
                case "Marzo":
                  mes1 = "03"
                break;
                case "Abril":
                  mes1 = "04"
                break;
                case "Mayo":
                  mes1 = "05"
                break;
                case "Junio":
                  mes1 = "06"
                break;
                case "Julio":
                  mes1 = "07"
                break;
                case "Agosto":
                  mes1 = "08"
                break;
                case "Septiembre":
                  mes1 = "09"
                break;
                case "Octubre":
                  mes1 = "10"
                break;
                case "Noviembre":
                  mes1 = "11"
                break;
                case "Diciembre":
                  mes1 = "12"
                break;                                                                                                                
                }
   
                switch (this.VMesFinal) {
                case "Enero":
                  mes2 = "01"
                break;
                case "Febrero":
                  mes2 = "02"
                break;
                case "Marzo":
                  mes2 = "03"
                break;
                case "Abril":
                  mes2 = "04"
                break;
                case "Mayo":
                  mes2 = "05"
                break;
                case "Junio":
                  mes2 = "06"
                break;
                case "Julio":
                  mes2 = "07"
                break;
                case "Agosto":
                  mes2 = "08"
                break;
                case "Septiembre":
                  mes2 = "09"
                break;
                case "Octubre":
                  mes2 = "10"
                break;
                case "Noviembre":
                  mes2 = "11"
                break;
                case "Diciembre":
                  mes2 = "12"
                break;                                                                                                                
                }   

                let fecha1 = Date.parse(this.VAñoInicial +"-"+ mes1 +"-"+ "01")
                let fecha2 = Date.parse(this.VAñoFinal +"-"+ mes2 +"-"+ "30")


                if(fecha1 <= fecha2){                
                  let FiltroNivel = "";
                  FiltroNivel = this.nestudios.filter(number => number.value == this.VEstudio );

                  if (store.state.IndexFormacion !== ''){                  
                      store.state.FormacionAcademica.splice(store.state.IndexFormacion, 1);
                    }
                  
                  console.log("Entrooooooooo a academicos",this.$refs.form.validate()  )
                  store.commit('AsignarValoresAcademicos', { Centro: this.VEducativo, Nivel:FiltroNivel[0].text, PeriodoInicial:this.VAñoInicial, MesI:this.VMesInicial ,PeriodoFinal:this.VAñoFinal ,MesF:this.VMesFinal, EstadoEdu:this.VEeducacion });
                  this.reset();
                  this.e1 = this.e1 + 1;

                }else{
                  this.alertdeañoinicial = 1
                  //this.valid = false
                }

                
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
      ...mapState(['numero','wilson','TipoIdentificacion','CentroEducativo','MuestraForm',
                  'NivelEstudios',
                  'AñoInicial',
                  'MesInicial',
                  'AñoFinal',
                  'MesFinal',
                  'EstadoEducacion',
                  'FormacionAcademica',
                  'IndexFormacion',
                  'AccionFormacion'])
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
