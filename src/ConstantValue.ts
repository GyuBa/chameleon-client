import axios from "axios";
const instance = axios.create({
    baseURL: 'https://dev-platform.chameleon.best/',
    timeout: 10000
});
export default instance;