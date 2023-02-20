<script setup>
import { reactive } from '@vue/reactivity'
import { useRouter, useRoute } from 'vue-router'
import loginHttp from "../services/login";
const router = useRouter()
const route = useRoute()
const user = reactive({
  email:null,
  password:null
})
const emit = defineEmits(['logout'])
const login = () => {
  loginHttp.login({ body: user }).then((res) => {
    // console.log(res)
    localStorage.setItem('token',res.token)
    emit('logout',res.token)
    router.push({
      name:'home'
    })
  });
  // const token = ref(localStorage.getItem("token"));
};
</script>

<template>
  <main class="contenedor">
    <div>
            <label for="">Email:</label>
            <input type="text" v-model="user.email" />
    </div>
    <div>
            <label for="">Password:</label>
            <input type="password" v-model="user.password" />
    </div>
    <button @click="login">Enviar</button>
  </main>
</template>

<style scoped>

</style>