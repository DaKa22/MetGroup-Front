import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: localStorage.getItem('token') || null }),
  actions: {
    update(token) {
      this.token = token
    }
  }
})