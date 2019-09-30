import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})