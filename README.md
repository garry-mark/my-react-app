## 项目研发 技术要点、问题/解决方案 与 思考

### 开发环境
- [x] 开发环境：由原定的执行TS到执行JS，即放弃nodemon-tsnode方案改为webpack-nodemon(npm-run-all)方案
    - 原因：由于运行时对css等其他资源处理不友好

### Webpack

#### 技术要点
- [x] 开发生产环境区分，包括配置文件、环境变量设置等
- [x] CleanWebpackPlugin 打包前，目录自动清理 dist 目录下的所有文件
- [x] 第三方库提取
- [x] 根据路由实现按需加载
- [x] 缓存处理
- [x] gzip处理
- [x] dll 处理
- [x] sourceMap:cheap-module-eval-source-map 处理 开发环境下，可以定位报错
- [x] devServer 搭建（HRM 热替换模块、服务代理）
- [] cdn 处理
- [x] webpack 打包分析
- [x] 别名处理
  - [x] 删除 node_module 别名处理
- 生产环境
  - [] 生产 html 压缩处理
- 开发环境
  - [] output 删除 chunkhash 操作
  - [] 同构环境删除 devServer 处理
- [x] htmlPubgin处理favicon

#### 问题/解决方案
- [] DefinePlugin 使用 ENV 变量比使用字符串字面量，打包要多 200k？？
- [] 根据打包内容，如果大于 160k 采用按需加载方案，否则只出一个包

### Babel

#### 问题/解决方案
- [x] babel 是否可以考虑移出开发环境？
    - 否，因为需要babel进行polyfill
- [] babel-polifill 根据环境动态加载
  - 方案一：require，多 30k，估计没有 treeshaking
  - 方案二：import 'babel-polifill',但是不能更具环境区分动态加载
  - 方案三：import('babel-polifill'),无@types/babel-polyfill
- [x] 由于使用了 babel-react-css-module @import '@/styles/index.scss';无法在 src/browser/index.js 单独导入
  - 暂时解决方案：放到 app 的 scss 里面@import
  - 解决方案：由于无法使用别名处理，所以./styles/index.scss 即可

### Tslint

#### 问题/解决方案
- [] eslint-loader 在 webpack 的 nodeAPI 中无法使用
  - Module build failed: TypeError: Cannot read property 'VERSION' of undefined at Object.module.exports (/Users/garry/myworkspace/blog/node_modules/tslint-loader/index.js:135:37)
- [x] tslint自动格式化失效
  - 原因：vscode 自动判断制表符设置导致报错tslint失效
  - 解决：引入editorconfig

### Typescript

#### 问题/解决方案
- [] ts-loader,transpileOnly 的利弊
- [] typeRoots 与 noImplicitAny 为 false 处理，自定义@types
- [] 样式dts使用全局定义，而不是目前的按照css文件数目定义
- [] 由于VScode根据根目录tsconfig进行检查，所以保留。
    - 解决思路：vscode配置？
- [] 样式文件不支持别名
    - 原因：因为使用的是TS中的别名方案
- [] 去除handleTsAlias，即tsconfig-paths处理
    - 原因：因为这是使用ts-node启动的别名方案
    - 解决方案：现在使用webpack打包后结果启动，所以使用webpack别名即可

#### 思考
- typescript 与 babel 和 eslint 的区别
  - ts 是一种语法，tslint 对其进行风格限制，但是 ts 可以静态检测某些错误
  - ts 可以生成 es5 或 es6，但是依然需要 babel 进行 polifill
  - lib 编译选项只是编译时定义，但是还需要 polifill

### JaveScript

#### 技术要点
- [x] 主要使用 babel 进行ESNext语法支持
- [x] .js 文件支持 ES6(stage-3)语法、jsx 语法
    - 后来为支持Syntax Dynamic Import，Class properties transform（静态成员变量），装饰器（Decorators）升级到stage-2
- [x] 使用 envPreset，是 js 代码能根据环境进行兼容处理
- [x] 使用 transform-runtime 对 pollify 进行按需加赞
- [x] UglifyJsPlugin 对代码进行压缩、优化、丑化以及 TreeShaking
- [x] eslint 处理
    - 后升级Tslint
- [x] Flow 处理
    - 后升级TS
- [x] 升级 typescript
  - ts 可以统一前后端的静态类型语言
  - 升级后打包结果略大于 js，几 k
- [x] props-type 处理

#### 思考
- typescript与props-type之间的关系，冲突嘛？


### React

#### 技术要点
- [] 一个容器组件包装过于复杂
    - 使用装饰器
- [] 样式加载使用装饰器处理
- [] react 热加载
- [x] 路由/article/1 获取params
    - 解决方案：经过matchRoutes中的match获得

#### 问题/解决方案
- SSR首次加载在非js环境下，与loadable冲突（因为依赖js）
- SSR 预加载数据请求错误处理
    - 返回单页应用 500 页面
- loadable中的报错
- [x] hydrate导致样式无法渲染，刷新后正常
    - 由于服务端没有将样式转化盛一个对象，导致组件引入样式失败，SSR与BSR相差较大

#### 思考
- [x] 服务器端渲染的优点
  - SEO
  - [x] 预加载数据
  - [x] 样式预加载
  - [x] 错误以及重定向的可控性，如 401，404，302
  - [] 静态资源处理（页面等）
- [x] 服务器端渲染的缺点
  - 增加前端架构和部署难度
  - [x] 渲染了两次页面，考虑如何节省首次访问的前端渲染?实际上不会渲染两次，因为 react 有判断
  - [x] 首次渲染无样式？仅限开发环境，生产环境整个导入可以解决（分开导入？）
- [] 服务器端渲染后全部都用redux管理？
    - 暂时使用全面redux管理方案
- [x] react 环境配置问题，每个组件都应用 React 类，但是没有代码上面的调用，删除后报错："React is not defined"
  - 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。

### CSS

#### 技术要点
- [x] autoprefix 处理
- [x] sass 环境支持
    - 后改为cssNext
- [x] sass 升级到 cssNext
  - 升级后打包结果略大于 sass，并且只支持 IE12 以上，而且生成--var()语法尚不成熟
- [x] 免加载全局变量处理
  - 解决方案：postcss 处理
- [x] css 模块化（css-loader）
- [x] react 组件，样式高阶函数处理（babel-react-css-modules 处理）
- [] BEM 规范
- [x] normalize 集成
- [x] 样式工具、函数、以及变量提取
- [x] 样式按需加载
- [x] MiniCssExtractPlugin 样式文件提取处理
- [x] css 压缩优化（css-loader）
- [x] 样式缓存处理，并且文件名根据内容决定

#### 问题/解决方案
- [] mixin 不能单独提出来，首次会报错，估计加载顺序有问题
- [x] 样式表内不能使用 @import '#/normalize.css'导入 node_modules 里的文件
  - 暂时解决方案：使用相对路径
  - 解决方案：postcss 处理
- [] typescript样式定义处理
- [x] 服务器端渲染样式跳动问题，理想效果需要css预加载
    - 通过isomorphic-style-loader解决
- SSR需要渲染样式和loadable中的样式生产环境下打包结果不一样
    - SSR的样式在main.css中
    - loadable的样式在chunk中
- [x] 开发阶段，公共样式没有SSR到时，样式闪动问题
    - 原因：由于SSR没有加入公共样式
    - 解决方案：withStyle支持多个样式文件的引入

### HTML

- [x] index.html 文件提取
- [] 动态 title
- [] SEO

### Axios

#### 技术要点
- 浏览器端实例：
    - 请求取消
    - 请求响应拦截
    - 状态码处理
- 服务端实例：
    - 状态码处理
    - 数据服务域名配置
#### 思考 / 解决方案
    - [] 响应拦截器文本，貌似已经存在状态码对应的文本，结合axios内核选择删除

### 其他资源处理

#### 技术要点
- [x] 小于 10k 文件 base64 化
- [x] 资源文件缓存处理

### 其他
- [x] favicon打包放到dist中？在工程的根？在公共资源下？
- [] 路径正则规则

### 微服务
- 使用docker-composed进行服务编排（静态资源微服务、SSR微服务、APIgateway、单点登录微服务）

### Nginx
- 动静分离，静态资源为服务镜像构建
- [x] 目前以dist为静态资源服务，导致server/main都可以直接访问，有安全问题。
    - 使用nginx
    - 新建一个statc目录，存放静态资源

### Node

#### 技术要点
- [] 服务器端渲染同构方案
  - [] 开发环境：对 css 等资源的处理
  - [] 开发环境：HRM 实现
  - [] 开发环境：模版耦合
- [x] 开发环境服务器
- [x] docker 容器化
- [] 测试用例规范
- [] debug 调试环境
- [] https 处理
- [] 错误处理

#### 问题/解决方案
- [x] koa-static默认index.html，与SSR对/重定向处理冲突
    - 解决方案：koa-static.options.index设置为false
- [x] typescript 升级处理
  - webpack 有 node 热修复插件？
  - 解决方案：使用 nodemon 的 runtime 方案，由于 webpackHRM 方案，但是有资源读取问题
- node 环境下，实现 generator 方案的差异？
  - TSconfig target:es5 lib:es2015 无需 babel-polyfill 实现 generator
  - TSconfig target:es6 lib:无 需要 babel-polyfill 实现 generator（即 regenerator）
- [x] 服务器分流问题，如何让SSR中间价不处理非前端路由
    - 解决方案：SSR中间件放到最后
- [x] koa-webpack中间件文件流无法运行问题
    - 中间件编写记得写await next()，如果直接用next()将忽略下一个next中的异步操作返回结果
- node端 是否保留原生 __dirname
    - webpack.node.__dirname为false（原生功能）
        - 开发环境：node端运行的是打包结果（由于SSR样式渲染需要webpack的同构loader），所以开发ts时候代码中的__dirname为dist中的serve/main.js
            - 注意点：由于开发环境需要运行browser端的webpack，webpack配置中__dirname不是配置原意的工程根目录，而是main.js，使得某些原本相对于context的uri失效（失去webpack本意）
        - 生成环境：__dirname与开发环境相同
    - webpack.node.__dirname为true（放弃原生功能相对于context的路径）
        - 开发和生产都指向__dirname相对于context的路径
    - 方案：不保留，使用webpack.node.__dirname = true配置，使之相对于工程根目录，方便开发生产环境统一

### PM2

#### 问题/解决方案
- [x] 由于服务端是使用pm2启动，所以启动工程的工作路径为pm2启动的目录
    - ecosystem 配置文件中配置cwd
    - docker启动时必需进入工程内使用pm2-runtime启动

### Docker

#### 问题/解决方案
- [x] 安装依赖是否应该放在打包镜像过程中?
    - 需要，就相当于一个pull一个项目下来一样
- 真机器，docker打镜像时候，使用淘宝源反而会导致安装失败？？
- 构建速度很慢，webpack速度与npm install速度


### git管理

#### 问题/解决方案
- 每个微服务需要有自己的gitstroe ？还是统一使用一个gitstore？
    - 各自为git：方便每个项目的独立性
    - 统一：项目为一个整体，微服务间需要docker-composed连接，某些文档

