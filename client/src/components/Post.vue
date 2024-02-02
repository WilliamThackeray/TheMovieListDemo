<template>
  <div class="users">
    <button @click="fetchData">Click Me For Users</button>
    <p v-if="users">
      <ul>
        <li v-for="user of users">{{ user.name }} {{ user.address }} {{ user.email }}</li>
      </ul>
    </p>
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
          response.json().then((data) => {
            this.users = data
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