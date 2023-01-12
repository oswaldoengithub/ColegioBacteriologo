import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/hojadevida',
    name: 'hojadevida',
    component: () => import(/* webpackChunkName: "about" */ '../views/HojaVida.vue')
  },
  {
    path: '/hojadevidareclutador',
    name: 'hojadevidareclutador',
    component: () => import(/* webpackChunkName: "about" */ '../views/HojaVidaReclutador.vue')
  },
  {
    path: '/curriculo',
    name: 'curriculo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Curriculum.vue')
  },
  {
    path: '/reclutadores',
    name: 'reclutadores',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reclutadores.vue')
  },
  {
    path: '/areapersona',
    name: 'areapersona',
    component: () => import(/* webpackChunkName: "about" */ '../views/AreaPersona.vue')
  },
  {
    path: '/reclutadores',
    name: 'reclutadores',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reclutadores.vue')
  },
  {
    path: '/registroempresa',
    name: 'registroempresa',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistroEmpresa.vue')
  },
  {
    path: '/ofertaslaborales',
    name: 'ofertaslaborales',
    component: () => import(/* webpackChunkName: "about" */ '../views/OfertasLaborales.vue')
  },
  {
    path: '/filtroOfertas',
    name: 'filtroOfertas',
    component: () => import(/* webpackChunkName: "about" */ '../views/OfertasFiltro.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  } 

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
