import axios from "axios";
//URL Da API: https://api.themoviedb.org/3/
//requisições com o axios, npm install axios


const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/"
});

export default api;