<template>

<v-container grid-list-md >

<!--   {{VarLogin}} -->


     
     <v-banner  color="blue-grey lighten-5" elevation="10">
   <!--  <v-jumbotron  dark> -->
      <v-container fill-height>
        <v-layout align-center pb-1>
          <v-flex >
            <!-- <h3 class="display-2" >CARGA ARCHIVO SISMED</h3>
            
            <v-divider class="my-3"></v-divider> -->
 
          <v-layout>
            <v-flex>
              <v-card class="mx-auto" >
              <v-img height="150px" src="../assets/banner_CCO.png"></v-img>
              </v-card>
            </v-flex>
          </v-layout>
            <!-- <span  class="subheading my-3" pt-8>Por favor seleccione el archivo que desea cargar, recuerde que debe tener una estructura definida, al terminar de procesar se le enviara un correo con el resultado de las validaciones efectuadas, o puede ir a ver el resumen de archivos cargados en el histórico. </span>

            <v-divider class="my-3"></v-divider> 

            <div class="title mb-3">Revise el historico de archivos cargados por la entidad </div>

            <v-btn
              class="mx-0"
              color="primary"
              large
            >
              Historico
            </v-btn>-->
          </v-flex>
        </v-layout>



      </v-container>
      

  </v-banner>

<!--   <v-layout mt-5>
    <v-flex>
      <v-card >
        <v-img src="../assets/banner_CCO.png"></v-img>
      </v-card>
    </v-flex>
  </v-layout> -->

<v-card
  elevation="24"
  outlined
  shaped
  tile
></v-card> 

  <v-layout row wrap mt-8>

      <v-flex>
          <v-card
            v-if="TipoUsuario == 'Persona' || TipoUsuario == ''"
            class="mx-auto"
            max-width="280"
          >
            <v-img
              class="white--text align-end"
              height="150px"
              src="../assets/personas.jpg"
            >
            </v-img>
            <v-card-title>Mi hoja de vida</v-card-title>

            <v-card-subtitle>
              Ingresa o actualiza tu hoja de vida y encuentra las mejores ofertas 
            </v-card-subtitle>

<!--             <v-card-text class="text--primary">
              <div>Ingresa o actualiza tu hoja de vida y encuentra las mejores ofertas</div>
            </v-card-text>
 -->
            <v-card-actions>
              <v-btn :to="{name:'hojadevida'}" color="orange lighten-2" text>
                Ingresa tu hoja de vida
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>  

       <v-flex>
          <v-card
            v-if="TipoUsuario == 'Empresa' || TipoUsuario == '' "
            class="mx-auto"
            max-width="280"
          >
            <v-img
              class="white--text align-end"
              height="150px"
              src="../assets/Reclutadores.jpg"
            >
            </v-img>
            <v-card-title>Reclutadores</v-card-title>

            <v-card-subtitle>
              Registrese como empresa y comparta ofertas con la comunidad 
            </v-card-subtitle>

<!--             <v-card-text class="text--primary">
              <div>Ingresa o actualiza tu hoja de vida y encuentra las mejores ofertas</div>
            </v-card-text>
 -->
            <v-card-actions>
              <v-btn :to="{name:'hojadevidareclutador'}" color="orange lighten-2" text>
                Registre su empresa
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>           



      <v-flex>
          <v-card
            v-if="TipoUsuario == 'Persona' || TipoUsuario == ''"
            class="mx-auto"
            max-width="280"
          >
            <v-img
              class="white--text align-end"
              height="150px"
              src="../assets/Ofertas_banner.jpg"
            >
            </v-img>
            <v-card-title>Ofertas</v-card-title>

            <v-card-subtitle>
              Consulta las ofertas laborales y educativas publicadas
            </v-card-subtitle>

<!--             <v-card-text class="text--primary">
              <div>Ingresa o actualiza tu hoja de vida y encuentra las mejores ofertas</div>
            </v-card-text>
 -->
            <v-card-actions>
              <v-btn :to="{name:'filtroOfertas'}" color="orange lighten-2" text>
                Ver Ofertas
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>  



      <v-flex>
          <v-card
          v-if="TipoUsuario == 'Empresa' || TipoUsuario == '' "
            class="mx-auto"
            max-width="280"
          >
            <v-img
              class="white--text align-end"
              height="150px"
              src="../assets/Ofertas.jpg"
            >
            </v-img>
            <v-card-title>Ofertas Laborales</v-card-title>

            <v-card-subtitle>
              Ingresa y publica tus ofertas laborales o educativas 
            </v-card-subtitle>

<!--             <v-card-text class="text--primary">
              <div>Ingresa o actualiza tu hoja de vida y encuentra las mejores ofertas</div>
            </v-card-text>
 -->
            <v-card-actions>
              <v-btn :to="{name:'ofertaslaborales'}" color="orange lighten-2" text>
                Consultar - publicar oferta
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>  


    <!--   <v-flex>
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-img
              src="../assets/Ofertas.jpg"
              height="200px"
            ></v-img>

            <v-card-title>
              Ofertas Laborales
            </v-card-title>

            <v-card-subtitle>
              Registrate para poder aplicar a nuestras ofertas educativas y laborales
            </v-card-subtitle>

            <v-card-actions>
              <v-btn :to="{name:'hojadevida'}" color="orange lighten-2" text>
                Registrate
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="show = !show"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
      </v-flex> -->

  


       <v-flex>
          <v-card
            class="mx-auto"
            max-width="280"
          >
            <v-img
              class="white--text align-end"
              height="150px"
              src="../assets/News.jpg"
            >
            </v-img>
            <v-card-title>Noticias</v-card-title>

            <v-card-subtitle>
              Mantente informado acerca de las principales noticias del colegio    
            </v-card-subtitle>

<!--             <v-card-text class="text--primary">
              <div>Ingresa o actualiza tu hoja de vida y encuentra las mejores ofertas</div>
            </v-card-text>
 -->
            <v-card-actions>
              <v-btn href="https://colegiodeodontologos.org/noticias/" target="_blank" color="orange lighten-2" text>
                Ver mas ..
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-flex> 
    
    <!--   <v-flex>
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              src="../assets/Search.jpg"
            >
              <v-card-title>Noticias</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              Number 10
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                Share
              </v-btn>

              <v-btn
                color="orange"
                text
              >
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>   -->

  </v-layout>

</v-container>

 
</template>

<script>
  /* import HelloWorld from '../components/HelloWorld' */

import store from "../store/index.js";
import {mapMutations, mapState} from 'vuex';
import auth from "@/auth";

  export default {
    name: 'Home',
      data: () => ({
    show: false,
    model: 0,
    colors: [
      'primary',
      'secondary',
      'yellow darken-2',
      'red',
      'orange',
    ],
  }),

    beforeMount() {     

      const Name = auth.getUserLogged();
      if(this.userLogged == undefined){
        store.commit('AsignarValorLogin', { ValorLogin: 0, user:'',tipoususrio :'' });
      }else{
        store.commit('AsignarValorLogin', { ValorLogin: 1, user:Name.username,tipoususrio :Name.tipousuario });
      }       
    },

    components: {
      //HelloWorld,
    },
    computed: 
      {
          userLogged() {
          return auth.getUserLogged();
          },

      ...mapState(['VarLogin','TipoUsuario'])
      }
  }
</script>
