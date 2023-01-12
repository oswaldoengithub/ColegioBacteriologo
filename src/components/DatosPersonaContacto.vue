<template>
    <v-container >

        <!-- ----------------------------------------------------------------------------------------------------
        ------------------------------------------ CENTRO EDUCATIVO ---------------------------------------------
        ---------------------------------------------------------------------------------------------------- -->
<!--           <v-alert v-if ="valid == false" type="error">
            Para poder continuar revise los campos de Perfil Profesional 
          </v-alert> 

        <v-alert v-if ="ConfirmaGuardado == true" type="success">
            Sección almacenada exitosamente, presione siguiente para continuar 
        </v-alert>-->


        <v-form ref="form" v-model="valid" @change="foo" lazy-validation>
        <br/>
                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ NOMBRES CONTACTO ---------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->

                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px;">mdi-account</v-icon>
                            </v-flex>
                            </div>
                          <v-flex  xs4 >
                            <v-text-field
                            :counter="80"
                            @keydown="KeyDown"
                            :rules="nameContactoRules"
                            v-model="VNombreContacto"
                            label="Nombres persona de contacto"
                            filled                                                   
                            required
                            >
                            </v-text-field>
                          </v-flex>  

                          <!-- separador -->
                          <span style="color:white">-</span>  

                          <v-flex  xs4>
                            <v-text-field
                            v-model="VApellidoContacto"
                            :counter="80"
                            @keydown="KeyDown"
                            :rules="nameContactoRules"
                            label="Apellidos persona de contacto "
                            filled                        
                            required
                            >
                            </v-text-field>
                          </v-flex>             
                        </v-layout>

                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ CARGO Y CORREO -----------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->  
                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px">mdi-wallet-travel</v-icon>
                            </v-flex>
                            </div>
                          <v-flex  xs4>
                            <v-select
                            @keydown="KeyDown"
                            :items="CargoEmpresa"
                            v-model="VCargoContacto"
                            :rules="[v => !!v || 'El cargo es requerido']"
                            label="Cargo"
                            required
                            ></v-select>
                          </v-flex>

                          <span style="color:white">-</span> 
                          

                            <v-flex  xs4 >
                            <v-text-field
                            @keydown="KeyDown"
                            v-model="VMail"
                            :counter="50"
                            :rules="emailRules"
                            label="Correo Electrónico"
                            filled                        
                            required
                            >
                            </v-text-field>
                          </v-flex> 
                        </v-layout>                     

                      <!-- ----------------------------------------------------------------------------------------------------
                      ------------------------------------------ TELEFONOS -------------------------------------------------
                      ---------------------------------------------------------------------------------------------------- -->

                        <v-layout class="justify-center">
                            <div class="justify-center">
                            <v-flex xs6 md1>
                              <v-icon class="justify-center" style="font-size: 50px">mdi-cellphone-basic</v-icon>
                            </v-flex>
                            </div>

                            <v-flex  xs4 >
                            <v-text-field
                            v-model="VTelefonoContacto"
                            :counter="20"
                            @keydown="KeyDown"
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
                            v-model="VTelefonoContacto2"
                            :counter="20"
                            @keydown="KeyDown"
                            :rules="telRules"
                            label="Telefono Movil secundario"
                            filled                        
                            required
                            >
                            </v-text-field>
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
        valid: true,
        //Vmodels de la persona de contacto de la empresa
        VNombreContacto:"",
        VApellidoContacto:"",
        VCargoContacto:"",
        VTelefonoContacto:"",
        VTelefonoContacto2:"",
        VMail:"",

        CargoEmpresa: [
          { value: 'Presidente', text: 'Presidente' },
          { value: 'Director', text: 'Director' },
          { value: 'Gerente', text: 'Gerente' },
          { value: 'Jefe', text: 'Jefe' },
          { value: 'Coordinador', text: 'Coordinador' },
          { value: 'Analista', text: 'Analista' },
          
        ], 

        nameContactoRules:[
            v => !!v || 'Campo requerido',
            v => (v && v.length <= 80 && v.length > 2) || 'El campo debe contener entre 3 y 80 caracteres',
            v => /^[a-zA-Z\ ]{3,80}$/.test(v) || 'Campo no valido'
        ], 
        emailRules: [
            v => (v && v.length <= 50 && v.length > 2) || 'El campo debe contener entre 3 y 50 caracteres',
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'Campo E-mail no valido',
        ],  
        telRules:[
            v => !!v || 'El número de telefono es requerido',
            v => /^[0-9]{3,12}$/.test(v) || 'Número telefonico incorrecto'
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
            this.VNombreContacto    = store.state.ValoresPersonaContacto[0].NombresContacto
            this.VApellidoContacto  = store.state.ValoresPersonaContacto[0].ApellidosContacto;  
            this.VCargoContacto     = store.state.ValoresPersonaContacto[0].Cargo
            this.VMail              = store.state.ValoresPersonaContacto[0].EmailContacto;  
            this.VTelefonoContacto  = store.state.ValoresPersonaContacto[0].Tel1Contacto
            this.VTelefonoContacto2 = store.state.ValoresPersonaContacto[0].Tel2Contacto;  
        }       
      },      


       methods: 
       {
            // Se mapean las mutaciones
            ...mapMutations(['AsignarValidoDatosContacto']),

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
            KeyDown()
            {
              if (!this.$refs.form.validate())
              {
                store.commit('AsignarValidoDatosContacto', { ValidoDatosContacto:false });
              }else{
                store.commit('AsignarValidoDatosContacto', { ValidoDatosContacto:true });
              }
            },     
            
            
            ValidarFormulario(){
              
              if (this.$refs.form.validate())
              { 
                    //Asigna verdadero a la variable de AsignarValidarGuardarEmpresa
                    store.commit('AsignarValidarGuardarContacto', { ValidarGuardarContacto:true });

                    store.commit('AsignarPersonaContacto', { NombresContacto: this.VNombreContacto,
                                                            ApellidosContacto:this.VApellidoContacto,
                                                            Cargo:this.VCargoContacto,
                                                            EmailContacto:this.VMail,
                                                            Tel1Contacto:this.VTelefonoContacto,
                                                            Tel2Contacto:this.VTelefonoContacto2,                                                                                                                                                                           
                                                            ValidoPersonaContacto:this.valid
                                                            });
                    /*this.reset(); */
                    this.e1 = this.e1 + 1;
                    this.ConfirmaGuardado = true
                  
              }
              else{
                this.$refs.form.validate()
                store.commit('AsignarValidarGuardarContacto', { ValidarGuardarContacto:false });
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
      ...mapState(['CargoTitulo','DescripcionPerfil','ValidPerfil','ValidoDatosContacto','ValidarGuardarContacto'])
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
