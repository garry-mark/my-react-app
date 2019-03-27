import browserAgent from './browser-agent';
import serverAgent from './server-agent';

const isProd = process.env.NODE_ENV === 'production';
const baseURL = isProd ? 'bussiness-service/api' : 'http://localhost:5000/api';

export function getAgent() {
  try {
    if (window) {
      return browserAgent({
        baseURL,
        timeout: 1000 * 10
      });
    } else {
      return serverAgent({
        baseURL
      });
    }
  } catch (e) {
    return serverAgent({
      baseURL
    });
  }
}
