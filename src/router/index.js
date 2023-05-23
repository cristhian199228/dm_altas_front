import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView";
import FichasView from "@/views/FichasView";
/* import NuevaFicha from "@/components/NuevaFicha"; */
import store from "@/store";
import LoginUbigeoLocal from "@/views/LoginUbigeoLocal";
import LoginFechaNacimiento from "@/views/LoginFechaNacimiento";
import LoginInvitados from "@/views/LoginInvitados";
import ContainerView from "@/views/ContainerView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginView,
    children: [
      { path: '', component: LoginUbigeoLocal, name: 'login.peruanos' },
      { path: 'extranjeros', component: LoginFechaNacimiento, name: 'login.extranjeros' },
      { path: 'invitados', component: LoginInvitados, name: 'login.invitados' },
    ]
  },
  {
    path: '/fichas',
    component: ContainerView,
    children: [
      { path: '', component: FichasView, name: 'fichas.index' }
      /* { path: 'nuevo', component: NuevaFicha, name: 'fichas.crear' },
      { path: 'editar/:id_ficha', component: NuevaFicha, name: 'fichas.editar' } */
    ],
    meta: { requiresAuth: true }
  }
 /*  {
    path: '*',
    redirect: '/fichas'
  }, */
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
