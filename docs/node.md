## 什么是Node
- ++Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境++
- ++Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效++
- ++Node.js 的包管理器 npm，是全球最大的开源库生态系统++
- 对比Chrome浏览器组成差异
    - Chrome浏览器：（HTML、JavaScript、Webkit、V8）-> 中间层 -> （网卡、硬盘、显卡）
    - Node：（JavaScript、V8）-> 中间层（libuv） -> （网卡、硬盘）

类比java，node相当于jre，v8相当于jvm

### Node特点
- ==异步I/O、事件驱动、单线程、跨平台==
- 异步I/O
    - I/O任务的耗时取决于最慢的那个文件读取的耗时
    - 对于同步I/O，它们的耗时是两个任务的耗时之和
- 事件驱动
    - 优势：事件编程方式具有轻量级、松耦合、只关注事物点等优势
    - 问题：在多个异步任务的场景下，事件与事件之间互相独立，如何协作是一个问题
- 单线程（相对于多线程）
    - 优点：不用在意状态的同步，没有死锁存在，减少上下文开销
    - 缺点：
        - 无法利用多核CPU（child_process子进程解决，类比Webworker）
        - 健壮性差错误会引起整个应用退出（全局捕获错误事件、异常优先处理解决）
        - 大量计算占用CPU导致无法继续调用异步任务（child_process子进程解决，类比Webworker）
- 跨平台
    - node基于libuv（c++编写）实现跨平台

### Node应用场景
- I/O密集型
    - I/O密集的优势主要是在于Node利用事件循环的处理能力，而不是启动每一个线程为每个请求服务，资源占用极少
- CPU密集型
    - 基准测试斐波那契数列执行速度对比：C > Node(C++) > Java > Go > Node > Ruby2 > PHP > Python
    - 主要挑战：
        - 由于js单线程的原因，如果长时间运算到时CPU时间片不能释放，使得后续I/O无法发起
        - 适当调整和分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起
        - 这样既可以同时享受并行异步I/O的好处，又能充分利用CPU
    - 充分利用CPU方案
        - 使用C/C++扩展
        - 子进程

## 为什么要使用Node以及相关场景

前端宇宙大爆炸：2009年node发布，到已经有10年发展是，现在最新版本为11.12.0，其中6.x、8.x、10.x为阶段性稳定版本（针对语言特性）

### 目的：
- 明确前后端分工
    - 前端：负责 View 和 Controller 层（即UI 层、控制逻辑、渲染逻辑、交互、用户体验等工作）
    - 后端：负责 Model 层，业务处理/数据等（服务层、数据格式、数据稳定、业务逻辑等）
- 提高效率：降低前后端沟通成本后提高生产效率
    - 每个人独自负责某个模块的全栈开发，在对接期间无需等接口以及磋商接口，无需等待可用后端线上服务
- 提高产能与岗位增值：技术积累不局限于页面交互复制粘贴，在业务、部署运维等方面更多可用有更多的接触和空间

### 相关场景
- 前后端编程语言环境统一
- node带来的高性能I/O用于实时应用
- 并行I/O使得使用者可以高效地利用分布式环境
- 并行I/O，有效利用稳定接口提升Web渲染能力
- 云计算平台提供Node支持，低资源占用，高性能
- 游戏开发领域
- 工具类应用

### 定位
在微服务的趋势下，发挥node的优势，扬长避短，让node成为微服务中间层的选择。
相对于PHP、Python等其他语言，前端同学使用Node更加有亲和力

## 怎么使用Node提供服务功能

### 传统单节点MVC架构
![javaMVC](）
- view层：使用xTemplat、jada、JSP等技术渲染页面等
- controller层：处理HTTP相关，提供权限控制、路由跳转、业务调用等
- Model层：建立业务相关的数据模型，进行对象关系型映射，进行数据库操作

### MVC中的相关对象模型
- POJO（Plain Ordinary Java Object）：简单对象
- VO（Value Object）：前端展示、前端与后端交互的对象，按需展示相关数据结构
- DTO（Data Transfer Object）：后端与后端交互的对象，按需提供相关数据结构
- DAO（Data Access Object）：用于表示一个数据访问对象，对模型数据库操作的封装，后得到PO。
- PO（Persistant Object）：数据库中的一条记录映射成的对象
- BO（Business Object）：提供了基本业务单元的基本业务操作，调用DAO、DTO等

### 现阶段MVC架构

由于前端近10年的飞速发展，Vue、React、Anglar等数据驱动型框架的出现，带动前端MVC、MVVM、MVP架构的成熟，项目一般都使用前后端在开发逻辑上进行分离的操作，前端趋向于静态资源发展。
另外，在微服务的趋势下，服务只提供单一功能，使得传统单节点MVC架构不再满足开发需求，使得后端MVC架构开始有变化。


![MVCObject](）

- 现阶段MVC架构
    - 展示层（纯前端MVC架构 + VO）
    - Web层（后端controller + VO + BO）
        - 使用面向切面编程（aspect-oriented programming，缩写AOP）的设计规范，使用函数式编程的方式实现。如衍生filter、middleware、router等
        - 使用控制反转（Inversion of Control，缩写为IoC）设计原则，使用依赖注入（Dependency Injection，简称DI）实现。即对象在被创建的时候，由一个调控系统内所有对象的外界实体，将其所依赖的对象的引用传递给它
        - 根据不同的数据源注入相关的Service，如mock、DB查询和http
    - Service层，属于一个接口，常规业务对象的抽象，如BO
        - 持久型：(DAO\rom）操作数据库层
        - API型：其他相应服务的接口封装
    - 数据库层：相应数据库的实现

### 怎么使用Node

#### 启动项目，访问http://localhost:5000/

```
git clone https://github.com/garry-mark/my-react-app.git @types

cd my-react-app/bussiness

npm install

# 启动项目
npm start

```
#### 目录结构

```
- bussiness-service
    - build         # 基于typescript编译后的js结果
    - log           # 相关日志文件，包含操作、错误、访问日志记录
    - node_modules  # 开发依赖
    - src
        - controller        # 控制器目录
            - CategoryController.ts
        - core              # 核心代码：以后会提取出来成为一个npm包
        - enum              # 枚举值文件
            - index.ts
        - middleware        # 项目应用中间件
        - model             # 数据模型
            - vo
        - service           # 服务层目录
            - CategoryService.ts
        - typing            # 相关类型声明
        app.ts              # 项目入口
    - tests                 # 测试文件夹：项目应用的单元测试用例
        - controller
            - CategoryController.test.ts
        - service
            - CategoryService.test.ts
    - package.json          # 本项目npm包信息，记录相关依赖、脚本
    - ecosystem.config.js   # pm2 配置文件，用去生产部署
    - tsconfig.js           # typescript配置文件
    - Dockerfile
    - app.config.js         # 配置文件：记录数据库信息、日志记录方式、端口、API服务等配置信息
    - ...

```
### 快速上手例子

#### 核心使用原则
- 从ctx上下文中获取 数据库连接池、http客户端、日志打印器、参数校验等操作
- 在物理上文件分层的同时，开发时在不同的层使用相应的上下文工具处理业务，从而达到分层效果

#### 创建controller

```typescript

// 核心代码导入，以后会简化
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
export default class CategoryController extends Controller {

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
    // action的本质是Koa中间件，该队其进行改装可用通过this获取ctx以及相关工具，使用async \ await把异步操作同步化处理
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
        ...
    })
    public async createCategory() { ... }

    @Route({
        path: '/',
        methods: 'put',
        ...
    })
    public async updateCategory() {...}

    @Route({
        path: '/:id',
        methods: 'delete'
        ...
    })
    public async deleteCategory() {...}

}

```

##### 思考
- 参数校验方面
    - 现在方案：有针对的对对query、params、body参数进行灵活处理
        - 同时增强url、email、值范围等的校验
        - 参数的类型转换，如query上一般为数字的字符串类型转换为整型
        - 同时，方便以后自动化生成swagger 和 前端service层
        - 缺点：写起来繁琐
    - 另外方案：为什么不是在每个route中导入一个相关的数据模型，进行自动校验
        - 可行性低，只能判断模型变量的类型。不能校验范围、或其他string增强类型，如url等

#### 创建service

```typescript

import Service from "../core/model/Service";
// 映入相关的模型
import CategoryVO from '../model/vo/CategoryVO';

// 主要是考虑整个项目的数据源都是DB，所以只选择实现CategoryService，而没有进一步抽象
// 在多数据源的项目下可用抽象出CategoryService接口，实现不同的Service,类似下面写法
// class CategoryDBService extends Service implements CategoryService
export default class CategoryService extends Service {

    // DB类型，相关业务操作例子
    public async getCategoryList(): Promise<Array<CategoryVO> | null> {
        // 在上下文（web容器）中获取mysql连接池和日志打印器
        const { mysql, logger } = this.ctx!;

        // 对sql进行转义，防止sql注入等攻击
        const sql = mysql.format(`SELECT id, name FROM category`);
        logger.debug(sql);
        // 进行sql操作
        const [data] = await mysql.query(sql);
        // 记录操作日志
        logger.debug(data);

        return data;
    }

    public async deleteCategory(id: number): Promise<number | null> {
        const { mysql, logger } = this.ctx!;

        // 在连接池中获取连接以及开启事务
        const conn = await mysql.getConnection();
        await conn.beginTransaction();
        try {
            const aSql = conn.format('DELETE FROM category WHERE id=? ', [id]);
            logger.debug(aSql);
            const result = await conn.query(aSql);
            logger.debug(result);
            const [{ affectedRows: aAffectedRows }] = result;

            if (await this.hasArticleMapping(id)) {
                const mSql = conn.format('UPDATE map_article_category SET cid=? WHERE cid=? ', [null, id]);
                logger.debug(mSql);
                const mResult = await conn.query(mSql);
                logger.debug(mResult);
                const [{ changedRows: mChangedRows }] = mResult;

                if (!mChangedRows) {
                    // 事务回滚
                    await conn.rollback();
                }
            }
            // 事务提交
            await conn.commit();

            return aAffectedRows;
        } finally {
            // 释放链接
            conn.release();
        }
    }

    // API类型，相关业务操作
    public async getCategoryList(): Promise<Array<CategoryVO> | null> {
        // 在上下文（web容器）中获取mysql连接池和日志打印器
        const { curl, logger } = this.ctx!;

        const url = 'http://www.abc.com';

        // 发起http请求，可用配置该请求相关的配置，如设置keepalive、method、参数等
        const [data] = await curl(url,{
            method:'get',
            headers:[],
            data:[],
            agent: new http.Agent();
        });
        // 记录操作日志
        logger.debug(url);

        return data;
    }
}

```
##### 思考

- DB查询方面
    - 现在阶段：主要是以拼接sql的形式，进行数据库操作，容易造成错误，且只支持mysql。
    - 优化：
        - 进行类似JDBCTemplete的orm封装，提高开发效率
- API查询方面
    - 现在阶段：主要是拼接url为主，每个请求设置各自的请求参数
    - 优化：
        - 进行REFTful风格的封装，提供全局的请求参数统一设置，如http代理实现keepalive、baseURL、DNS缓存等
- BO和Service的关系？
- 有必要DAO层嘛？
    - 个人认识：DAO层针对模型的orm封装，各个模型继承类似JDBCTemplete相关封装。


#### 模块功能完成使用postman或浏览器访问等到数据

正确访问：
> http://localhost:5000/api/category

错误访问：

#### 生产部署

核心：在处理全局捕获错误事件、异常优先处理解决的基础上，使用pm2实现node多进程运行充分利用CPU资源弥补单线程的不足

```
# 把TS编译成js
npm run build

# 本机生成运行
npm run serve
# 或
# 打docker镜像
npm run  build:docker
# 运行在docker上
npm run docker:run

# 监控CPU、内存信息
pm2 monit

# 查看相关日志
cd {project}/log

# 压力测试
ab -c 24 -t 60 http://localhost:5000/api/category

```

#### 后续优化
- 增加单元测试、继承测试
- 优化 HTTP客户端 与 DB查询
- 自动生成swagger文档
- 基于前端http引擎自动前端service
- 监控警告
- 定时任务处理（定时上报应用状态、从远程接口更新本地缓存、定时进行文件切割、临时文件删除等）
- https、IPV6

### node如何实现现阶段MVC结构（基于Koa2的MVC架构）

相关技术：Koa2、Typescript

技术选型原因：
- Typescript：静态类型检测有利于业务安全和严谨，语法类似Java方便。
- Koa2：主要是以 async/await 异步编程模型为基础的洋葱圈模型，简单轻量类比前端DOM操作的jquery，本质上就是对http封装的类库。

#### 如何实现AOP

由于使用koa2的原因，自身的洋葱圈模型已经实现了AOP的思想

![onionModel.png]()

##### 简单实例

```javascript

const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  // 执行顺序1
  await next();
  // 执行顺序5
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  // 执行顺序2
  const start = Date.now();
  await next();
  // 执行顺序4
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  // 执行顺序3
  ctx.body = 'Hello World';
});

app.listen(3000);

```

#### 如何实现Ioc

使用装饰器decorator实现，核心装饰器为Controller中的@Route、@Router、@Service实现

TS中装饰器的原理：
- 装饰类 和 装饰函数或字段都可以获取到 原型对象，即prototype
- 装饰类可用获取到，该类的构造函数，constructor
- 装饰器的本质是在类实例化前对类的++原型对象++和++构造函数++进行改造

核心代码装饰器说明：
- @Route：把在控制器中传入的route，原型的routes上
- @Router：把在控制器中传入的router，构造函数的静态成员router上
- @Service：把在控制器中传入的service，构造函数的静态成员services上，再赋值到对应Controller实例的services上
    - 是否可用放在原型对象上？尝试过但是ES6与ES5的原型有差异，最终使用构造函数

#### Controller和Service文件分层

注册的controller和service都是全局单例

通过文件形式分层，并得到ctx上下文，再配合controllerRegister注册Controller

```typescript
// Controller.ts
import { Context } from 'koa';
import { SubService } from './Service'
interface Services {
    [name: string]: SubService;
}
export default class Controller {
    protected _ctx?: Context;
    public services: Services = {};

    public get ctx(): Context | undefined {
        return this._ctx;
    }

    public set ctx(ctx: Context | undefined) {
        this._ctx = ctx;
    }
}
```

```typescript
// Service.ts
import { Context } from 'koa';
export interface SubService extends Service {
    [name: string]: any;
}
export default class Service {
    protected _ctx?: Context;

    public get ctx(): Context | undefined {
        return this._ctx;
    }

    public set ctx(ctx: Context | undefined) {
        this._ctx = ctx;
    }
}
```

#### 自研MVC框架核心代码

核心代码主要保存在 ==\/core== 目录下

##### 目录结构
```
- core
    - decorator
        - Route.ts
        - Router.ts
        - Service.ts
    - enum
        - index.ts
    - middleware
        - handleError.ts
        - validate.ts
    - model
        - Controller.ts
        - Result.ts
        - Service.ts
    - register
        - controllerRegister.ts
        - CORSRegister.ts
        - httpClientRegister.ts
        - loggerRegister.ts
        - middlewareRegister.ts
        - mysqlRegister.ts
        - uncaughtExceptionEventRegister.ts
        - validateRegister.ts
    - typing
        - MyKoa.ts
    - utils

```
##### 从入口文件看核心代码

```typescript
import * as Koa from 'koa';
import * as log4js from 'log4js';
import * as config from './../app.config';

import uncaughtExceptionEventRegister from './core/register/uncaughtExceptionEventRegister';
import loggerRegister from './core/register/loggerRegister';
import validatorRegister from './core/register/validatorRegister';
import mysqlRegister from './core/register/mysqlRegister';
import httpClientRegister from './core/register/httpClientRegister';
import controllerRegister from './core/register/controllerRegister';
import middlewareRegister from './core/register/middlewareRegister';

import CORSRegister from './core/register/CORSRegister';

import MyKoa from './core/typing/MyKoa';

// 增强Koa实例容器01，在ctx（上下文中）暴露 应用配置文件 和 日志打印器
const env = process.env.NODE_ENV;
const app: MyKoa = new Koa();
const logger = log4js.getLogger('APP');
app.logger = logger;
app.config = config.app[env];

// 处理全局捕获错误事件，增强健壮性
uncaughtExceptionEventRegister(app);
// 基于log4js，生成loggerMiddleware中间件，在ctx中暴露logger，使得全局使用同一个logger
const loggerMiddleware = loggerRegister(app);
// 基于parameter，生成validatorMiddleware中间件，在ctx中暴露validate，用于参数校验
// 后面controllerRegister在已经自动集成validateMiddleware执行校验 中间件
const validatorMiddleware = validatorRegister(app);
// 基于koa-router，并且自动加载项目中的controller文件，同时对依赖注入服务、映射路径以及自动添加参数校验
// controllerMiddleware，在controllers和service中注入ctx，使其可用在this中获取
// routesMiddleware，注册controller中的业务操作
// allowedMethodsMiddleware，RESTful进行限制处理
const { routesMiddleware, allowedMethodsMiddleware, controllerMiddleware } = controllerRegister(app);
// 基于mysql2，创建了一个全局单例的连接池，在ctx中暴露mysql
const mysqlMiddleware = mysqlRegister(app);
// 基于urllib，创建了一个全局单例的http客户端，在ctx中暴露curl
const httpClientMiddleware = httpClientRegister();
// 全局跨域处理
const CORSMiddleware = CORSRegister(app);

// 以上加入全局中间件，底层app.use
// 内置：handleErrorMiddleWare用于处理中间件链路中捕获错误事件，增强健壮性
middlewareRegister(
    app,
    loggerMiddleware,
    validateMiddleware,
    mysqlMiddleware,
    httpClientMiddleware,
    controllerMiddleware,
    CORSMiddleware,
    routesMiddleware,
    allowedMethodsMiddleware
);

const port: number = process.env.PORT || app.config.port;
app.listen(port, () => {
    logger.trace(`🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});

```


