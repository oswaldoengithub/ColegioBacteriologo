<template>
  <v-container mt-3>
    <h1>Ofertas laborales para: {{ CargoFiltro }}</h1>
    <v-card class="mt-3" v-for="item in this.FiltraOfertas" :key="item.id" elevation="2" shaped color="#F9FBE7">
      <v-card-title>{{ item.NombreOferta }}</v-card-title>
      <v-card-subtitle>{{item.DescripcionOferta}}</v-card-subtitle>
      <v-card-text>
          {{item.DescripcionOferta }} 
          {{item.Perfil}}
      </v-card-text>
      <v-card-actions>
        <v-btn class="ml-2" outlined rounded small> VER OFERTA ... </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>



<script>
import login from "@/views/Login.vue";
import auth from "@/auth";
import { mapActions, mapMutations, mapState } from "vuex";
import store from "../store/index.js";

export default {
  name: "CompOfertasFiltro",
  views: {
    login,
  },
  data: () => ({
      ListOfertas:[]
  }),

  beforeMount() {
    store.dispatch("GetDatosOfertaFiltro", {
      CargoFiltro: store.state.CargoFiltro,
      DeptoFiltro: store.state.DeptoFiltro,
    });
  },

  methods: {
    ...mapMutations(["GetDatosOfertaFiltro"]),
    ...mapActions(["GetDatosOfertaFiltro"]),
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    },

    FiltraOfertas: function () {
    let expresion = new RegExp(`${store.state.CargoFiltro}.*`, "i");
    let expresion2 = new RegExp(`${store.state.DeptoFiltro}.*`, "i");

    return this.ListOfertas = store.state.DataFiltroOferta.filter(oferta => expresion.test(oferta.NombreOferta) && expresion2.test(oferta.Departamento));
    },    

    ...mapState(["CargoFiltro", "DeptoFiltro","DataFiltroOferta"]),
  },
};
</script>