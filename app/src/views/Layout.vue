<script setup>
import Header from '../components/Header.vue';
</script>

<template>
  <div>
    <Header />
    <main class="contenedor">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.contenedor {
  width: 90%;
  margin: auto;
}
</style>
