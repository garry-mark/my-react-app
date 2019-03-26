## node service层多类型接口框架
- 可配置，包括端口、serviceURL、db信息等
- 以model为最小粒度，支持使用mock、databbase、service等多种数据源
- koa中间件，this.ctx中包含http-client、mockjs、db-client等
- router、controller、service文件自动识别

## 服务端功能点
- 三月
    - [x] node部署方案
        - [x] 基于pm2
        - [x] docker镜像
    - [] node架构实现内容
        - [] 细节
            - [] 定义VO、BO、PO、DTO、DAO的关系
                - vo与dto类似，
        - [] web层
            - [x] 页面渲染服务（支持SPA的SSR与MPA的SSR）
            - [] 类似swagger的文档导出
        - [] 工具或拦截器等
            - [x] 程序错误处理与页面渲染错误处理
            - [x] 参数校验
            - [x] 日志记录
        - [x] 业务层
            - [] controller针对不同类型service的实现
        - [] 持久层
            - mysql-util中间件
                - mysql数据库连接池方案
                - DaoBase基本操作封装，支持基本CRUD以、sql、事物操作
            - http-proxy
                - 支持tcp连接池，以及普通http代理服务
            - 集成mockjs
- 四月
    - [] mysql服务的联调与开发
    - [] nginx服务的联调与开发（静态资源服务、代理服务、代理缓存服务、负债均衡等）
    - [] apigateway的联调与开发（服务注册与服务发现）
        - [] ZooKeeper客户端 与 docker register服务实现
        - [] 接入redis实现 用户状态管理 以及 访问权限控制
    - [] 基于docker-composed部署大前端方案
- 五月
    - [] 前端微服务容错方案
    - [] 集成单元测试、集成测试、性能测试、压力测试
    - [] https化
- 六月
    - [] 微服务监控方案


- [x] 程序错误处理
    - [x] koa中间件：使用 handleErrorMiddleware 对中间件流程抛出的错误进行处理
        - 原理：koa内部koa-compose对递归的处理，如果错误没有被捕获会被抛到最外面（async / await中promise的reject会变成同步抛出的错误）
    - [x] uncaughtExceptionEventRegister：对node进程中抛出的错误进行处理
        - [x] 在非中间件环节，所抛出的错误处理
            ```
                setTimeout(() => {
                    throw new Error('123');
                }, 2000)
            ```
    - [x] 服务错误封装处理
        - 返回统一格式的json，包含错误码、错误信息等
- [x] 页面渲染错误处理
    - SSR 预渲染数据 错误处理
        - 解决方案：统一返回到service-error页面
    - BSR 调用接口 错误处理
        - 解决方案：单一数据源页面直接到service-error页面；否则显示 错误组件（文本显示、重新请求、loading）
    - 后期SSR于BSR统一使用组件处理，组件判断SSR得出的结果再控制 错误组件
- [x] 日志记录
    - 日志分级：error、warn、 info
    - 日志分类：每个ctx操作日志、app操作日志、访问日志
    - 使用log4js方案：
        - 生产环境：记录日志，对日志进行维持7天的持久化存储，另外记录错误操作
        - 开发环境：打印到控制台即可
        - 实现：使用log4js中间件，注入操作日志记录器到ctx中
    - 日志生产环境要点
        - 创建docker卷进行持久化处理
            - 问题：在本地docker与线上docker，如何统一挂载的卷？
        - [x] 集成pm2：打镜像时候 pm2 install pm2-intercom
- node连接数据库要点
    - 基于mysql2（promiseify），类似于ali-rds的template封装
        - [x] 目前使用mysql2实现功能
        - template封装：打印操作的sql语句、字段驼峰化、时间时区转化、错误的统一处理
    - [x] 使用连接池
    - 数据库参数配置，仅支持单数据库连接
- http-proxy实现
    - 需求：
        - [x] 支持promise
        - [x] 支持keepalive
        - [x] 支持多数据源
        - 支持baseUrl
        - 支持DNS缓存
    - agent理解：使用HttpClient的形式，封装curl等方法用于使用同一agent
    - baseURL等实现
    - [] 基于urllib的封装，支持promise、baseUrl、以及RESTful封装
- MVC三层架构实现
    - 三层架构：展示层（前端+VO）、web层（router+controller+VO）、service层(DAO\rom + DTO（对外服务）、VO（对外页面）\BO(对内))
    - [x] controller，通过this或者被调用具体方法的函数参数，获取ctxl
        - 控制器生成器: 将所有控制器都注册到app上，并且注册到相关路由中
    - service装饰器：controller注入不同的数据源
        - [x] 装饰器内部使用require()动态同步加载service，以及在传递 数据库或http-proxy操作，使其在this内得到
    - router与route装饰器的实现
        - [x] 基本功能：路由定义
        - [x] 集成paramaters用于参数校验
        - [] 用于生成类似swagger的RESTful api文档
        - [] 自动生成前端service层
        - [x] 注解与描述
    - DAO层 或 orm实现
        - 通过封装类似ali-rds的实现对sql的封装以及统一处理，替代DAO
    - [x] 请求返回结果封装
        - http级别：无日志记录，直接设置status
            - 404处理，401处理
        - 业务级别：有日志记录，ctx.throw，http状态为200，根据code判断请求是否成功，data获取数据，message获取错误信息
            - 请求参数错误
- AOP实现：koa自带，即中间件操作

## 表设计
```
CREATE TABLE `article` (
  `id` mediumint(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增文章ID',
  `title` char(20) NOT NULL DEFAULT '' COMMENT '标题',
  `banner` varchar(256) DEFAULT '' COMMENT '横幅',
  `content` text COMMENT '内容',
  `like` smallint(4) DEFAULT '0' COMMENT '赞',
  `page_view` smallint(6) DEFAULT '0' COMMENT '浏览量',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `origin_type` tinyint(1) NOT NULL COMMENT '来源类型：外链0、原创1',
  `origin_url` varchar(256) DEFAULT NULL COMMENT '来源url',
  `origin_name` char(20) DEFAULT NULL COMMENT '来源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

```

```
CREATE TABLE `category` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增类型ID',
  `name` char(16) NOT NULL DEFAULT '' COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
```

```
CREATE TABLE `map_article_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增关联表ID',
  `aid` mediumint(11) unsigned NOT NULL COMMENT '文章ID',
  `cid` tinyint(11) unsigned DEFAULT NULL COMMENT '类型ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
```

```
CREATE TABLE `user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增用户ID',
  `username` char(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT '密码',
  `tel_num` char(11) DEFAULT NULL COMMENT '电话号码',
  `email` char(64) DEFAULT NULL COMMENT '电子邮箱',
  `role` tinyint(1) DEFAULT '0' COMMENT '角色：访客0、博主1',
  `avatar` varchar(256) DEFAULT NULL COMMENT '头像',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
```