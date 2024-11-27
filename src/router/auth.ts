import BlankLayout from '@/layouts/BlankLayout.vue'
import LoginView from '@/views/LoginView.vue'

const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: BlankLayout, // Ruta para el login
    children: [
      {
        path: '',
        name: 'loginView',
        component: LoginView,
      },
    ],
  },
]

export default authRoutes
