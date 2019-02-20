# Koa in Typescript

### 目的

- 使用 koa 搭建前后端同构项目
- node 端提供服务器端渲染、简单静态资源服务、http 服务代理、简单数据库查询等

### 效果

- 开发环境: npm script 命令启动工程，且服务器端自动重启，前端页面热替换
  - 通过 dll 技术，第三方依赖预编译
- 生成环境: npm script 命令构建前后端工程，并为一个包可以供直接部署

### Typescript

- 静态类型检查、抽象、函数重载、JS 超集支持 ESNext 语法、适合大型系统开发
- Typescript 与 Babel 的区别
  - ESnext 的支持：babel 是 polyfill，ts 是直接生成对应版本的 ES 语法
  - tsconfig.target:如果 ts 目标是 ES5 语法，但是使用了 ES6API，在编译阶段需要导入 lib，打包后结果仍然需要 polyfill
  - tsconfig.module:根据运行环境不同，支持 ts 打包后使用的模块系统，也有不同要求。node 稳定版本暂时不支持直接使用 ESModule
  - 另外，babel 还支持对特殊语法的解析，如 flow 等
- Typescript 与 lint
  - https://github.com/xcatliu/typescript-tutorial/blob/master/assets/typescript-eslint.png
- typescript 注意事项
  - 别名使用，需要自定义扩展 requrie.extensions 方法
  - 自定义 d.ts 声明文件
  - node 打包结果需要为 commonjs 模块

### 文件目录结构

### webpack 处理

### node 开发环境注意事项

- node 环境读取非脚本资源，需要另外添加 hook
- node 开发环境需要自动重启服务器
- webpack 的 node 构建
  - \_\_filename  和 \_\_dirname 等全局变量处理

### 热更新

- 原理：
  - 在 node 环境下，使用 webpackAPI 进行编译
  - webpack-dev-server 对文件系统进行 watch 并将编译结果打包到内存中，生成 index.html 文件并用于 SSR 返回
  - webpack-dev-server 通过 websocket 通讯，发送 被更新模块的最新 hash 值给浏览器端
  - webpack-dev-server/client 接收到服务端消息做出响应，决定是热更新还是 reload 页面
  - webpack/hot/dev-server 监听到 webpack-dev-server/client 发送 webpackHotUpdate 消息
  - 开始调用 HotModuleReplacement.runtime 中的 check 方法，check 方法中
    - 首先调用 hotDownloadManifest 向服务端请求是否有更新的文件，返回旧 hash 为命名的 json 文件，内容为新模块的 manifest
    - 如果有更新，通过 JSONP 的方式更新模块，后端通过 EventSource 推送，通过 hotDownloadUpdateChunk 方法，得到旧 hash 为命名的 js 文件，内容为新模块 chuck
  - HotModuleReplacement.runtime 对模块进行热更新
  - 业务代码需要实现 if(module.hot)

### SSR

- 作用：SEO、预加载数据、错误以及重定向的可控性，如 401，404，302

- 实现：
  - 中间件 serverSideRender
    - 拦截方案：判断服务器路由是否匹配前端路由，进而进行服务器端渲染
      - 前端最好使用静态配置路由，方便判断
  - SSR 注意事项
    - 渲染了两次页面，考虑如何节省首次访问的前端渲染?实际上不会渲染两次，因为 react 有判断
    - 首次渲染无样式？仅限开发环境，生产环境整个导入可以解决

### 部署方案

- 版本管理方案：使用 npm 私服发布管理包
- 部署方案
  - ssh + PM2（自动重启，多进程，监听文件变化自动更新）
    - 缺点：无法很好管理版本
  - docker + jenkins + git

### 待续

- 单元测试与集成测试
