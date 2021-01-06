import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petfynder.org'
  // baseURL: 'http://localhost:5000'
});

export default api;