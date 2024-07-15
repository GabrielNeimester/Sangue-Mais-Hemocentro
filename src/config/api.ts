import axios from "axios"

const api = axios.create({
  //baseURL: "http://localhost:3000" //url da api test
  baseURL: "https://backendsanguemais.onrender.com" // url da api on render
})

export default api