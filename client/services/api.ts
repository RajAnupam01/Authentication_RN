import axios from 'axios'

const API = axios.create({
    baseURL:"http://10.103.147.197:3000/api/"
})
export default API