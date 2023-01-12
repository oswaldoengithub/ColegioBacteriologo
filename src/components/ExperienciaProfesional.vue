<template>
    <v-container >

        <!-- ----------------------------------------------------------------------------------------------------
        ------------------------------------------ EMPRESA ---------------------------------------------
        ---------------------------------------------------------------------------------------------------- -->
<!--          hola desde componente {{numero}}  -->
        <v-form ref="form" v-model="valid" lazy-validation>
        <br/>
        <v-alert v-if="alertdeañoinicial == 1" dense type="error">
           La fecha inicial no puede ser mayor a la fecha final 
        </v-alert>        

             <!--   <p>Empresa: {{ Empresa }}</p>
               <p>Area: {{ Area }}</p>
             <p>El ne es: {{ Vestudio }}</p>
              <p>El pia es: {{ VAñoInicial }}</p>
              <p>El centro es es: {{ CentroEducativo }} {{this.Veducativo}}</p> -->

              <v-layout class="justify-center">
                  <div class="justify-center">
                  <v-flex xs6 md1>
                    <v-icon  text  class="justify-center" style="font-size: 50px;">mdi-store</v-icon>
                  </v-flex>
                  </div>
                <v-flex  xs4 >
                  <v-text-field
                  v-model="VEmpresa"
                  :counter="30"
                  :rules="nameRules"
                  label="Nombre de la Empresa"
                  filled                        
                  required
                  >
                  </v-text-field>
                </v-flex>  

                <!-- separador -->
                <span style="color:white">-</span>  

                <v-flex  xs4>
                  <v-select
                  :items="ListAreas"
                  v-model="VArea"
                  :rules="[v => !!v || 'El Área es requerida']"
                  filled
                  label="Área"
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
                  v-model="VAñoInicialExperiencia"
                  :rules="[v => !!v || 'El año inicial es requerido']"
                  filled
                  label="Año inicial"
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
                  label="Mes inicial"
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
                  label="Año final"
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
                  label="Mes final"
                  dense
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
             ------------------------------------------ ESTADO -------------------------------------------------------
             ---------------------------------------------------------------------------------------------------- -->              

              <v-layout class="justify-center">
                  <div class="justify-center">
                    <v-flex xs6 md1>
                      <v-icon class="justify-center" style="font-size: 50px">mdi-folder-account</v-icon>
                    </v-flex>
                  </div>
                  <v-flex  xs4 >
                      <v-text-field
                      v-model="VCargo"
                      :counter="30"
                      :rules="RulesCargo"
                      label="Cargo"
                      filled                        
                      required
                      >
                      </v-text-field>
                    </v-flex>  

                <span style="color:white">-</span> 

                 <v-flex  xs4>
                     <v-textarea
                    outlined
                    height="90"
                    v-model="VFunciones"
                    :rules="RulesFunciones"
                    name="Funciones"
                    label="Funciones y logros del cargo"
                    
                    ></v-textarea>                   
                </v-flex> 
  
              </v-layout>  


           
              <!-- Botones de accion en el componente de formacion -->
              <v-layout class="justify-center"> 
                  <div class="justify-center">
                  <v-flex >
                      <v-btn outlined center :disabled="!valid" color="success" class=" mr-4" @click="ValidarFormulario()" >
                        Validar y continuar
                      </v-btn> 
                    
                      <v-btn outlined center color="info" class=" mr-4" @click="Limpiar">Limpiar</v-btn>
                      <v-btn outlined center color="error" class=" mr-4" @click="reset">Cancelar</v-btn> 
                  </v-flex>
                  </div>
              </v-layout>  

              <br/>  
              <v-divider
              light 
              ></v-divider>         
         
<!--             <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Limpiar
            </v-btn> -->


            <!-- @click="e1 = 2" -->
            <!--    <v-btn
           color="primary"              
               @click="e1 = 2"
            >
              Continue
            </v-btn>   -->

        </v-form>           

    </v-container>  





</template>



<script>

import {mapMutations, mapState} from 'vuex';
import store from "../store/index.js";
import Departamentos from "../Data/Departamentos.js";
import Mcipios from "../Data/Municipios.js";    


  export default {
    name: 'ExperienciaProfesional',

    data: () => ({
        FormacionValid:true,
        VEmpresa:"",
        VArea:"",
        VAñoInicialExperiencia:"",
        VMesInicial:"",
        VAñoFinal:"",
        VMesFinal:"",
        VMuni:"",
        VDepto:"",
        VCargo:"",
        VFunciones:"",
        alertdeañoinicial:0,
        ListDepartamento: Departamentos,
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
       ListAreas: [
          { value: '1', text: 'Atención a clientes' },
          { value: '2', text: 'Odontología general' },
          { value: '3', text: 'Ortodoncia' },
          { value: '4', text: 'Implantes' },
          { value: '5', text: 'Endodoncia' },
          { value: '6', text: 'Periodoncia' },
          { value: '7', text: 'Estética dental y Perioral' },
          { value: '8', text: 'Cirugía oral' },
          { value: '9', text: 'Prótesis fija' },
          { value: '10', text: 'Prótesis removible' },
          { value: '11', text: 'Odontopediatría' },
          { value: '12', text: 'Auxiliar' },
          { value: '13', text: 'Secretaria' },

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
        /* Reglas de validacion     */               
      nameRules: [
        v => !!v || 'Campo requerido',
        v => (v && v.length <= 30 && v.length > 2) || 'El campo debe contener entre 3 y 30 caracteres',
        v => /^[a-zA-Z\ ]{3,30}$/.test(v) || 'Campo no valido'
      ],
       RulesCargo: [
        v => !!v || 'Campo requerido',
        v => (v && v.length <= 20 && v.length > 2) || 'El campo debe contener entre 3 y 20 caracteres',
        v => /^[a-zA-Z0-9\ #()-_,.áéíóú-]{3,20}$/.test(v) || 'Campo no valido'
      ], 
      RulesFunciones: [
        v => !!v || 'Campo requerido',
        v => (v && v.length <= 300 && v.length > 2) || 'El campo debe contener entre 3 y 300 caracteres',
        v => /^[a-zA-Z0-9\ #()-_,.áéíóú-]{3,300}$/.test(v) || 'Campo no valido'
      ],           
       ceducativo: [
        v => !!v || 'Descripción del centro educativo es requerido',
        v => (v && v.length <= 50) || 'Descripción debe ser menor que 20 caracteres',
      ],       

    }),
    

     beforeMount() 
    {
      

      if (store.state.IndexExperiencia !== '' && store.state.AccionExperiencia == "Editar")
      {
          for(let i=0; i< store.state.ExperienciaProfesional.length; i++){
              
              if( i == store.state.IndexExperiencia)
              {                              
                  var FiltroArea =  this.ListAreas.filter(function(area) {
                        return area.text == store.state.ExperienciaProfesional[i].Area;
                    });

         
                    this.VEmpresa     = store.state.ExperienciaProfesional[i].Empresa ;
                    this.VArea        = FiltroArea[0].value
                    this.VAñoInicialExperiencia  = store.state.ExperienciaProfesional[i].AñoInicialExperiencia.toString();
                    this.VMesInicial  = store.state.ExperienciaProfesional[i].MesInicialExperiencia;
                    this.VAñoFinal    = store.state.ExperienciaProfesional[i].AñoFinalExperiencia.toString();
                    this.VMesFinal    = store.state.ExperienciaProfesional[i].MesFinalExperiencia;
                    this.VMuni        = store.state.ExperienciaProfesional[i].McpioExperiencia;
                    this.VDepto       = store.state.ExperienciaProfesional[i].DeptoExperiencia;
                    this.VCargo       = store.state.ExperienciaProfesional[i].Cargo;
                    this.VFunciones   = store.state.ExperienciaProfesional[i].Funciones;                

              }
            } 
      }
    },





  methods: 
       {

            // Se mapean las mutaciones
            //...mapMutations(['AsignarValoresExperienciaProfesional']),

            validate() {
              this.$refs.form.validate()
            },
            
            reset () {
              store.commit('CambiarMuestraFormExperiencia', { show: 0 });
              this.$refs.form.reset()
              //this.MuestraForm = 0;              
            },

            Limpiar () {
              this.$refs.form.reset()             
            },            
            
            resetValidation () {
              this.$refs.form.resetValidation()
            },
          
/*             ValidarFormulario(){
              
              if (this.$refs.form.validate())
              {

                let FiltroArea = "";
                FiltroArea = this.ListAreas.filter(number => number.value == this.VArea );
                store.commit('AsignarValoresExperienciaProfesional', { 
                DatoEmpresa:this.VEmpresa,
                DatoArea:FiltroArea[0].text,
                DatoAñoInicialExperiencia:this.VAñoInicial,
                DatoMesInicialExperiencia:this.VMesInicial,
                DatoAñoFinalExperiencia:this.VAñoFinal,
                DatoMesFinalExperiencia:this.VMesFinal,
                DatoDeptoExperiencia:this.VDepto,
                DatoMcpioExperiencia:this.VMuni,
                DatoCargo:this.VCargo,
                DatoFunciones:this.VFunciones
                });

                this.reset();
                this.e1 = this.e1 + 1;
                  
              }
              else{
                this.$refs.form.validate()
              }

            },  */


            ValidarFormulario(){

              if (this.$refs.form.validate())
              {
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

                let fecha1 = Date.parse(this.VAñoInicialExperiencia +"-"+ mes1 +"-"+ "01")
                let fecha2 = Date.parse(this.VAñoFinal +"-"+ mes2 +"-"+ "30")

                if(fecha1 <= fecha2)
                { 
                    let FiltroArea = "";
                    FiltroArea = this.ListAreas.filter(number => number.value == this.VArea );

                    if (store.state.IndexExperiencia !== '')
                    {                  
                        store.state.ExperienciaProfesional.splice(store.state.IndexExperiencia, 1);
                    }
                    
                    console.log("Entrooooooooo a experiencia",this.$refs.form.validate()  )
                    store.commit('AsignarValoresExperienciaProfesional', { 
                    DatoEmpresa:this.VEmpresa,
                    DatoArea:FiltroArea[0].text,
                    DatoAñoInicialExperiencia:this.VAñoInicialExperiencia,
                    DatoMesInicialExperiencia:this.VMesInicial,
                    DatoAñoFinalExperiencia:this.VAñoFinal,
                    DatoMesFinalExperiencia:this.VMesFinal,
                    DatoDeptoExperiencia:this.VDepto,
                    DatoMcpioExperiencia:this.VMuni,
                    DatoCargo:this.VCargo,
                    DatoFunciones:this.VFunciones
                    });

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
        FiltraMunicipio: function () {
          return this.ListMcipios = Mcipios.filter(mcpio => mcpio.depto == this.VDepto);
        }, 

      ...mapState([ 'numero','Empresa',
                    'Area',
                    'AñoInicialFormacion',
                    'MesInicialFormacion',
                    'AñoFinalFormacion',
                    'MesFinalFormacion',
                    'DeptoFormacion',
                    'McpioFormacion',
                    'Cargo',
                    'Funciones',
                    'IndexExperiencia',
                    'AccionExperiencia'])
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
