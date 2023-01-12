<template>

     
    <v-container grid-list-md pt-10>
<!-- v-if ="FormacionAcademica.length == 0" 
        <v-alert v-if = "ActualizacionExitosa == true" color="green lighten-4">
          Hoja de vida actualizada correctamente 
        </v-alert> -->

        <v-layout row wrap >
            <v-flex xs12 md6 >
                <v-card color="indigo lighten-5">
<!--                     max-height="350" max-width="450"  -->
                    <v-img src="../assets/personas.jpg" max-height="250" ></v-img>
                    <v-card-title>
                        <h2>Hoja de vida</h2>
                    </v-card-title>
                    <v-card-text>
                        <p >Es necesario mantener la hoja de vida actualizada para poder tener muchas mas oportunidades y aplicar con exito a las diferentes vacantes educativas y laborales, si ya se registro, presione el botón Actualizar Curriculo e ingrese a su hoja de vida para poder actualizar
                        </p>
                    </v-card-text>
                    <v-card-actions class="justify-left p7-0">
                        <v-btn color="info"  text :to="{name:'hojadevida'}">Actualizar curriculo</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 md6>
                <v-card color="indigo lighten-5">
                    <v-img src="../assets/Ofertas.jpg" max-height="250" ></v-img>
                    <v-card-title class="justify-center">
                        <h2>Buscar ofertas laborales</h2>
                    </v-card-title>
                    <v-card-text >
                        <v-form ref="form" v-model="valid" lazy-validation >
                            <v-layout class="justify-center " >
                                    <v-flex xs6 md1>
                                        <v-icon  class="justify-center" style="font-size: 50px;">mdi-file-find</v-icon>
                                    </v-flex>
                                <v-flex  xs6>
                                    <v-text-field
                                    :counter="50"
                                    :rules="BuscaCargoRules"
                                    v-model="VBuscaCargo"
                                    label="Cargo o área profesional"
                                    filled                        
                                    required
                                    >
                                    </v-text-field>
                                </v-flex> 

                                <!-- separador -->
                                <span style="color:white">-</span>  
                              
                                <v-flex xs6 md1>
                                <v-icon style="font-size: 50px">mdi-map-marker-outline</v-icon>
                                </v-flex>                               

                                <v-flex xs6>
                                    <v-select
                                    :items="ListDepartamento"
                                    v-model="VDepto"
                                    :rules="[v => !!v || 'El departamento es requerido']"
                                    filled
                                    label="Departamento Residencia"
                                    dense
                                    ></v-select>
                                </v-flex>                                   
                            </v-layout>
                        </v-form>
                        
                    </v-card-text>

                    <v-card-actions class="justify-center pb-1" >                       
                            <v-btn
                            :disabled="!valid"
                            color="info"     
                            @click="ValidarFormulario()" 
                            text
                            class="mb-4"
                                                           
                            >
                            Buscar
                            </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>            
        </v-layout>
    </v-container>
</template>

<script>

import Departamentos from "../Data/Departamentos.js";
import {mapMutations, mapState} from 'vuex';
import auth from "@/auth";
import store from "../store/index.js";

export default {
    components: {
    },
    data: () => ({
      //Datos del formulario
      VBuscaCargo:"",
      VDepto:"",     
      ListDepartamento: Departamentos,
      valid: true,
      /* Reglas de validacion     */               
      BuscaCargoRules:[
         v => !!v || 'Campo requerido',
        v => (v && v.length <= 50 && v.length > 2) || 'El campo debe contener entre 3 y 50 caracteres',
        v => /^[a-zA-Z0-9\ ,áéíóú-]{3,50}$/.test(v) || 'Campo no valido'       
      ],
      ShowForm:0,
      select: null,
      checkbox: false
      
    }),

    setup: () => ({ v$: useVuelidate() }),

  beforeMount() {
    const Name = auth.getUserLogged();    
    if(this.userLogged == undefined)
    {
      store.commit('AsignarValorLogin', { ValorLogin: 0, user:'',tipoususrio:'' });
    }
    else
    {      
     store.commit('AsignarValorLogin', { ValorLogin: 1, user:Name.username, tipoususrio :Name.tipousuario });
    }       
  },

    methods: {

      validate() {
        this.$refs.form.validate()
      },
      
      reset () {
        this.$refs.form.reset()
      },
      
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    
      ValidarFormulario(){
        if (this.$refs.form.validate())
        {
/*             this.e1 = this.e1 + 1
             store.commit('CambiarMuestraForm', { show: 0 }); */
             store.commit('AsignarValoresFiltroOferta', { 
                                                        CargoFiltro: this.VBuscaCargo, 
                                                        DeptoFiltro: this.VDepto, 
                                                        });
            this.$router.push("/filtroOfertas");
   
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
             store.commit('AsignarValoresAcademicos', { nikename: this.VNombres, apellido:this.VApellidos, TipoId:this.VTipoId, NroId: this.VNroId });
   
        }
        else{
          this.$refs.form.validate()
        }

      }, 

      Atras(){
        this.e1 = this.e1 - 1
      },

      AñadirFormacion (){
        store.commit('CambiarMuestraForm', { show: 1 }); 
             
      },
      AñadirExperiencia(){
        store.commit('CambiarMuestraFormExperiencia', { show: 1 }); 
                    
      },

      EliminarFormacion(id){
      var mensaje = window.confirm("¿ESTA SEGURO DE ELIMINAR LA FORMACIÓN ?");
      if(mensaje)
        {
          store.commit('EliminarFormacionAcademica', { index: id });
        }
      }   
        

    },

      computed: {
        FiltraMunicipio: function () {
          return this.ListMcipios = Mcipios.filter(mcpio => mcpio.depto == this.VDepto);
        },

        userLogged() {
          return auth.getUserLogged();
        },
        
        ...mapState(['numero','wilson','Nombre','Apellido','TipoIdentificacion','NroId','MuestraForm','MuestraFormExperiencia','FormacionAcademica','EliminarFormacionAcademica','ExperienciaProfesional','ValidPerfil','VarLogin','ActualizacionExitosa'])
      },

  

    }
</script>
