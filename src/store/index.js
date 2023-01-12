import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from "@/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    numero: 10,
    wilson:22,
    //Datos Personales
    DatosPersonales:[],
    Nombre:'',
    Apellido:'',
    TipoIdentificacion:'',
    NroId:'',
    FechaNacimiento:'',
    Genero:'',
    Depto:'',
    Mcpio:'',
    Movil:'',
    Movil2:'',
    Email:'',
    Direccion:'',
    //Datos Perfil Profesional
    CargoTitulo:'',
    DescripcionPerfil:'',
    //Datos Académicos
    CentroEducativo:'',
    NivelEstudios:'',
    AñoInicial:'',
    MesInicial:'',
    AñoFinal:'',
    MesFinal:'',
    EstadoEducacion:'',
    FormacionAcademica:[],
    FormacionCursos:[],
    //swith para abrir o cerrar formulario de Formación
    MuestraForm:0,
    MuestraFormExperiencia:0,
    MuestraFormCursos:0, 
    //Datos Formacion
    Empresa:"",
    Area:"",
    AñoInicialFormacion:'',
    MesInicialFormacion:'',
    AñoFinalFormacion:'',
    MesFinalFormacion:'',
    DeptoFormacion:'',
    McpioFormacion:'',
    Cargo:'',
    Funciones:'',
    ExperienciaProfesional:[],
    VarLogin: 0,
    ValidPerfil:false,
    ValidoTipoEmpresa:false,
    ValidoDatosContacto:false,
    ValidarGuardarEmpresa:false,
    ValidarGuardarContacto:false,
    IdNuevo:0,
    NombreUsuario:'',
    IndexFormacion:'',
    IndexExperiencia:'',
    IndexCursos:'',
    AccionFormacion:'',
    AccionExperiencia:'',
    AccionCursos:'',
    TipoIngreso:'Persona',
    TipoUsuario:'',
    IndexCurso:'',
    MuestraFormCurso:0,
    AccionCurso:'',
    EmailLogin:'',
    ActualizacionExitosa:false,
    ActualizacionExitosaEmpresa:false,
    //
    VarLoginEmpresa:'',
    NombreUsuarioEmpresa:'',
    TipoUsuarioEmpresa:'',   
    //Datos Empresa 
    DatosPersonalesEmpresa:[],
    ValoresTipoEmpresa:[],
    ValoresPersonaContacto:[],
    DataFiltroOferta:[],
    DataFiltroAplicacionOferta:[],
    DatoPaginaWeb:"",
    DatoDescripcionEmpresa:"",
    ValidoTipoEmpresa :"",
    //Datos para filtro de ofertas
    CargoFiltro : "",
    DeptoFiltro : "",
    RegistroExitoso: false,
    
  },

   mutations: 
  {
    aumentar(state){
      state.numero ++
    },

    AsignarValoresPersonales(state,payload){

      state.Nombre = payload.nikename 
      state.Apellido = payload.apellido 
      state.TipoIdentificacion = payload.TipoId
      state.NroId = payload.NroId
      state.FechaNacimiento= payload.FechaNacimiento
      state.Genero= payload.Genero
      state.Depto= payload.Depto
      state.Mcpio= payload.Mcpio
      state.Movil= payload.Movil
      state.Movil2= payload.Movil2
      state.Email= payload.Email
      state.Direccion= payload.Direccion
      
/*       if(payload.nikename != '')
      {
          state.DatosPersonales.push({
            Nombre : payload.nikename ,
            Apellido : payload.apellido ,
            TipoIdentificacion : payload.TipoId,
            NroId: payload.NroId,
            FechaNacimiento: payload.FechaNacimiento,
            Genero : payload.Genero,
            Depto  : payload.Depto,
            Mcpio  : payload.Mcpio,
            Movil  : payload.Movil,
            Movil2 : payload.Movil2,
            Email  : payload.Email,
            Direccion: payload.Direccion
          })     
      }  */


    },

    AsignarValoresAcademicos(state,payload){
/*       state.CentroEducativo = payload.Centro
      state.NivelEstudios = payload.Nivel
      state.AñoInicial = payload.PeriodoInicial
      state.MesInicial = payload.MesI
      state.AñoFinal = payload.PeriodoFinal
      state.MesFinal = payload.MesF
      state.EstadoEducacion= payload.EstadoEdu */

      state.FormacionAcademica.push({
        CentroEducativo : payload.Centro,
        Nivel : payload.Nivel,
        AñoInicial : payload.PeriodoInicial,
        MesInicial : payload.MesI,
        AñoFinal : payload.PeriodoFinal,
        MesFinal : payload.MesF,
        Estado : payload.EstadoEdu
      })
    },

    AsignarValoresPersonalesEmpresa(state,payload)
    {     
      state.DatosPersonalesEmpresa=[];

      state.DatosPersonalesEmpresa.push({
      NombreEmpresa   : payload.NombreEmpresa,
      Nit             : payload.Nit,
      Sector          : payload.Sector,
      NoTrabajadores  : payload.NoTrabajadores,
      Departamento    : payload.Departamento,
      Municipio       : payload.Municipio,
      Telefono1       : payload.Telefono1,
      Telefono2       : payload.Telefono2,
      Email           : payload.Email,
      Direccion       : payload.Direccion
    })

    },

    AsignarValoresCursos(state,payload){ 
      
            state.FormacionCursos.push({
              CentroEducativo : payload.CentroEducativo,
              Tipo : payload.Tipo,
              NombreCurso : payload.NombreCurso,
              Temporalidad : payload.Temporalidad,
              CantTiempo : payload.CantTiempo,
              Estado : payload.Estado
            })
          },  

    AsignarValoresExperienciaProfesional(state,payload){
/*       state.Empresa = payload.DatoEmpresa
      state.Area = payload.DatoArea
      state.AñoInicialFormacion = payload.DatoAñoInicialFormacion
      state.MesInicialFormacion = payload.DatoMesInicialFormacion
      state.AñoFinalFormacion = payload.DatoAñoFinalFormacion
      state.MesFinalFormacion = payload.DatoMesFinalFormacion
      state.DeptoFormacion= payload.DatoDeptoFormacion
      state.McpioFormacion= payload.DatoMcpioFormacion
      state.Cargo= payload.DatoCargo
      state.Funciones= payload.DatoFunciones */

      state.ExperienciaProfesional.push({
        Empresa: payload.DatoEmpresa,
        Area:payload.DatoArea,
        AñoInicialExperiencia:payload.DatoAñoInicialExperiencia,
        MesInicialExperiencia:payload.DatoMesInicialExperiencia,
        AñoFinalExperiencia:payload.DatoAñoFinalExperiencia,
        MesFinalExperiencia:payload.DatoMesFinalExperiencia,
        DeptoExperiencia:payload.DatoDeptoExperiencia,
        McpioExperiencia:payload.DatoMcpioExperiencia,
        Cargo:payload.DatoCargo,
        Funciones:payload.DatoFunciones
      })
    },

    AsignarValoresPerfilProfesional(state,payload){
      state.CargoTitulo = payload.DatoCargoTitulo
      state.DescripcionPerfil = payload.DatoDescripcionPerfil
      state.ValidPerfil = payload.ValidoPerfil
    },

    AsignarValoresTipoEmpresa(state,payload){
      state.ValoresTipoEmpresa=[];
      state.ValoresTipoEmpresa.push({
        DatoPaginaWeb:payload.DatoPaginaWeb,
        DatoDescripcionEmpresa:payload.DatoDescripcionEmpresa,
        ValidoTipoEmpresa:payload.ValidoTipoEmpresa
      })

    },

    AsignarPersonaContacto(state,payload){

      state.ValoresPersonaContacto = [];

      state.ValoresPersonaContacto.push({
        NombresContacto:payload.NombresContacto,
        ApellidosContacto:payload.ApellidosContacto,
        Cargo:payload.Cargo,
        EmailContacto:payload.EmailContacto,
        Tel1Contacto:payload.Tel1Contacto,
        Tel2Contacto:payload.Tel2Contacto,
        ValidoPersonaContacto:payload.ValidoPersonaContacto
      })
    },  
    
    AsignarDatosFiltroOfertas(state,payload){
      state.DataFiltroOferta.push({
        id:payload.id,
        NombreOferta:payload.NombreOferta,
        DescripcionOferta:payload.DescripcionOferta,
        TipoContrato:payload.TipoContrato,
        Horario:payload.Horario,
        Salario:payload.Salario,
        Perfil:payload.Perfil,
        Departamento:payload.Departamento,
        Municipio:payload.Municipio, 
        IdEmpresa:payload.IdEmpresa       
      })       
    },


    AsignarDatosAplicacionOfertas(state,payload){
      state.DataFiltroOferta.push({
        id:payload.id,
        NombreOferta:payload.NombreOferta,
        DescripcionOferta:payload.DescripcionOferta,
        TipoContrato:payload.TipoContrato,
        Horario:payload.Horario,
        Salario:payload.Salario,
        Perfil:payload.Perfil,
        Departamento:payload.Departamento,
        Municipio:payload.Municipio, 
        IdPersona:payload.IdPersona       
      }) 

    },    

    CambiarMuestraForm(state,payload){
      state.MuestraForm = payload.show
    },  

    CambiarMuestraFormExperiencia(state,payload){
      state.MuestraFormExperiencia = payload.show
    },

    CambiarMuestraFormCursos(state,payload){
      state.MuestraFormCursos = payload.show
    },         

    EliminarFormacionAcademica(state,payload){
      state.FormacionAcademica.splice(payload.index,1)
    } ,
    EliminarExperienciaProfesional(state,payload){
      state.ExperienciaProfesional.splice(payload.index,1)
    },
    EliminarCurso(state,payload){
      state.FormacionCursos.splice(payload.index,1)
    },
        
    AsignarValorLogin(state,payload){ 
      state.VarLogin = payload.ValorLogin
      state.NombreUsuario = payload.user
      state.TipoUsuario = payload.tipoususrio
    },
    AsignarValorLoginEmpresa(state,payload){
      state.VarLoginEmpresa = payload.ValorLoginEmpresa
      state.NombreUsuarioEmpresa = payload.user
      state.TipoUsuarioEmpresa = payload.tipoususrio
    },

    AsignarValidoPerfil(state,payload){
      state.ValidPerfil = payload.ValidoPerfil
    },

    AsignarValidoTipoEmpresa(state,payload){
      state.ValidoTipoEmpresa = payload.ValidoTipoEmpresa
    },   
    
    AsignarValidoDatosContacto(state,payload){
      state.ValidoDatosContacto = payload.ValidoDatosContacto
    },    
    
    AsignarIdPersonaInsertada(state,id){
      state.IdNuevo = id
    },

    AsignarValorRegistroExitoso(state,valor){ 
      state.RegistroExitoso = valor
      console.log("este es el valor",valor)
    },

    AsignarValidarGuardarEmpresa(state,payload){
      state.ValidarGuardarEmpresa = payload.ValidarGuardarEmpresa
    },  
    AsignarValidarGuardarContacto(state,payload){
      state.ValidarGuardarContacto = payload.ValidarGuardarContacto
    }, 

    AsignarValoresFiltroOferta(state,payload){
      state.CargoFiltro = payload.CargoFiltro
      state.DeptoFiltro = payload.DeptoFiltro

    },

    ResetearListasFormacionExperiencia(state){
      state.FormacionAcademica = [],
      state.ExperienciaProfesional= [],
      state.FormacionCursos=[]
    },

    ResetearListaOfertasFiltro(state){
      state.DataFiltroOferta = []
    },    

    ResetearListAplicacionesOferta(state){
      state.DataFiltroAplicacionOferta = []
    },

    CambiarIndexFormacion(state,payload){
      state.IndexFormacion = payload.IndexFormacion      
    },
    CambiarAccionFormacion(state,payload){
      state.AccionFormacion = payload.AccionFormacion
    },
    CambiarIndexExperiencia(state,payload){
      state.IndexExperiencia = payload.IndexExperiencia      
    },  
    CambiarIndexCursos(state,payload){
      state.IndexCursos = payload.IndexCurso      
    },       
    CambiarAccionExperiencia(state,payload){
      state.AccionExperiencia = payload.AccionExperiencia
    },
    CambiarAccionCursos(state,payload){
      state.AccionCursos = payload.AccionCursos
    },    
    CambiaLogin(state,payload){
      state.TipoIngreso = payload.TipoIngreso
    },
    CambiarIndexCurso(state,payload){
      state.IndexCurso = payload.IndexCurso      
    }, 
    CambiarMuestraFormCurso(state,payload){
      state.MuestraFormCurso = payload.show
    },    
    CambiarAccionCurso(state,payload){
      state.AccionCurso = payload.AccionCurso
    },
    IndicadorActualizacionHV(state,valor){
      state.ActualizacionExitosa = valor
    }, 
    IndicadorActualizacionHVEmpresa(state,valor){
      state.ActualizacionExitosaEmpresa = valor
    },          

    /************************************************************************************************************ */
    /************************* MUTACIONES PARA GUARDAR LOS DATOS DE LA PERSONA ************************************/
    /************************************************************************************************************ */
     GuardarPerfilProfesional(state,id){
      //variable para Perfil Profesional
      const PerfilProfesional = {
        TituloPerfil: state.CargoTitulo,
        DescripcionPerfil: state.DescripcionPerfil,
        TipoId:state.TipoIdentificacion,
        NroId: state.NroId,
        IdPersona : id,
        t_persona: id
      }


      const Key = 'Bearer ' + auth.getUserLogged().token;
      axios.post('http://104.248.56.215:1337/t-perfil-profesionals',PerfilProfesional,{
      headers: {
        Authorization: Key
      },
      }).then (response =>{          
        //console.log(response.data)    
        if(response.data)
        {
          console.log("Registro PerfilProfesional insertado con éxito")            
        }
        else
        {
          console.log("Error al tratar de insertar el registro de PerfilProfesional")
        }  
      })
        .catch (e => function(error){
        console.log(error)
      })
  
    }, 

    EditarPersona(state,id){

      const persona = {
        NombrePersona: state.Nombre,
        ApellidoPersona: state.Apellido,
        TipoId: state.TipoIdentificacion,
        NroId: state.NroId,
        FechaNacimiento: state.FechaNacimiento,
        Genero: state.Genero,
        DeptoResidencia: state.Depto,
        MuniResidencia: state.Mcpio,
        MovilPrincipal: state.Movil,
        MovilSecundario: state.Movil2,
        Email: state.Email,
        DireccionResidencia:state.Direccion
      }  


        //Llamado al API para almacenar los datos del perfil-profesional
        const Key = 'Bearer ' + auth.getUserLogged().token;
        axios.put('http://104.248.56.215:1337/t-personas/'+id,persona,{headers: {
          Authorization: Key
        },}).then (response =>{          
          //console.log(response.data)    
          if(response.data)
          {
            console.log("Registro persona editado con éxito");            
          }
          else
          {
            console.log("Error al tratar de editar la información de la persona");
          }  
        })
          .catch (e => function(error){
          console.log(error)
        }) 



    },


    EditarPerfilProfesional(state,payload){

      //variable para Perfil Profesional
      const PerfilProfesional = {
        TituloPerfil: state.CargoTitulo,
        DescripcionPerfil: state.DescripcionPerfil,
        TipoId:state.TipoIdentificacion,
        NroId: state.NroId,
        IdPersona : payload.IdPersona,
        t_persona: payload.IdPersona
      }

      //Llamado al API para almacenar los datos del perfil-profesional
      const Key = 'Bearer ' + auth.getUserLogged().token;
      axios.put('http://104.248.56.215:1337/t-perfil-profesionals/'+payload.IdPerfil,PerfilProfesional,{headers: {
        Authorization: Key
      },}).then (response =>{          
        //console.log(response.data)    
        if(response.data)
        {
          console.log("Registro PerfilProfesional editado con éxito");            
        }
        else
        {
          console.log("Error al tratar de editar el registro de PerfilProfesional");
        }  
      })
        .catch (e => function(error){
        console.log(error)
      })     
    },
    
    EditarInformacionEmpresa(state,payload){

      //variable para almacenar la informacion de la empresa
      const InformacionEmpresa = {
        NombreEmpresa     : state.DatosPersonalesEmpresa[0].NombreEmpresa,
        Nit               : state.DatosPersonalesEmpresa[0].Nit,
        Sector            : state.DatosPersonalesEmpresa[0].Sector,
        NoTrabajadores    : state.DatosPersonalesEmpresa[0].NoTrabajadores,
        Departamento      : state.DatosPersonalesEmpresa[0].Departamento,
        Municipio         : state.DatosPersonalesEmpresa[0].Municipio,
        TelefonoPrincipal : state.DatosPersonalesEmpresa[0].Telefono1,
        TelefonoSecundario: state.DatosPersonalesEmpresa[0].Telefono2,
        Email             : state.DatosPersonalesEmpresa[0].Email,
        Direccion         : state.DatosPersonalesEmpresa[0].Direccion,
        //
        PaginaWeb           : state.ValoresTipoEmpresa[0].DatoPaginaWeb,
        DescripcionEmpresa  : state.ValoresTipoEmpresa[0].DatoDescripcionEmpresa,
        //
        NombreContacto     : state.ValoresPersonaContacto[0].NombresContacto,
        ApellidosContacto   : state.ValoresPersonaContacto[0].ApellidosContacto,
        Cargo               : state.ValoresPersonaContacto[0].Cargo,
        EmailContacto       : state.ValoresPersonaContacto[0].EmailContacto,
        TelefonoContacto    : state.ValoresPersonaContacto[0].Tel1Contacto,
        TelefonoContacto2   : state.ValoresPersonaContacto[0].Tel2Contacto
      }

       //Llamado al API para almacenar los datos del perfil-profesional
      const Key = 'Bearer ' + auth.getUserLogged().token;
      try {
        axios.put('http://104.248.56.215:1337/empresas/'+payload.IdEmpresa,InformacionEmpresa, {headers: {
        Authorization: Key
      },}).then (response =>{          
        if(response.data)
        {
          console.log("Empresa editada con éxito");            
        }
        else
        {
          console.log("Error al tratar de editar la Empresa");
        }  
      })      
      } catch (error) {
        console.log("Eroooooooorr",error)
      }   
    }, 
    
    
    GuardarInformacionEmpresa(state){
      //variable para almacenar la informacion de la empresa

      const InformacionEmpresa = {
        NombreEmpresa     : state.DatosPersonalesEmpresa[0].NombreEmpresa,
        Nit               : state.DatosPersonalesEmpresa[0].Nit,
        Sector            : state.DatosPersonalesEmpresa[0].Sector,
        NoTrabajadores    : state.DatosPersonalesEmpresa[0].NoTrabajadores,
        Departamento      : state.DatosPersonalesEmpresa[0].Departamento,
        Municipio         : state.DatosPersonalesEmpresa[0].Municipio,
        TelefonoPrincipal : state.DatosPersonalesEmpresa[0].Telefono1,
        TelefonoSecundario: state.DatosPersonalesEmpresa[0].Telefono2,
        Email             : state.DatosPersonalesEmpresa[0].Email,
        Direccion         : state.DatosPersonalesEmpresa[0].Direccion,
        //
        PaginaWeb           : state.ValoresTipoEmpresa[0].DatoPaginaWeb,
        DescripcionEmpresa  : state.ValoresTipoEmpresa[0].DatoDescripcionEmpresa,
        //
        NombreContacto     : state.ValoresPersonaContacto[0].NombresContacto,
        ApellidosContacto   : state.ValoresPersonaContacto[0].ApellidosContacto,
        Cargo               : state.ValoresPersonaContacto[0].Cargo,
        EmailContacto       : state.ValoresPersonaContacto[0].EmailContacto,
        TelefonoContacto    : state.ValoresPersonaContacto[0].Tel1Contacto,
        TelefonoContacto2   : state.ValoresPersonaContacto[0].Tel2Contacto
      }      

      //Llamado al API para almacenar los datos del perfil-profesional
      const Key = 'Bearer ' + auth.getUserLogged().token;
      axios.post('http://104.248.56.215:1337/empresas/',InformacionEmpresa,{headers: {
        Authorization: Key
      }}).then (response =>{          
        //console.log(response.data)    
        if(response.data)
        {
          console.log("Registro de la empresa insertado con éxito");            
        }
        else
        {
          console.log("Error al tratar de insertar el registro de la empresa");
        }  
      })
        .catch (e => function(error){
        console.log(error)
      })     
    },


    GuardarFormacion(state,id){

      for (let item in state.FormacionAcademica)
      {             
            //variable para Formacion Academica
            const FormacionAcademica = {
              CentroEducativo: state.FormacionAcademica[item].CentroEducativo,
              Nivel:state.FormacionAcademica[item].Nivel,
              AnioInicial: state.FormacionAcademica[item].AñoInicial,
              MesInicial: state.FormacionAcademica[item].MesInicial,
              AnioFinal: state.FormacionAcademica[item].AñoFinal,
              MesFinal: state.FormacionAcademica[item].MesFinal,
              EstadoFormacion: state.FormacionAcademica[item].Estado,
              IdPersona : id,
              t_persona: id
            }

          const Key = 'Bearer ' + auth.getUserLogged().token;
            axios.post('http://104.248.56.215:1337/t-formacions',FormacionAcademica,{
            headers: {
              Authorization: Key
            },
          }).then (response =>{          
              //console.log(response.data)    
              if(response.data)
              {
                console.log("Registro de formación insertado con exito")            
              }
              else
              {
                console.log("Error al tratar de insertar el registro de formación")
              }  
            })
              .catch (e => function(error){
              console.log(error)
            })
      }

    },

    EditarFormacion(state,payload){

      for(let item in payload.t_formacions)
      {      
              const Key = 'Bearer ' + auth.getUserLogged().token;
              try {
                axios.delete('http://104.248.56.215:1337/t-formacions/' + payload.t_formacions[item].id, {
                  headers: {
                    Authorization: Key
                  },
                })              
              } catch (error) {
                console.log("Error al tratar de eliminar formaciones académicas")                
              }
      }
    },

    GuardarExperiencia(state,id){

      for (let item in state.ExperienciaProfesional)
      {
                              
            //variable para Formacion Academica
            const Experiencia = {
              NombreEmpresa: state.ExperienciaProfesional[item].Empresa,
              Area:state.ExperienciaProfesional[item].Area,
              AnioInicial:state.ExperienciaProfesional[item].AñoInicialExperiencia,
              MesInicial:state.ExperienciaProfesional[item].MesInicialExperiencia,
              AnioFinal:state.ExperienciaProfesional[item].AñoFinalExperiencia,
              MesFinal:state.ExperienciaProfesional[item].MesFinalExperiencia,
              Departamento:state.ExperienciaProfesional[item].DeptoExperiencia,
              Municipio:state.ExperienciaProfesional[item].McpioExperiencia,
              Cargo:state.ExperienciaProfesional[item].Cargo,
              FuncionesLogros:state.ExperienciaProfesional[item].Funciones,              
              IdPersona:id,
              t_persona:id
            }

            const Key = 'Bearer ' + auth.getUserLogged().token;
            axios.post('http://104.248.56.215:1337/t-experiencias',Experiencia,{
              headers: {
              Authorization: Key
              },
              }).then (response =>{          
              //console.log(response.data)    
              if(response.data)
              {
                console.log("Registro de experiencia insertado con exito")            
              }
              else
              {
                console.log("Error al tratar de insertar el registro de experiencia")
              }  
            })
              .catch (e => function(error){
              console.log(error)
            })
      }

    },

    EditarExperiencia(state,payload){

      for(let item in payload.t_experiencias)
      {      
              const Key = 'Bearer ' + auth.getUserLogged().token;
              try {
                axios.delete('http://104.248.56.215:1337/t-experiencias/' + payload.t_experiencias[item].id, {
                  headers: {
                    Authorization: Key
                  },
                })              
              } catch (error) {
                console.log("Error al tratar de eliminar Experiencias laborales")                
              }
      }
    },    

    EditarCursos(state,payload){

      for(let item in payload.t_cursos)
      {      
              const Key = 'Bearer ' + auth.getUserLogged().token;
              try {
                axios.delete('http://104.248.56.215:1337/t-cursos/' + payload.t_cursos[item].id, {
                  headers: {
                    Authorization: Key
                  },
                })              
              } catch (error) {
                console.log("Error al tratar de eliminar el curso")                
              }
      }
    },      
    
    GuardarCursos(state,id){

      for (let item in state.FormacionCursos)
      {
                              
            //variable para Formacion Cursos
            const FormacionCursos = {
              CentroEducativo: state.FormacionCursos[item].CentroEducativo,
              TipoEducacion:state.FormacionCursos[item].Tipo,
              NombreCurso: state.FormacionCursos[item].NombreCurso,
              Temporalidad: state.FormacionCursos[item].Temporalidad,
              CantidadTiempo: state.FormacionCursos[item].CantTiempo,
              Estado: state.FormacionCursos[item].Estado,
              IdPersona : id,
              t_persona:id
            }
 
            const Key = 'Bearer ' + auth.getUserLogged().token;
            axios.post('http://104.248.56.215:1337/t-cursos',FormacionCursos,{
              headers: {
                Authorization: Key
               },
            }).then (response =>{          
              //console.log(response.data)    
              if(response.data)
              {
                console.log("Registro de formación en cursos fue insertado con exito")            
              }
              else
              {
                console.log("Error al tratar de insertar el registro de formación en cursos")
              }  
            })
              .catch (e => function(error){
              console.log(error)
            })
      }

    },    


    /************************************************************************************************************ */
    /***************** MUTACIONES PARA EXTRAER LOS DATOS DE LA PERSONA DE LA BASE DE DATOS ************************/
    /************************************************************************************************************ */ 
        
  },
  actions: {

        GuardarDatos: async function({state,commit})
        {
          let MailLog = state.EmailLogin;
          const Key = 'Bearer ' + auth.getUserLogged().token;
          commit('IndicadorActualizacionHV',false);
          
          //TODO: consultar si la persona existe
          try { 
                await axios.get('http://104.248.56.215:1337/t-personas/mail/' + MailLog,{
                headers: {
                  Authorization: Key
                }
                }).then (response =>{  
   
          
                //if(response.data)
                //{
                  const IdPersona = response.data.id;
                  const IdPerfil = response.data.t_perfil_profesionals[0].id;

                  commit('EditarPersona',response.data.id);
                  commit('EditarPerfilProfesional',{IdPersona,IdPerfil});
                  commit('EditarFormacion',response.data);
                  commit('GuardarFormacion',response.data.id);
                  commit('EditarExperiencia',response.data);
                  commit('GuardarExperiencia',response.data.id);
                  commit('EditarCursos',response.data);
                  commit('GuardarCursos',response.data.id);
                  commit('IndicadorActualizacionHV',true);
                  /*
                  commit('EditarCursos',response.data.id); */
                  
    
                //}else{
                //  alert("Error al tratar de insertar el registro, Datos Personales");
                //} 
          })           
          } catch (error) 
          
          {
              console.log("La persona no existe y debe ser ingresada",error)
              //Comandos para insertar el usuario ya que no existe
              //Primero se insertan los datos personales para poder obtener el ide de insercion y poder setear la variable IdNuevo

              //Variable para insertar datos personales , llamado al API
              const profesional = {
                NombrePersona: state.Nombre,
                ApellidoPersona: state.Apellido,
                TipoId: state.TipoIdentificacion,
                NroId: state.NroId,
                FechaNacimiento: state.FechaNacimiento,
                Genero: state.Genero,
                DeptoResidencia: state.Depto,
                MuniResidencia: state.Mcpio,
                MovilPrincipal: state.Movil,
                MovilSecundario: state.Movil2,
                Email: state.Email,
                DireccionResidencia:state.Direccion
              }; 

              //Se guardan los datos personales llamado al API
              try 
              {
                      //const Key = 'Bearer ' + auth.getUserLogged().token; 
                      axios.post('http://104.248.56.215:1337/t-personas',profesional,{headers: {
                        Authorization: Key
                      }
                    }).then (response =>{ 
                      console.log("response.data despues de insertar persona",response.data)
                        if(response.data)
                            {    
                             //Al almacenar los datos personales, ya se cuenta con el idNuevo y se pueden llamar a las mutaciones que almacenan el resto de información
                              commit('GuardarPerfilProfesional',response.data.id);
                              commit('GuardarFormacion',response.data.id);
                              commit('GuardarExperiencia',response.data.id);
                              commit('GuardarCursos',response.data.id);  
                              commit('AsignarValorRegistroExitoso',true); 
                              
                            }else{
                              alert("Error al tratar de insertar el registro, Datos Personales");
                            }  
                        })
                        .catch (e => function(error){
                          console.log(error)    
                        })
              } catch (error) {
                console.log("Error al tratar de ingresar datos personales", error)
              }
            
          }//Fin catch


        },

        GuardarDatosEmpresa: async function({state,commit})
        {

          let MailLog = state.EmailLogin;
          commit('IndicadorActualizacionHVEmpresa',false);
          
          //TODO: consultar si la persona existe
          try 
          {
                const Key = 'Bearer ' + auth.getUserLogged().token;
                await axios.get('http://104.248.56.215:1337/empresas/mail/' + MailLog ,{
                headers: {
                  Authorization: Key
                }
                }).then (response =>{ 

                //Si la empresa existe en la base de datos, la edita con los nuevos valores
                if(response.data)
                {
                  const IdEmpresa = response.data.id;
                  commit('EditarInformacionEmpresa',{IdEmpresa});
                  commit('IndicadorActualizacionHVEmpresa',true); 
                }else{
                  alert("Error al tratar de editar la empresa, commit");
                } 
          })           
          } 
          catch (error)           
          {
              console.log("El usuario no existe",error)
              //como la empresa no existe se guardan los datos llamando al API
              try {        
                  //Al almacenar los datos personales, ya se cuenta con el idNuevo y se pueden llamar a las mutaciones que almacenan el resto de información
                  commit('GuardarInformacionEmpresa');
              } catch (error) {
                console.log("Error al tratar de ingresar datos de la empresa", error)
              }
            
          }//Fin catch


        },
        
        //Accion que realiza el llenado de datos personales del profesional inscrito
        GetDatosPersona: async function({commit,state},payload){         
          try {

    
                state.EmailLogin = payload.email;
                const Key = 'Bearer ' + auth.getUserLogged().token;
                let response = await axios.get('http://104.248.56.215:1337/t-personas/mail/' + payload.email,{
                  headers: {
                    Authorization: Key
                  } 
                });

                if(response.data)
                {
                  commit('AsignarIdPersonaInsertada',response.data.id)

                  /************** Llenar valores Datos Personales **************/
                  commit('AsignarValoresPersonales', { 
                    nikename: response.data.NombrePersona, 
                    apellido:response.data.ApellidoPersona, 
                    TipoId:response.data.TipoId, 
                    NroId: response.data.NroId ,
                    FechaNacimiento: response.data.FechaNacimiento,
                    Genero:response.data.Genero,
                    Depto:response.data.DeptoResidencia,
                    Mcpio:  response.data.MuniResidencia,
                    Movil:  response.data.MovilPrincipal,
                    Movil2: response.data.MovilSecundario,
                    Email:  response.data.Email,
                    Direccion:response.data.DireccionResidencia                     
                  });


                  /************** Llenar valores Perfil profesional **************/
                  commit('AsignarValoresPerfilProfesional',{
                    DatoCargoTitulo: response.data.t_perfil_profesionals[0].TituloPerfil,
                    DatoDescripcionPerfil: response.data.t_perfil_profesionals[0].DescripcionPerfil,
                    ValidoPerfil: true
                  });     

                  commit('ResetearListasFormacionExperiencia')
                  
                  
                  /************** Llenar valores Formaciones **************/
                  for (let item = 0; item < response.data.t_formacions.length; item++) {
                     commit('AsignarValoresAcademicos',{
                      Centro : response.data.t_formacions[item].CentroEducativo,
                      Nivel : response.data.t_formacions[item].Nivel,
                      PeriodoInicial : response.data.t_formacions[item].AnioInicial,
                      MesI : response.data.t_formacions[item].MesInicial,
                      PeriodoFinal : response.data.t_formacions[item].AnioFinal,
                      MesF : response.data.t_formacions[item].MesFinal,
                      EstadoEdu : response.data.t_formacions[item].EstadoFormacion  

                    }) 
                    }

                  /************** Llenar valores Experiencia Profesional **************/
                  for (let item = 0; item < response.data.t_experiencias.length; item++) {
                    commit('AsignarValoresExperienciaProfesional',{
                      DatoEmpresa : response.data.t_experiencias[item].NombreEmpresa,
                      DatoArea : response.data.t_experiencias[item].Area,
                      DatoAñoInicialExperiencia : response.data.t_experiencias[item].AnioInicial,
                      DatoMesInicialExperiencia : response.data.t_experiencias[item].MesInicial,
                      DatoAñoFinalExperiencia : response.data.t_experiencias[item].AnioFinal,
                      DatoMesFinalExperiencia : response.data.t_experiencias[item].MesFinal,
                      DatoDeptoExperiencia : response.data.t_experiencias[item].Departamento,
                      DatoMcpioExperiencia : response.data.t_experiencias[item].Municipio,
                      DatoCargo : response.data.t_experiencias[item].Cargo,
                      DatoFunciones : response.data.t_experiencias[item].FuncionesLogros
                   }) 
                   }

                  /************** Llenar valores cursos **************/
                  for (let item = 0; item < response.data.t_cursos.length; item++) {
                    commit('AsignarValoresCursos',{
                      CentroEducativo : response.data.t_cursos[item].CentroEducativo,
                      Tipo : response.data.t_cursos[item].TipoEducacion,
                      NombreCurso : response.data.t_cursos[item].NombreCurso,
                      Temporalidad : response.data.t_cursos[item].Temporalidad,
                      CantTiempo : response.data.t_cursos[item].CantidadTiempo,
                      Estado : response.data.t_cursos[item].Estado
                   }) 
                   }                   

                }
                else
                {                      
                    alert("Error al extraer informacion del API ");
                } 
            } 
          catch (error) 
                {
                    commit('AsignarValoresPersonales', { 
                    nikename: "", 
                    apellido:"", 
                    TipoId:"", 
                    NroId: "" ,
                    FechaNacimiento: "",
                    Genero:"",
                    Depto:"",
                    Mcpio:  "",
                    Movil:  "",
                    Movil2: "",
                    Email:  "",
                    Direccion:"" 
                    }) 
                    //
                    commit('AsignarValoresPerfilProfesional',{
                      DatoCargoTitulo: '',
                      DatoDescripcionPerfil: '',
                      ValidoPerfil: false
                    });

                    commit('ResetearListasFormacionExperiencia') 
                }  
        },
        
        //Accion que realiza el llenado de datos personales del profesional inscrito
        GetDatosEmpresa: async function({commit,state},payload){  
      
          try {  
                state.EmailLogin = payload.email;
                const Key = 'Bearer ' + auth.getUserLogged().token;

                var response = await axios.get('http://104.248.56.215:1337/empresas/mail/' + payload.email,{
                  headers: {
                    Authorization: Key
                  }                   
                });

                if(response.data)
                {
 
                  /************** Llenar valores Datos Empresa **************/
                  commit('AsignarValoresPersonalesEmpresa', { 
                    NombreEmpresa : response.data.NombreEmpresa,
                    Nit           : response.data.Nit,
                    Sector        : response.data.Sector,
                    NoTrabajadores: response.data.NoTrabajadores,
                    Departamento  : response.data.Departamento,
                    Municipio     : response.data.Municipio,
                    Telefono1     : response.data.TelefonoPrincipal,
                    Telefono2     : response.data.TelefonoSecundario,
                    Email         : payload.email,
                    Direccion     : response.data.Direccion
                  });

                  /************** Llenar valores Tipo de Empresa **************/
                  commit('AsignarValoresTipoEmpresa',{
                    DatoPaginaWeb: response.data.PaginaWeb,
                    DatoDescripcionEmpresa: response.data.DescripcionEmpresa,
                    ValidoTipoEmpresa: true
                  });    
                  
                  
                  /************** Llenar valores Tipo de Empresa **************/
                  commit('AsignarPersonaContacto',{
                    NombresContacto: response.data.NombreContacto,
                    ApellidosContacto: response.data.ApellidosContacto,
                    Cargo: response.data.Cargo,
                    EmailContacto: response.data.EmailContacto,
                    Tel1Contacto: response.data.TelefonoContacto,
                    Tel2Contacto: response.data.TelefonoContacto2,
                    ValidoPersonaContacto: true
                  });    
                }
                else
                {                      
                    console.log("Error al extraer informacion del API ");
                } 
            } 
          catch (error) 
                {                  
                  console.log("Error, no trajo informacion del api para la empresa ");
                    commit('AsignarValoresPersonalesEmpresa', { 
                      NombreEmpresa : "",
                      Nit           : "",
                      Sector        : "",
                      NoTrabajadores: "",
                      Departamento  : "",
                      Municipio     : "",
                      Telefono1     : "",
                      Telefono2     : "",
                      Email         : "",
                      Direccion     : ""
                    }) 
                    //
                    commit('AsignarValoresTipoEmpresa',{
                      DatoPaginaWeb: "",
                      DatoDescripcionEmpresa: "",
                      ValidoTipoEmpresa: false
                    });
                    //
                    commit('AsignarPersonaContacto', { 
                      NombresContacto: "",
                      ApellidosContacto: "",
                      Cargo: "",
                      EmailContacto: "",
                      Tel1Contacto: "",
                      Tel2Contacto: "",
                      ValidoPersonaContacto: true
                    })   
                }  
        },

        //Filtra los datos de las ofertas laborales
        GetDatosOfertaFiltro: async function({commit,state}){  
      
          try {  
                const Key = 'Bearer ' + auth.getUserLogged().token;
                var response = await axios.get('http://104.248.56.215:1337/ofertas/',{
                  headers: {
                    Authorization: Key
                  }                   
                });
                if(response.data)
                {
                  commit('ResetearListaOfertasFiltro')

                  /************** Llenar valores Datos Empresa **************/
                  for (let item = 0; item < response.data.length; item++) {
                    commit('AsignarDatosFiltroOfertas',{
                      id:response.data[item].id,
                      NombreOferta:response.data[item].NombreOferta,
                      DescripcionOferta:response.data[item].DescripcionOferta,
                      TipoContrato:response.data[item].TipoContrato,
                      Horario:response.data[item].Horario,
                      Salario:response.data[item].Salario,
                      Perfil:response.data[item].Perfil,
                      Departamento:response.data[item].Departamento,
                      Municipio:response.data[item].Municipio,
                      IdEmpresa:response.data[item].empresa.id
                   }) 
                   }  
                }
                else
                {                      
                    console.log("Error al extraer informacion del API ");
                } 
            } 
          catch (error) 
                {                  
                  console.log("Error, no trajo informacion del api para listar ofertas ",error);

                  commit('AsignarDatosFiltroOfertas', { 
                    NombreOferta:"",
                    DescripcionOferta:"",
                    TipoContrato:"",
                    Horario:"",
                    Salario:"",
                    Perfil:"",
                    Departamento:"",
                    Municipio:"",
                    IdEmpresa:""
                });
                }  
        },
        
        //Filtra los datos de las ofertas laborales
        GetDatosAplicaciones: async function({commit,state}){  
      
          try {  
                const Key = 'Bearer ' + auth.getUserLogged().token;
                var response = await axios.get('http://104.248.56.215:1337/Postulaciones/',{
                  headers: {
                    Authorization: Key
                  }                   
                });

               if(response.data)
                {
                  commit('ResetearListaOfertasFiltro')
                  /************** Llenar valores Datos Empresa **************/
                  for (let item = 0; item < response.data.length; item++) 
                  {

                    //console.log("Entro:",response.data,response.data[item].t_persona.Email , auth.getUserLogged().email)
                        if(response.data.length > 0 && response.data[item].t_persona.Email == auth.getUserLogged().email)
                        {  
                            commit('AsignarDatosAplicacionOfertas',{
                              id:               response.data[item].oferta.id,
                              NombreOferta:     response.data[item].oferta.NombreOferta,
                              DescripcionOferta:response.data[item].oferta.DescripcionOferta,
                              TipoContrato:     response.data[item].oferta.TipoContrato,
                              Horario:          response.data[item].oferta.Horario,
                              Salario:          response.data[item].oferta.Salario,
                              Perfil:           response.data[item].oferta.Perfil,
                              Departamento:     response.data[item].oferta.Departamento,
                              Municipio:        response.data[item].oferta.Municipio,
                              IdPersona:        response.data[item].IdPersona
                          }) 
                        }
                   }  
                }
                else
                {                      
                    console.log("Error al extraer informacion del API ");
                } 
            } 
          catch (error) 
                {                  
                  console.log("Error, no trajo informacion del api para listar GetDatosAplicacionesOferta ",error);

                  commit('AsignarDatosAplicacionOfertas', { 
                    NombreOferta:"",
                    DescripcionOferta:"",
                    TipoContrato:"",
                    Horario:"",
                    Salario:"",
                    Perfil:"",
                    Departamento:"",
                    Municipio:"",
                    IdPersona:""
                });
                }  
        }         





  },
  
  modules: {
  }
})
