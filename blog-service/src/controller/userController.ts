import Controller from '../core/model/Controller';
import Services from '../core/decorator/Services';
import Router from '../core/decorator/Router';
import Route from '../core/decorator/Route';

import UserService from '../service/UserService';

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
