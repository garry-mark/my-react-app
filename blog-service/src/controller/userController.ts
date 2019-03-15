import UserService from '../service/userService';

import Controller from './Controller';
import Services from '../decorator/Services';
// import Validate from '../decorator/Validate';

@Services({ UserService })
export default class UserController extends Controller {

  public async getBloggerInfo() {
    this.ctx!.body = await this.services.UserService.getBloggerInfo();;
  }
  public register = async () => { }
  public login = async () => { }
}
