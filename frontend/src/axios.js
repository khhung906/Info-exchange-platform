import axios from 'axios'

const API_ROOT = "http://localhost:4000"

const instance = axios.create({
  baseURL: API_ROOT,
})

export default instance;