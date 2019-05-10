import browserAgent from './browser-agent';
import serverAgent from './server-agent';

const isProd = process.env.NODE_ENV === 'production';
const browserBaseURL = isProd ? 'http://120.78.130.154:5000/api' : 'http://localhost:5000/api';
const serverBaseURL = isProd ? 'http://bussiness-service:5000/api' : 'http://localhost:5000/api';

export function getAgent() {
  try {
    if (window) {
      return browserAgent({
        // only this way to request,bc it run in browser
        baseURL: browserBaseURL,
        timeout: 1000 * 10
      });
    } else {
      return serverAgent({
        baseURL: serverBaseURL
      });
    }
  } catch (e) {
    return serverAgent({
      baseURL: serverBaseURL
    });
  }
}
