export default class Store {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  resetToken() {
    this.token = null;
  }
}