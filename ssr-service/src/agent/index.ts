import browserAgent from './browser-agent';
import serverAgent from './server-agent';

const isProd = process.env.NODE_ENV === 'production';
const baseURL = isProd ? 'http://bussiness-service:5000/api' : 'http://localhost:5000/api';

export function getAgent() {
  try {
    if (window) {
      return browserAgent({
        // only this way to request,bc it run in browser
        baseURL: 'http://localhost:5000/api',
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
