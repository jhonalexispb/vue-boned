<template>
  <form @submit.prevent="authStore.login(form)">
    <div>
      <label for="user">Usuario</label>
      <br />
      <input v-model="form.user" type="text" id="user" name="user" />
    </div>
    <div>
      <label for="pass">Contraseña</label>
      <br />
      <input v-model="form.password" type="password" id="pass" name="pass" />
    </div>
    <button>Login</button>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const form = ref({
  user: '',
  password: '',
})
</script>
