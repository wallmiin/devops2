import axios from "axios";

const API = axios.create({
    baseURL: "http://44.220.244.128:8000",
});

export default API;
