import axios, {
  AxiosInstance,
  AxiosRequestConfig
} from 'axios';

export default (iniConfig?: AxiosRequestConfig): AxiosInstance => {
  return axios.create(iniConfig);
};
