import { defineStore } from 'pinia'
import axios from 'axios'
import api from '@/api/api'
import { decodeToken } from '@/helpers/jwt/decode'

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
    async login(form: { user: string; password: string }) {
      try {
        const response = await api.post('/api/token/', {
          username: form.user,
          password: form.password,
        })
        if (response.data.access) {
          const tokenDecode = decodeToken(response.data.access)
          // Guardar el token y el usuario en localStorage
          localStorage.setItem('access_token', response.data.access)
          localStorage.setItem('refresh_token', response.data.refresh)
          localStorage.setItem('usuario', tokenDecode.user_id)
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
