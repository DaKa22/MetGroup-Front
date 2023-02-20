<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth'

const router = useRouter();
const authStore = useAuthStore()

const out = () => {
  localStorage.removeItem('token')
  authStore.update(null)
  router.push({ name: 'login' })
};

</script>

<template>
  <div>
    <nav class='nav'>
      <RouterLink to='/'>
        <img src='/logo.png' alt='' />
      </RouterLink>

      <div class='navegacion'>
        <RouterLink to='/login' v-if='!authStore.token'>Login</RouterLink>
        <a @click='out' v-else class='logout'>Logout</a>
        <RouterLink to='/store'>Store</RouterLink>
        <RouterLink to='/article'>Article</RouterLink>
      </div>
    </nav>
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
