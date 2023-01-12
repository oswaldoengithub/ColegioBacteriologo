<template>
    <v-container >

        <!-- ----------------------------------------------------------------------------------------------------
        ------------------------------------------ CENTRO EDUCATIVO ---------------------------------------------
        ---------------------------------------------------------------------------------------------------- -->
        <!-- hola desde componente {{numero}} -->
<!--           <v-alert v-if ="valid == false" type="error">
            Para poder continuar revise los campos de Perfil Profesional 
          </v-alert> -->

        <v-alert v-if ="ConfirmaGuardado == true" type="success">
        Sección almacenada exitosamente, presione siguiente para continuar 
        </v-alert>


        <v-form ref="form" v-model="valid" @change="foo" lazy-validation>
        <br/>

                 <!-- ----------------------------------------------------------------------------------------------------
                ------------------------------------------ DATOS PERFIL PROFESIONAL -------------------------------------
                -------------------------------------------------------------------------------------------------------->

                  <v-layout class="justify-center">
                      <div class="justify-center">
                      <v-flex xs6 md1>
                        <v-icon  class="justify-center" style="font-size: 50px;">mdi-school</v-icon>
                      </v-flex>
                      </div>
                    <v-flex  xs6 >
                      <v-text-field
                      :counter="50"
                      @keydown="KeyDownCargo"
                      :rules="cargoRules"
                      v-model="VCargoTitulo"                      
                      label="Cargo o titulo breve de su hoja de vidas "
                      filled                        
                      required                                          
                      >
                      <!-- @keydown="KeyDownCargo" -->
                      </v-text-field>
                    </v-flex>  

                    <!-- separador -->
                    <span style="color:white">-</span>  
                    </v-layout>

                    <v-layout class="justify-center">
                      <div class="justify-center">
                      <v-flex xs6 md1>
                        <v-icon  class="justify-center" style="font-size: 50px;">mdi-account-edit</v-icon>
                      </v-flex>
                      </div>                
                    <v-flex  xs6>
                     <v-textarea
                    outlined
                    height="90"
                    v-model="VDescripcionPerfil"
                    :rules="RulesDescripcionPerfil"
                    @keydown="KeyDownCargo"
                    name="Funciones"
                    label="Descripción breve de tu perfil profesional "
                    
                    ></v-textarea>                   
                </v-flex>            
              </v-layout>


              <!-- Botones de accion en el componente de formacion -->
              <v-layout class="justify-center"> 
                  <div class="justify-center">
                  <v-flex >
                     <v-btn small outlined center :disabled="!valid" color="success" class=" mr-4" @click="ValidarFormulario()">
                        Validar y guardar
                      </v-btn> 
                      <v-btn small outlined center color="info" class=" mr-4" @click="Limpiar">Limpiar</v-btn>                    

                  </v-flex>
                  </div>
              </v-layout>                

<!-- 
              <br/>  
              <v-divider
              light 
              ></v-divider>   -->       
         
        </v-form>           

    </v-container>  





</template>



<script>

import {mapMutations, mapState} from 'vuex';
import store from "../store/index.js";


  export default {
    name: 'PerfilProfesional',

    data: () => ({

        VCargoTitulo:'',
        VDescripcionPerfil:'',
        valid: true,
      cargoRules: [
        v => !!v || 'Campo requerido',
        /* v => (v && v.length <= 50 && v.length > 2) || 'El campo debe contener entre 3 y 50 caracteres', */
        v => /^[a-zA-Z0-9\ ,áéíóúñÑ-]{3,50}$/.test(v) || 'Campo perfil profesional no valido'  
      ],  
      RulesDescripcionPerfil:[
        v => !!v || 'Campo requerido',
        /* v => (v && v.length <= 150 && v.length > 2) || 'El campo debe contener entre 3 y 150 caracteres', */
        v => /^[a-zA-Z0-9\ #.()-/_,áéíóúñÑ-]{3,150}$/.test(v) || 'Campo cargo no valido, revise caracteres especiales'       
      ], 
      ConfirmaGuardado:false          

    }),


      beforeMount() 
      {
          this.VCargoTitulo   = store.state.CargoTitulo;
          this.VDescripcionPerfil = store.state.DescripcionPerfil;
      },


       methods: 
       {
            // Se mapean las mutaciones
            ...mapMutations(['AsignarValoresFormacion']),

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

            //metodo que controla el número de caracteres de una caja de texto
            KeyDownCargo()
            {
              console.log("valid:",this.$refs.form.validate())
              if (!this.$refs.form.validate())
              {
                store.commit('AsignarValidoPerfil', { ValidoPerfil:false });
              }else{
                store.commit('AsignarValidoPerfil', { ValidoPerfil:true });
              }

            } ,     
            
            
            ValidarFormulario(){
              
              if (this.$refs.form.validate())
              { 
                console.log("Entrooooooooo a guardar perfil",this.$refs.form.validate()  )
 /*              console.log ("DatoCargoTitulo:",this.VCargoTitulo)
                console.log ("DatoDescripcionPerfil:",this.VDescripcionPerfil)
               console.log ("PeriodoInicial:",this.VAñoInicial)
                console.log ("MesI:",this.VMesInicial)
                console.log ("PeriodoFinal:",this.VAñoFinal)
                console.log ("MesF:",this.VMesFinal)
                console.log ("EstadoEdu:",this.VEeducacion) */


                store.commit('AsignarValoresPerfilProfesional', { DatoCargoTitulo: this.VCargoTitulo,DatoDescripcionPerfil:this.VDescripcionPerfil,ValidoPerfil:this.valid });
/*                 this.reset(); */
                this.e1 = this.e1 + 1;
                this.ConfirmaGuardado = true
                  
              }
              else{
                this.$refs.form.validate()
                store.commit('AsignarValidoPerfil', { ValidoPerfil:false });
              }

            }, 

            Atras(){
              this.e1 = this.e1 - 1
            },

            foo(){
                //if (this.valid == true){
                console.log("cambio:",this.valid)
                //}
            },
          
       },

    computed: 
    {   
      ...mapState(['CargoTitulo','DescripcionPerfil','ValidPerfil'])
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
