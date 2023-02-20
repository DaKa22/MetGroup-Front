<script setup>
import { ref } from '@vue/reactivity';
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
const token = ref();
const logout = (e) => {
  token.value = e
}
</script>

<template>
  <div>
    <Header :token ="token"/>
    <main class="contenedor">
      <RouterView @logout ="logout"/>
    </main>
  </div>
</template>

<style scoped>
.contenedor {
  width: 90%;
  margin: auto;
}
</style>
