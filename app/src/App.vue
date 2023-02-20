<script setup>
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { RouterLink, RouterView, useRoute } from 'vue-router';

import Login from './views/Login.vue';
import Layout from './views/Layout.vue';

const route = useRoute()
</script>

<template>
  <div>
    <main class='contenedor'>
      <Login v-if="route.meta.login"/>
      <Layout v-else/>
    </main>
  </div>
</template>

<style scoped>
.contenedor {
  width: 90%;
  margin: auto;
}
</style>
