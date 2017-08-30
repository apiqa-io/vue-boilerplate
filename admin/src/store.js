import jwtDecode from 'jwt-decode'

export default {
  debug: true,
  state: {
    user: null
  },
  setUser (token) {
    const payload = jwtDecode(token)
    if (payload) {
      this.state.user = payload.user
      localStorage.setItem('jwtToken', token)
    }
  },
  clearUser () {
    this.state.user = null
    localStorage.clear()
  }
}
