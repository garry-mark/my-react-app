import UserServeice from '../service/userServeice';

import Controller from './Controller';
import Services from '../decorator/Services';

@Services({ UserServeice })
export default class UserController extends Controller {

  public getBloggerInfo = async () => {
    this.ctx!.body = await this.services.UserServeice.getBloggerInfo();;
  }
  public register = async () => { }
  public login = async () => { }
}
