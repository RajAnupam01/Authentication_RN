import axios from 'axios'

const API = axios.create({
    baseURL: "http://10.194.99.197:3000/api/"
})
export const setAuthToken = (token: string | null) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};

export default API