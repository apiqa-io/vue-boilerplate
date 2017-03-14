<template>
  <div class="index">
    <h1>Admin panel</h1>
    <button type="button" name="button" @click="logout">LogOut</button>
  </div>
</template>

<script>
export default {
  methods: {
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

<style>
</style>
