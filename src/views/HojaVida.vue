<template>

  <div class="home">  

    <div v-if="userLogged" class="mt-2">
        <CompHojaVida/>
    </div>
    <div v-else>
    <br/>
        <login/>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src
import CompHojaVida from '@/components/CompHojaVida.vue'
import login from '@/views/Login.vue'
import auth from "@/auth";
import {mapMutations, mapState} from 'vuex';
import store from "../store/index.js";

export default {
  name: 'CargueArchivos',
  components: {
    CompHojaVida,
    login
  },
  views:{
      login
  },

  beforeMount() {  
    
   const Name = auth.getUserLogged();
   console.log("Name:",this.userLogged)
   
    if(this.userLogged == undefined)
    {
      store.commit('AsignarValorLogin', { ValorLogin: 0, user:'',tipoususrio :'' });
    }
    else
    {     
     store.commit('AsignarValorLogin', { ValorLogin: 1, user:Name.username, user:Name.tipoususrio });
     store.dispatch('GetDatosPersona',{email:Name.email});
    }       
  },

  methods: {
    ...mapMutations(['AsignarValorLogin'])
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    },

  ...mapState(['VarLogin'])
}
}
</script>