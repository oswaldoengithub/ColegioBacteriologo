<template>

   <v-container class="grey lighten-3" xs6  mt-5>   
       <div mt-5>Por favor digite los datos personales, profesionales y de experiencia profesional 

       </div>
       <br />
        
        <v-card>
            <v-toolbar
            flat
            color="red darken-4"
            dark
            >
            <v-toolbar-title dark color="primary">Mi Hoja de Vida</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
            <v-tab>
                <v-icon left>
                mdi-account
                </v-icon>
                Datos Personales
            </v-tab>
            <v-tab>
                <v-icon left>
                mdi-library
                </v-icon>
                Perfil Profesional
            </v-tab>
            <v-tab>
                <v-icon left>
               mdi-account-switch
                </v-icon>
                Exp. profesional
            </v-tab>

            <v-tab-item>
                <v-card flat>
                <v-card-text>


            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                <v-text-field
                v-model="Nombres"
                :counter="20"
                :rules="nameRules"
                label="Nombres"
                required
                ></v-text-field>

                <v-text-field
                v-model="Apellidos"
                :counter="20"
                :rules="nameRules"
                label="Apellidos"
                required
                ></v-text-field>

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-select
                v-model="select"
                :items="TipoIdentificacion"
                :rules="[v => !!v || 'Item is required']"
                label="Tipo Identificación"
                required
                ></v-select>
                <v-flex class="grey lighten-5" xs6>
                <v-text-field v-model="value" single-line label="Fecha Nacimiento">
                <template v-slot:append-outer>
                <date-picker v-model="value"/>
                </template>
                </v-text-field>
                </v-flex>

                <v-text-field
                v-model="NoIdentificacion"
                :counter="20"
                :rules="nameRules"
                label="Número Identificación"
                required
                ></v-text-field>

                <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
                ></v-checkbox>
                </v-form>




                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    <p>
                    Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                    </p>

                    <p>
                    Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                    </p>

                    <p>
                    Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                    </p>

                    <p>
                    Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                    </p>

                    <p class="mb-0">
                    Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                    </p>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    <p>
                    Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                    </p>

                    <p class="mb-0">
                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                    </p>
                </v-card-text>
                </v-card>
            </v-tab-item>
            </v-tabs>
        </v-card>
   </v-container>

</template>


<script>
import DatePicker from "../components/DatePicker";

  export default {
    components: {
        DatePicker
    },
    data: () => ({
      value:null,
      valid: true,
      name: '',      
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      TipoIdentificacion: [
        'CC - Cedula de Ciudadania',
        'CE - Cédula de Extranjería',
        'PA - Pasaporte'
      ],
      checkbox: false
      
    })

    }
</script>