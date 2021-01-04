
import axios from 'axios';
const instance = axios.create({
    baseURL:"http://www.mocky.io/v2/"
});

export default instance;