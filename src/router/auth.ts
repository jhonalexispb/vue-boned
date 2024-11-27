const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'), // Ruta para el login
  },
  /* {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'), // Ruta para el registro
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/ForgotPasswordView.vue'), // Ruta para la recuperación de contraseña
  }, */
]

export default authRoutes
