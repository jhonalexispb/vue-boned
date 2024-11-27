import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const token = localStorage.getItem('access_token')
if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export default api
