import browserAgent from './browser-agent';
import serverAgent from './server-agent';

export function getAgent() {
  try {
    if (window) {
      return browserAgent;
    } else {
      return serverAgent;
    }
  } catch (e) {
    return serverAgent;
  }
}
