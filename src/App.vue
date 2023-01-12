<template>
  
  <v-app>

      <v-app-bar
        app
        color="indigo darken-4"
        dark
        mt-0
      >

        <div class="d-flex align-center">
  <!--         <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          /> -->

          <!-- <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="400"
            src="./assets/Col_Name.png"
            width="400"
          /> -->
        </div>

        <v-btn small class="indigo darken-4" text :to="{name:'Home'}">
          <span class="mr-2"></span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

      <v-spacer></v-spacer>
      <v-btn small v-if="TipoUsuario == 'Persona' || TipoUsuario == ''" @click="LoginPersona"    class="indigo darken-4" >Personas</v-btn>
      <v-btn small v-if="TipoUsuario == 'Empresa' || TipoUsuario == ''" @click="LoginReclutador" class="indigo darken-4 ml-3" >Empresas</v-btn>
 <!--      <v-btn small class="indigo darken-4 ml-3">Empresas</v-btn>
      <v-btn small class="indigo darken-4 ml-3">Salarios</v-btn> -->

      <v-spacer></v-spacer>
      
      <v-btn small v-if="VarLogin == 1 && TipoUsuario == 'Persona'" class="blue darken-1" :to="{name:'areapersona'}">
        <v-icon v-if="TipoUsuario == 'Persona' || TipoUsuario == ''" >mdi-account</v-icon>
        <v-icon v-if="TipoUsuario == 'Empresa' || TipoUsuario == ''" >mdi-home-modern</v-icon>
        <span class="mr-0 ">{{NombreUsuario.toLowerCase()}}</span>
      </v-btn>

      <v-btn small v-if="VarLogin == 1 && TipoUsuario == 'Empresa'" class="blue darken-1" :to="{name:'reclutadores'}">
        <v-icon v-if="TipoUsuario == 'Persona' || TipoUsuario == ''" >mdi-account</v-icon>
        <v-icon v-if="TipoUsuario == 'Empresa' || TipoUsuario == ''" >mdi-home-modern</v-icon>
        <span class="mr-0 ">{{NombreUsuario.toLowerCase()}}</span>
      </v-btn>      

      <v-spacer></v-spacer>

        <v-btn v-if="TipoIngreso == 'Persona' " :to="{name:'login'}" small class="blue lighten-4 red--text" >
          <span class="mr-2">Ingreso Personas </span>
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn v-if="TipoIngreso == 'Empresa'" small class="teal lighten-4 red--text" :to="{name:'login'}">
          <span class="mr-2">Ingreso Reclutadores </span>
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn small @click="cerrarSession()" class="dark" text>
        <span class="mr-2">Cerrar Sesión</span> 
        <v-icon>mdi-logout</v-icon>
        </v-btn>


      </v-app-bar>


    <v-main>
      <router-view/>
    </v-main>

    <br/>


  <v-footer
    dark
    padless
  >
    <v-card
      text
      tile
      class="indigo darken-4 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon color="yellow" icon size="30px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>


  </v-app>

  
</template>

<script>

import auth from "@/auth";
import store from "./store/index.js";
import {mapMutations, mapState} from 'vuex';

export default {
  name: 'App',

  data: () => ({
    //
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],    
  }),
      methods:{

      // Se mapean las mutaciones
      ...mapMutations(['AsignarValorLogin','CambiaLogin','IndicadorActualizacionHV']),

      async cerrarSession() {        
        try {
          await auth.deleteUserLogged();
          store.commit('AsignarValorLogin', { ValorLogin: 0, user:'',tipoususrio :'' });
          this.$router.push("/login")
        } catch (error) {
          console.log(error);
        } 
    },

/*     CambiaIndicadorActHV(){
      store.commit('IndicadorActualizacionHV', { valor: false });
    }, */

    LoginReclutador(){
      this.$router.push("/")
       store.commit('CambiaLogin', { TipoIngreso: "Empresa" });
    },
    LoginPersona(){
      this.$router.push("/")
       store.commit('CambiaLogin', { TipoIngreso: "Persona" });
    },
  },
  computed: 
  {
      userLogged() {
        return auth.getUserLogged();
      },

  ...mapState(['VarLogin','NombreUsuario','TipoIngreso','TipoUsuario'])
  }
  
};
</script>
