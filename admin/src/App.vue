<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <button type="button" name="button" @click="logout">LogOut</button>
    </div>
    <div v-else class="wrapper">
      <div class="login">
        <input
          v-model="email"
          label="Username"
          name="email">
        </input>
        <input
          v-model="password"
          label="Password"
          name="password"
          type="password">
        </input>
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
        email: '',
        password: ''
      }
    },
    computed: {
      isLoggedIn () {
        return !!(this.$root.state.user && this.$root.state.user.id)
      }
    },
    methods: {
      login () {
        this.axios.post('/api/admin/account', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`
          this.email = ''
          this.password = ''
          this.$root.setUser(data.token)
        })
        .catch(console.error)
      },
      logout () {
        this.$root.clearUser()
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    outline: none;
  }

  html, body, #app {
    height: 100%;
  }

  body {
    margin: 0;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  input[type=button],
  input[type=file],
  input[type=reset],
  input[type=submit],
  .btn,
  .button {
    border: 0;
    cursor: pointer;
    padding: 0;
  }

  textarea {
    resize: vertical;
  }

  [disabled] {
    pointer-events: none;
  }

  [hidden] {
    display: none;
  }

  .clearfix:after {
    clear: both;
    content: "";
    display: table;
  }

 .wrapper {
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
 }

 .login {
   max-width: 50%;
 }

 .login input {
   display: block;
   width: 100%;
 }
</style>
