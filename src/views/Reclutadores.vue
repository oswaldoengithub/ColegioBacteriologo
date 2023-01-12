<template>
<!-- 
class="white--text align-end" -->
  <v-card
    class="mx-auto mt-10"
    max-width="1300"
  >
    <v-img
      class="align-end mb-3"
      height="300px"
      src="../assets/Reclutador3.jpg"
    >
     <!--  <v-card-title class="mt-10">Entidades reclutadoras de talento humano</v-card-title> -->
    </v-img>

 <!--    <v-card-subtitle class="pb-0">
      ¡Uniete a nosotros y publica tus ofertas laborales o educativas! Ahorra costos y tiempos en tus procesos de selección y consigue el candidato ideal de una forma rápida y fácil.
    </v-card-subtitle> -->

    <v-card-title >Entidades reclutadoras de talento humano</v-card-title>

    <v-card-text class="text--primary pb-0">
      <div>¡Unete a nosotros y publica tus ofertas laborales o educativas! Ahorra costos y tiempos en tus procesos de selección y consigue el candidato ideal de una forma rápida y fácil.</div>

     <!--  <div>Whitsunday Island, Whitsunday Islands</div> -->
    </v-card-text>

    <v-card-actions>
      <v-btn :to="{name:'hojadevidareclutador'}" color="light-blue accent-3" text>
        Registrar Empresa
      </v-btn>
<!--       <v-btn 
        color="light-blue accent-3"
        text
        class="mt-5"
        @click="RegistroEmpresa()"
      >
        Registrar Empresa
      </v-btn>  -->  

      <v-btn :to="{name:'ofertaslaborales'}" color="light-blue accent-3" text>
        Publicar Ofertas 
      </v-btn>          

<!--       <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>

  export default {
    components: {
        //DatePicker,
        //Formacion,
/*         ValidationProvider,
        ValidationObserver,
        ExperienciaProfesional,
        PerfilProfesional */
    },
    data: () => ({

      
    }),


    methods: {
      RegistroEmpresa(){
        
      }

    },

      computed: {
      },

  

    }
</script>
