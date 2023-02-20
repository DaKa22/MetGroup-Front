<script setup>
import { ref } from "@vue/reactivity";
import { RouterLink, RouterView, useRoute } from "vue-router";
const Login from "./views/Login.vue";
const Layout from "./views/Layout.vue";
import { computed } from "@vue/runtime-core";
const route = useRoute()

const page = computed(()=> {
  
  if (route.meta.login) {
    return 'Login'
  }
  return 'Layout'
})
console.log(page)
</script>

<template>
  <div>
    <!-- <Header :token ="token"/> -->
    <main class="contenedor">
      <component :is="page"><RouterView  /></component>
    </main>
  </div>
</template>

<style scoped>
.contenedor {
  width: 90%;
  margin: auto;
}
</style>
