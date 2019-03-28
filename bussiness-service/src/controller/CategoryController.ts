import Controller from '../core/model/Controller';
import Services from '../core/decorator/Services';
import Router from '../core/decorator/Router';
import Route from '../core/decorator/Route';
import Result from '../core/model/Result';

import CategoryService from '../service/CategoryService';

/** 依赖注入相关服务
 * 这里使用面向对象的多态实现，可用根据不同的数据源注入相关实现的Service
 * @Services({ CategoryService: CategoryDBService })
 * 下面为缩写，当然这里主要是考虑整个项目的数据源都是DB，所以只选择实现CategoryService，而没有进一步抽象
 * 在多数据源的项目下可用抽象出CategoryService接口，实现不同的Service
*/
@Services({ CategoryService })
// 面向切面，设置当前控制器对应的路由前缀
@Router({
    prefix: '/category',
})
// Controller中包含相关业务基于RESTful的封装处理
class CategoryController extends Controller {
    /** 设置控制器中某action对应的路由，并提供一下配置选项
     * beforeMiddleware：应用AOP在该action前面添加相关的拦截，如权限控制、参数过滤等中间件（过滤器）
     * path：对应的相关路径
     * methods：对应的HTTPmethods
     * queryRules：参数校验规则
     * bodyRules：参数校验规则
     * paramsRules：参数校验规则
     * bodyParserOptions：请求体规则，JSON、XML、multiple/formdata等的设置以及相关处理
    */
    @Route({
        path: '/',
        methods: 'get',
    })
    // 本质是Koa中间件，使用async \ await把异步操作同步化处理
    public async getCategoryList() {
        // 调用相关Service业务方法
        const data = await this.services.CategoryService.getCategoryList();
        // 返回基于Result统一规格的响应结果
        this.ctx!.body = new Result({
            data,
        });
    }

    @Route({
        path: '/',
        methods: 'post',
        bodyRules: {
            categoryVO: {
                type: 'object',
                rule: {
                    name: {
                        type: 'string',
                    },
                }
            }
        }
    })
    public async createCategory() {
        const { categoryVO } = this.ctx!.request!.body;
        const insertId = await this.services.CategoryService.createCategory(categoryVO);
        this.ctx!.body = {
            code: insertId ? 1 : 0,
            insertId: insertId || undefined
        }
    }

    @Route({
        path: '/',
        methods: 'put',
        bodyRules: {
            categoryVO: {
                type: 'object',
                rule: {
                    id: {
                        type: 'int',
                        min: 1,
                    },
                    name: {
                        type: 'string',
                    }
                }
            }
        }
    })
    public async updateCategory() {
        const { categoryVO } = this.ctx!.request!.body;
        const changedRows = await this.services.CategoryService.updateCategory(categoryVO);
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
    public async deleteCategory() {
        const { id } = this.ctx!.params;
        const affectedRows = await this.services.CategoryService.deleteCategory(id);
        this.ctx!.body = {
            code: affectedRows > 0 ? 1 : 0,
        }
    }

}

export default CategoryController