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
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          this.username = ''
          this.password = ''
          this.$root.setUserId(data.user.id)
        })
        .catch(console.error)
      },
      logout () {
        this.axios.get('/api/admin/logout')
        .then(() => {
          this.$root.clearUserId()
        })
        .catch(console.error)
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
