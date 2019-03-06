// import UserServeice from '../service/userServeice';

import Controller from './Controller';

// const uServ = new UserServeice();

export default class UserController extends Controller {

  public getBloggerInfo = async () => {
    this.ctx!.body = 'abc';
  }
  public register = async () => { }
  public login = async () => { }
}
