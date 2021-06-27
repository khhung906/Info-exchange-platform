import axios from 'axios'

const API_ROOT = "https://info-xchange-server.herokuapp.com/"

const instance = axios.create({
  baseURL: API_ROOT,
})

export default instance;