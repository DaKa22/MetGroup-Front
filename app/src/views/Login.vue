<script setup>
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth';
import loginHttp from '../services/login';


const router = useRouter()
const authStore = useAuthStore()

const user = reactive({ email: null, password: null })
const emit = defineEmits(['logout'])

const login = () => {
  loginHttp.login({ body: user }).then((res) => {
    localStorage.setItem('token',res.token)
    authStore.update(res.token)
    router.push({ name: 'home' })
  });
};
</script>

<template>
  <main class='contenedor'>
    <div>
      <label for=''>Email:</label>
      <input type='text' v-model='user.email' />
    </div>
    <div>
      <label for=''>Password:</label>
      <input type='password' v-model='user.password' />
    </div>
    <button @click='login'>Enviar</button>
  </main>
</template>

<style scoped>

</style>