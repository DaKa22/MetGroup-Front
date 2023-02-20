<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const tokenProps = defineProps(['token']);
const token = ref(tokenProps);
console.log(token);
const out = () => {
  localStorage.removeItem('token')

  token.value=null
  router.push({
      name:'home'
    })
};
</script>

<template>
  <div>
    <nav class="nav">
      <RouterLink to="/">
        <img src="/logo.png" alt="" />
      </RouterLink>

      <div class="navegacion">
        <RouterLink to="/login" v-if="token == null">Login</RouterLink>
        <a @click="out" v-else class="logout">Logout</a>
        <RouterLink to="/store">Store</RouterLink>
        <RouterLink to="/article">Article</RouterLink>
      </div>
    </nav>
    {{token}}
  </div>
</template>

<style scoped>
.logout {
  cursor: pointer;
}
.nav {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.nav img {
  width: 12rem;
}

.navegacion {
  display: flex;
  align-items: center;
}
.navegacion a {
  margin-left: 1rem;
  text-decoration: none;
}
</style>
