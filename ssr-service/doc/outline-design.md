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