import axios from "axios";
export const makeRequest = axios.create({
    baseURL: "http://localhost:8888/",
    withCredentials: true,
})
// baseURL: "https://travelago-api.onrender.com/",
