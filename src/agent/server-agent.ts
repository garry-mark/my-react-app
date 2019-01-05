import axios, {
  AxiosInstance
} from 'axios';

const serverAgent: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4001/api'
});

export default serverAgent;
