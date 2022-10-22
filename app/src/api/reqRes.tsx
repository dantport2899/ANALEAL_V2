import axios from "axios";

export const reqqResapi = axios.create({
    baseURL: 'http://localhost/ANALEAL_V2/ANALEAL_V2/api/api.global.php'
});