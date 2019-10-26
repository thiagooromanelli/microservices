module.exports = {
  data: {
    token: '',
    expires: Date.now()
  },
  isValid() {
    return this.data.expires > Date.now()
  },
  getToken() {
    return this.data.token
  },
  setData(token, expires) {
    this.data = {
      token,
      expires: Date.now() + (expires * 1000)
    }
  }
}
