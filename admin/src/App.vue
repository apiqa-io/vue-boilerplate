<template>
  <div id="app">
    <v-app v-if="isLoggedIn" id="admin-panel" top-toolbar footer>
      <v-toolbar>
        <v-toolbar-side-icon />
        <v-toolbar-title>Toolbar</v-toolbar-title>
        <v-toolbar-items>
          <v-toolbar-item ripple><button type="button" name="button" @click="logout">LogOut</button></v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
      <main>
        <v-content>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-content>
      </main>
      <v-footer>Footer</v-footer>
    </v-app>
    <v-app v-else class="login">
      <v-container class="v-center" fluid>
        <v-text-field v-model="login" name="login" label="Login"></v-text-field>
        <v-text-field
          name="login"
          label="Password"
          v-model="password"
          type="password"
        ></v-text-field>
        <v-btn block secondary dark @click.native="tryLogin">LOGIN</v-btn>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  import 'assets/material_icons.css'
  import 'vuetify/dist/vuetify.min.css'
  export default {
    name: 'app',
    data () {
      return {
        login: '',
        password: '',
        showPassword: false
      }
    },
    computed: {
      isLoggedIn () {
        return !!this.$root.state.userId
      }
    },
    methods: {
      togglePassword () {
        this.showPassword = !this.showPassword
      },
      logout () {
        this.axios.get('/api/admin/logout')
        .then(() => {
          window.location.href = '/'
        })
        .catch(console.error)
      },
      tryLogin () {
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
      }
    }
  }
</script>

<style scoped>
 .login {
   display: flex;
   flex-direction: column;
   justify-content: center;
 }

 .login .input-group {
   margin: 0;
 }
</style>
