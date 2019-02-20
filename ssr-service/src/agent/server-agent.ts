import axios, {
  AxiosInstance
} from 'axios';

const serverAgent: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export default serverAgent;
