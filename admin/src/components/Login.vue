<template>
  <div class="index">
    <input type="text" v-model="login" name="login" placeholder="Login"><br>
    <input type="password" v-model="password" name="password" placeholder="Password"><br>
    <button type="button" name="button" @click="tryLogin">LOGIN</button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      login: 'superadmin',
      password: '999'
    }
  },
  methods: {
    tryLogin () {
      this.axios.post('/api/admin/login', {
        username: this.login,
        password: this.password
      })
      .then(({ data }) => {
        this.$root.setUserId(data.user.id)
        this.$router.push('/')
      })
      .catch(console.error)
    }
  }
}
</script>

<style>
</style>
