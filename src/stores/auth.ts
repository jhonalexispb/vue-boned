import { defineStore } from 'pinia'
import axios from 'axios'

// Define el tipo para el estado
interface User {
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: null as string | null, // El token JWT (puede ser null)
      user: null as User | null, // Información del usuario (puede ser null)
    }
  },
  getters: {
    // Getter para saber si el usuario está autenticado
    isAuthenticated(state): boolean {
      return state.token !== null // Si hay un token, el usuario está autenticado
    },
    // Getter para obtener el nombre del usuario (si está autenticado)
    userName(state): string | null {
      return state.user?.name ?? null
    },
  },
  actions: {
    // Acción para hacer login
    async login(username: string, password: string) {
      try {
        const response = await axios.post('https://tu-backend.com/api/login', {
          username,
          password,
        })

        if (response.data.token) {
          // Almacenar el token y la información del usuario
          this.token = response.data.token
          this.user = response.data.user

          // Guardar el token y el usuario en localStorage
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(this.user))

          // Configurar el token para futuras peticiones con Axios
          axios.defaults.headers['Authorization'] = `Bearer ${this.token}`
        }
      } catch (error) {
        console.error('Error al hacer login:', error)
      }
    },

    // Acción para hacer logout
    logout() {
      this.token = null
      this.user = null

      // Limpiar el localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Eliminar el token de las cabeceras de Axios
      delete axios.defaults.headers['Authorization']
    },

    // Cargar el token y los datos del usuario desde localStorage al iniciar
    loadToken() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token) {
        this.token = token
        this.user = user ? JSON.parse(user) : null
        axios.defaults.headers['Authorization'] = `Bearer ${this.token}`
      }
    },
  },
})
