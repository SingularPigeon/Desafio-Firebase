import { createRouter, createWebHistory } from 'vue-router'
import FormUsers from '@/components/usuarios/FormUsers.vue'

import HomeView from '../views/Homeview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'AddUser',
      component: FormUsers
    },
    {
      path: '/edit/:id',
      name: 'EditUser',
      component: FormUsers,
      props: true // Pass route params as props
    }
  ]
})

export default router
