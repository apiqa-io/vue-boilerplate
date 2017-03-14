export default {
  debug: true,
  state: {
    userId: ''
  },
  setUserId (id) {
    this.state.userId = id
  },
  clearUserId () {
    this.state.userId = ''
  }
}
