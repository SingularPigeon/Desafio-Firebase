import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FormUsers from '@/components/usuarios/FormUsers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      children: [
        {
          path: 'add',
          name: 'addUser',
          component: () => import('@/components/usuarios/FormUsers.vue')
        }
      ]
    },

    {
      path: '/edit/:id',
      name: 'EditUser',
      component: FormUsers,
      props: true
    }
  ]
})

export default router
