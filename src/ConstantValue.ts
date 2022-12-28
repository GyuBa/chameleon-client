import axios from "axios";
const instance = axios.create({
    baseURL: 'http://abstr.net:30000',
    timeout: 1000
});
export default instance;