import axios, {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,
  // CancelTokenStatic,
  // Canceler
} from 'axios';

const browserAgent: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 1000 * 10
});

browserAgent.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

browserAgent.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError) => {
    let errorMessage: string;
    if (axios.isCancel(error)) {
      console.warn('Request canceled', error.message);
      return Promise.resolve(error.message);
    }
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad Request';
          break;
        case 401:
          errorMessage = 'Unauthorized,please login';
          break;
        case 403:
          errorMessage = 'Forbidden';
          break;
        case 404:
          errorMessage = 'Not Found';
          break;
        case 405:
          errorMessage = 'Method Not Allowed';
          break;
        case 408:
          errorMessage = 'Request Timeout';
          break;
        case 500:
          errorMessage = 'Internal Server Error';
          break;
        case 501:
          errorMessage = 'Not Implemented';
          break;
        case 502:
          errorMessage = 'Bad Gateway';
          break;
        case 503:
          errorMessage = 'Service Unavailable';
          break;
        case 504:
          errorMessage = 'Gateway Timeout';
          break;
        case 505:
          errorMessage = 'HTTP Version Not Supported';
          break;
        default:
          errorMessage = `Connect error:${error.response.status}`;
      }
      error.response.statusText = errorMessage;

      // 错误扶正：即所有处理都在then里面处理，可以省去每次请求的catch
      // 所以，使用响应数据前需要判断status和status为200后，再使用数据
      // 取消错误扶正, 以符合原有模块包下所有请求处理, 避免模块包升迁改动较大
      console.error(`${errorMessage}(${error.response.status})`);
      return Promise.reject(error.response);
    } else if (error.request) {
      console.warn(
        'The request was made but no response was received.',
        error.request
      );
      return Promise.reject(error.request);
    } else {
      console.error('Failed to connect to server.');
      return Promise.reject(error);
    }
  }
);

// const CancelToken: CancelTokenStatic = axios.CancelToken;

// const cancelList: Canceler[] = [];

// export function excuteCancelList() {
//   cancelList.forEach((cancel: Canceler) => cancel('Operation cancel by page change.'))
// }

// export function createToken() {
//   return new CancelToken((c: Canceler): void => {
//     cancelList.push(c);
//   });
// }

export default browserAgent;
