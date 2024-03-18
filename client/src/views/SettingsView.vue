<script setup>
import NavC from '../components/NavC.vue'
</script>

<template>
  <NavC />
  <div class="settings">
    <h1>Settings</h1>
    <h2>Your Account</h2>
    <h2>Notifications</h2>
    <h2>Security</h2>
    <h2>Privacy and Safety</h2>
    <h2>Accessibility</h2>
    <h2>Other</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: this.$auth0.isAuthenticated,
      user: this.$auth0.user
    }
  },
  beforeMount() {
    // use this to check if a user is already logged in
    if (!this.auth) {
      // user is not authenticated && redirect
      this.$router.push('/')
    }
  },
  methods: {
    deleteAccount() {
      const username = document.querySelector('#deleteAccount').value
      fetch(`http://localhost:3000/api/user/${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    authCheck() {
      console.log('user: ', this.user)
    },
  }
}
</script>

<style>
.settings {
  padding-left: 1rem;
}
</style>
