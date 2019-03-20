import UserService from '../service/userService';

import Controller from './Controller';
import Services from '../decorator/Services';
import Router from '../decorator/Router';
import Route from '../decorator/Route';

@Services({ UserService })
@Router({
  prefix: '/user',
})
export default class UserController extends Controller {

  @Route({
    path: '/blogger',
  })
  public async getBloggerInfo() {
    this.ctx!.body = await this.services.UserService.getBloggerInfo();
  }

  @Route({
    beforeMiddleware: [],
    path: '/register',
    methods: 'post',
    queryRules: {
      username: {
        type: 'string',
      }
    },
  })
  public async register() { }

  @Route({
    beforeMiddleware: [],
    path: '/login',
    methods: 'post',
    queryRules: {
      username: {
        type: 'string',
      }
    },
  })
  public async login() { }
}
