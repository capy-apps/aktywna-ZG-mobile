import axios from 'axios';
import { URLS } from '../URLS';

const Axios = axios.create({
  baseURL: URLS.API,
  timeout: 1000
});

export default Axios;