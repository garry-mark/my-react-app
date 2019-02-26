## node service层多类型接口框架
- 可配置，包括端口、serviceURL、db信息等
- 以model为最小粒度，支持使用mock、databbase、service等多种数据源
- koa中间件，this.ctx中包含http-client、mockjs、db-client等
- router、controller、service文件自动识别

## 服务端功能点
- 程序错误处理
    - koa中间件：使用 handleErrorMiddleware 对中间件流程抛出的错
    误进行处理
        - 原理：集合koa内部koa-compose对递归的处理，如果错误没有被捕获会被抛到最外面（async / await中promise的reject会变成同步抛出的错误）
    - node：对node进程中抛出的错误进行处理
- 页面渲染错误处理
    - SSR 预渲染数据 错误处理
        - 解决方案：统一返回到service-error页面
    - BSR 调用接口 错误处理
        - 解决方案：单一数据源页面直接到service-error页面；否则显示 错误组件（文本显示、重新请求、loading）
    - 后期SSR于BSR统一使用组件处理，组件判断SSR得出的结果再控制 错误组件
- 操作日志记录(controller、service操作记录，错误记录)，持久化记录
-

## 表设计
```
CREATE TABLE `article` (
  `id` mediumint(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增文章ID',
  `title` char(20) DEFAULT NULL COMMENT '标题',
  `banner` varchar(256) NOT NULL DEFAULT '' COMMENT '横幅',
  `content` text NOT NULL COMMENT '内容',
  `origin` tinyint(1) NOT NULL COMMENT '来源：外链0、原创1',
  `like` smallint(4) DEFAULT NULL COMMENT '赞',
  `page_view` smallint(6) DEFAULT NULL COMMENT '浏览量',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

```
CREATE TABLE `category` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增类型ID',
  `name` char(16) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

```
CREATE TABLE `map_article_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增关联表ID',
  `aid` mediumint(11) unsigned NOT NULL COMMENT '文章ID',
  `cid` tinyint(11) unsigned NOT NULL COMMENT '类型ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

```
CREATE TABLE `user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增用户ID',
  `username` char(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT '密码',
  `tel_num` tinyint(11) DEFAULT NULL COMMENT '电话号码',
  `email` char(64) DEFAULT NULL COMMENT '电子邮箱',
  `role` tinyint(1) DEFAULT NULL COMMENT '角色：访客0、博主1',
  `avatar` varchar(256) DEFAULT NULL COMMENT '头像',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```