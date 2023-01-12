<template>

  <div class="home">  

<!-- <CompHojaVidaReclutador/> -->

     <div v-if="userLogged" class="mt-2">
        <CompHojaVidaReclutador/>
    </div>
    <div v-else>
    <br/>
        <login/>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src
import CompHojaVidaReclutador from '@/components/CompHojaVidaReclutador.vue'
import login from '@/views/Login.vue'
import auth from "@/auth";
import {mapActions, mapMutations, mapState} from 'vuex';
import store from "../store/index.js"; 

export default {
  name: 'CargueArchivos',
  components: {
    CompHojaVidaReclutador,
    login
  },
   views:{
      login
  }, 

    beforeMount() {

    const Name = auth.getUserLogged();
    
    if(this.userLogged == undefined)
    {
      store.commit('AsignarValorLoginEmpresa', { ValorLogin: 0, user:'',tipoususrio :'' });
    }
    else
    {      
     store.commit('AsignarValorLoginEmpresa', { ValorLogin: 1, user:Name.username, user:Name.tipoususrio });
     store.dispatch('GetDatosEmpresa',{email:Name.email});
    }       
  },  

  methods: {
    ...mapMutations(['AsignarValorLoginEmpresa']),
    ...mapActions(['GetDatosEmpresa'])
  },
  computed: {
    userLogged() {
       return auth.getUserLogged();
    },

  ...mapState(['VarLoginEmpresa'])
}
}
</script>