<template>
 
<div class="login"> 
     
      <v-alert variant="success" show><h1 class="title">Autenticación Requerida para: {{TipoIngreso}}s</h1></v-alert> 

     
    
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      >
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      >
      <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p>
      <input class="form-submit" type="submit" value="Ingresar">
    </form>
    <p class="msg">¿No tienes cuenta?
      <router-link to="/register">Regístrate</router-link>
    </p>
  </div>
</template>

<script>


import auth from "@/auth";
import store from "../store/index.js";
import {mapActions, mapMutations, mapState} from 'vuex';


export default {
  data: () => ({
    email: "",
    password: "",
    error: false
  }),
  methods: {

    ...mapMutations(['AsignarValorLogin']),
    ...mapActions(['GetDatosPersona']),
    
    async login() {
      try {
       const res = await auth.login(this.email, this.password);  

        const user = {
          email: this.email,
          tipousuario:res.data.user.tipousuario,
          token: res.data.jwt,
          username:res.data.user.username
        };


        await auth.setUserLogged(user);  
        const Name = await auth.getUserLogged();           
     
        store.commit('AsignarValorLogin', { ValorLogin: 1 ,user:Name.username,tipoususrio :Name.tipousuario});  
        //Se llama la accion que debe llenar los estados de la data de la persona        
        
        if(Name.tipousuario == "Empresa")
        {
          store.dispatch('GetDatosEmpresa',{email:Name.email});
        }else{
        store.dispatch('GetDatosPersona',{email:Name.email});
        }

     if(Name.tipousuario == 'Persona')
        {
            this.$router.push("/");
        }else{
          this.$router.push("/");
        } 
        
        
/*         if (this.$route.path != '/regparticipante') {
        this.$router.push("/regparticipante");
         } */
      } catch (error) {
        this.error = true;
        console.log("error:",error)
        //store.commit('AsignarValorLogin', { ValorLogin: 0 ,user: 'xxx',tipoususrio:''});
      }
    }
  },
   computed:{
    ...mapState(['VarLogin','TipoIngreso']),

    userLogged() {
    return auth.getUserLogged();
    },

  } 
};

</script>

<style  scoped>
/* lang="scss" */
.login {
  padding: 1rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 1rem;
  color: white;
  margin-bottom: 0.5rem;
/*   &:first-of-type {
    margin-top: 0rem;
  } */
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
/*   &:focus {
    outline: 0;
    border-color: #1ab188;
  } */
}
.form-submit {
  background: #f13210f5;
  border: none;
  color: rgb(252, 247, 247);
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
/*   &:hover {
    background: #0b9185;
  } */
}
.error {
  margin: 1rem 0 0;
  color: #110f10;
  
}
.msg {
  margin-top: 3rem;
  text-align: center;
}
</style>