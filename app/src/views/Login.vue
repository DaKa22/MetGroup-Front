<script setup>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import loginHttp from "../services/login";

const router = useRouter();
const authStore = useAuthStore();

const user = reactive({ email: null, password: null });
const emit = defineEmits(["logout"]);

const login = () => {
  loginHttp.login({ body: user }).then((res) => {
    localStorage.setItem("token", res.token);
    authStore.update(res.token);
    router.push({ name: "home" });
  });
};
</script>

<template>
  <main class="contenedor">
    <img src="/logo.png" alt="" class="logo"/>
    <div class="table">
      <div class="filters">
        <div>
          <label for="">Email:</label>
          <input type="text" v-model="user.email" />
          <br />
          <br />
          <label for="">Password:</label>
          <input type="password" v-model="user.password" />
          <br />
          <br />
          <button @click="login">Enviar</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.logo {
  padding-left: 35%;
}
.table {
  width: 18rem;
  /* margin-top: 8rem; */
  margin-left: auto;
  margin-right: auto;
}
.filters {
  display: flex;
  justify-content: flex-end;
  background-color: #e5e5e7;
  padding: 2rem 3rem;
  border-radius: 0.5rem;
}
</style>