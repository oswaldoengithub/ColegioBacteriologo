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
                ----------------------------------------------- DATOS PERFIL EMPRESA -------------------------------------
                --------------------------------------------------------------------------------------------------------->
                  <v-layout class="justify-center">
                      <div class="justify-center">
                      <v-flex xs6 md1>
                        <v-icon  class="justify-center" style="font-size: 50px;">mdi-web</v-icon>
                      </v-flex>
                      </div>
                    <v-flex  xs6 >
                      <v-text-field
                      :counter="50"
                      @keydown="KeyDown"
                      :rules="PaginaRules"
                      v-model="VPaginaWeb"                      
                      label="Página web de la empresa"
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
                        <v-icon  class="justify-center" style="font-size: 50px;">mdi-home-modern</v-icon>
                      </v-flex>
                      </div>                
                    <v-flex  xs6>
                     <v-textarea
                    outlined
                    height="90"
                    v-model="VDescripcion"
                    :rules="RulesDescripcion"
                    @keydown="KeyDown"
                    name="Funciones"
                    label="Descripción breve de la empresa "
                    
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
import auth from "@/auth";


  export default {
    name: 'PerfilProfesional',

    data: () => ({

      VPaginaWeb:'',
      VDescripcion:'',
      valid: true,
      PaginaRules: [
        v => !!v || 'Campo página web requerida',
        /* v => (v && v.length <= 50 && v.length > 2) || 'El campo debe contener entre 3 y 50 caracteres', */
        v => /^[a-zA-Z0-9\ ,.áéíóúñÑ-]{3,50}$/.test(v) || 'Campo no valido'  
      ],  
      RulesDescripcion:[
        v => !!v || 'Campo requerido',
        /* v => (v && v.length <= 150 && v.length > 2) || 'El campo debe contener entre 3 y 150 caracteres', */
        v => /^[a-zA-Z0-9\ ,áéíóúñÑ-]{3,150}$/.test(v) || 'Campo no valido'       
      ], 
      ConfirmaGuardado:false          

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

          //Se asignan los valores de datos personales sacdos del API a los Vmodels del formulario
          this.VPaginaWeb     = store.state.ValoresTipoEmpresa[0].DatoPaginaWeb
          this.VDescripcion   = store.state.ValoresTipoEmpresa[0].DatoDescripcionEmpresa;      
      }       
    },


       methods: 
       {
            // Se mapean las mutaciones
            ...mapMutations(['AsignarValidoTipoEmpresa','AsignarValidarGuardarEmpresa','AsignarValorLoginEmpresa']),

            validate() {
              this.$refs.form.validate()
            },
            
            reset () {
              store.commit('CambiarMuestraForm', { show: 0 });
              this.$refs.form.reset()              
            },

            Limpiar () {
              store.commit('AsignarValidarGuardarEmpresa', { ValidarGuardarEmpresa:false });
              this.$refs.form.reset()              
            },            
            
            resetValidation () {
              this.$refs.form.resetValidation()
            },

            //metodo que controla el número de caracteres de una caja de texto
            KeyDown()
            {
              if (!this.$refs.form.validate())
              {
                store.commit('AsignarValidoTipoEmpresa', { ValidoTipoEmpresa:false });
              }else{
                store.commit('AsignarValidoTipoEmpresa', { ValidoTipoEmpresa:true });
              }
            },     
            
            
            ValidarFormulario(){
              
              if (this.$refs.form.validate())
              { 
                  //Asigna verdadero a la variable de 
                  store.commit('AsignarValidarGuardarEmpresa', { ValidarGuardarEmpresa:true });

                //Almacena la informacion en el objeto de tipo de empresa
                store.commit('AsignarValoresTipoEmpresa', { DatoPaginaWeb: this.VPaginaWeb,DatoDescripcionEmpresa:this.VDescripcion,ValidoTipoEmpresa:this.valid });
/*                 this.reset(); */
                this.e1 = this.e1 + 1;
                this.ConfirmaGuardado = true
                  
              }
              else{
                this.$refs.form.validate()
                store.commit('AsignarValidoTipoEmpresa', { ValidarGuardarEmpresa:false });
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
      userLogged() {
       return auth.getUserLogged();
    },
      ...mapState(['ValoresTipoEmpresa','ValidoTipoEmpresa','ValidarGuardarEmpresa','ValorLoginEmpresa'])
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
