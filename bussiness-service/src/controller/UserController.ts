import Controller from '../core/model/Controller';
import Services from '../core/decorator/Services';
import Router from '../core/decorator/Router';
import Route from '../core/decorator/Route';
import Result from '../core/model/Result';

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
    const data = await this.services.UserService.getBloggerInfo();
    this.ctx!.body = new Result({
      data,
    });
  }

  @Route({
    path: '/',
    methods: 'put',
    bodyRules: {
      userVO: {
        type: 'object',
        rule: {
          id: {
            type: 'int',
            min: 1,
          },
          username: {
            type: 'string',
            max: 16
          },
          password: {
            type: 'password',
            compare: 'password2',
            required: false,
            min: 6,
            max: 32
          },
          password2: {
            type: 'password',
            required: false,
          },
          email: {
            type: 'email',
            required: false,
          },
          telNum: {
            type: 'string',
            format: /^\d{11}$/,
            min: 11,
            max: 11,
            required: false,
          },
          avatar: {
            type: 'url',
            required: false,
          }
        }
      }
    }
  })
  public async updateUser() {
    const { userVO } = this.ctx!.request!.body;
    const changedRows = await this.services.UserService.updateUser(userVO);
    this.ctx!.body = {
      code: changedRows > 0 ? 1 : 0,
    }
  }

  @Route({
    path: '/:id',
    methods: 'delete',
    paramsRules: {
      id: {
        type: 'int',
        min: 1,
        convertType: 'int',
      }
    }
  })
  public async deleteUser() {
    const { id } = this.ctx!.params;
    const affectedRows = await this.services.UserService.deleteUser(id);
    this.ctx!.body = {
      code: affectedRows > 0 ? 1 : 0,
    }
  }

  @Route({
    beforeMiddleware: [],
    path: '/register',
    methods: 'post',
    bodyRules: {
      userVO: {
        type: 'object',
        rule: {
          username: {
            type: 'string',
            max: 16
          },
          password: {
            type: 'password',
            compare: 'password2',
            min: 6,
            max: 32
          },
          password2: {
            type: 'password',
          },
          email: {
            type: 'email',
            required: false,
          },
          telNum: {
            type: 'string',
            format: /^\d{11}$/,
            min: 11,
            max: 11,
            required: false,
          },
          avatar: {
            type: 'url',
            required: false,
          }
        }
      }
    }
  })
  public async register() {
    const { userVO } = this.ctx!.request!.body;
    const result = await this.services.UserService.register(userVO);

    if (result === -1) {
      this.ctx!.body = {
        code: 0,
        message: '用户名已经存在'
      }
    } else {
      this.ctx!.body = {
        code: result ? 1 : 0,
        insertId: result || undefined
      }
    }
  }

  @Route({
    beforeMiddleware: [],
    path: '/login',
    methods: 'post',
    bodyRules: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      }
    },
  })
  public async login() {
    const { username, password } = this.ctx!.request!.body;
    const result = await this.services.UserService.login(username, password);
    if (result === -1) {
      this.ctx!.body = {
        code: 0,
        message: '用户不存在'
      }
    } else if (result === -2) {
      this.ctx!.body = {
        code: 0,
        message: '用户名或密码错误'
      }
    } else {
      this.ctx!.body = {
        code: result ? 1 : 0,
        data: result || undefined
      }
    }
  }
}
