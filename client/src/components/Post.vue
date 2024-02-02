<template>
  <div class="users">
    <button @click="fetchData">Click Me For Users</button>
    <p v-if="users">{{ users }}</p>
    <p v-if="res">{{ res }}</p>
  </div>
</template>
<script>
export default {
  name: 'HeyWorld',
  props: {
    msg: String
  },
  data() {
    return {
      users: '',
      res: ''
    }
  },
  methods: {
    fetchData() {
      console.log('fetchData')
      fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.res = response.json()
          response.json().then((data) => {
            this.users = JSON.stringfy(data)
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>
<style scoped>
button {
  padding: 12px 32px;
  font-size: 16px;
  border-radius: 8px;
}
</style>