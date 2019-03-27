import Controller from '../core/model/Controller';
import Services from '../core/decorator/Services';
import Router from '../core/decorator/Router';
import Route from '../core/decorator/Route';
import Result from '../core/model/Result';

import CategoryService from '../service/CategoryService';


@Services({ CategoryService })
@Router({
    prefix: '/category',
})
class CategoryController extends Controller {

    @Route({
        path: '/',
        methods: 'get',
    })
    public async getCategoryList() {
        const data = await this.services.CategoryService.getCategoryList();
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