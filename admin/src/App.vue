<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <button type="button" name="button" @click="logout">LogOut</button>
    </div>
    <div v-else class="wrapper">
      <div class="login">
        <input
        v-model="username"
        label="Username"
        name="username">
        </input>
        <input
        v-model="password"
        label="Password"
        name="password"
        type="password"
        ></input>
        <button @click="login">LOGIN</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      isLoggedIn () {
        return !!this.$root.state.userId
      }
    },
    methods: {
      login () {
        this.axios.post('/api/admin/login', {
          username: this.login,
          password: this.password
        })
        .then(({ data }) => {
          this.login = ''
          this.password = ''
          this.$root.setUserId(data.user.id)
          this.$router.push('/')
        })
        .catch(console.error)
      },
      logout () {
        this.axios.get('/api/admin/logout')
        .then(() => {
          window.location.href = '/'
        })
        .catch(console.error)
      }
    }
  }
</script>

<style scoped>
 .wrapper {
   display: flex;
   flex-direction: column;
   justify-content: center;
 }

 .login .input-group {
   margin: 0;
 }
</style>
