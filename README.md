### 思考

- typescript 与 babel 和 eslint 的区别
  - ts 是一种语法，tslint 对其进行风格限制，但是 ts 可以静态检测某些错误
  - ts 可以生成 es5 或 es6，但是依然需要 babel 进行 polifill
  - lib 编译选项只是编译时定义，但是还需要 polifill
- node 环境下，实现 generator 方案的差异？
  - TSconfig target:es5 lib:es2015 无需 babel-polyfill 实现 generator
  - TSconfig target:es6 lib:无 需要 babel-polyfill 实现 generator（即 regenerator）
- [] babel 是否可以考虑移出开发环境？

### 待续优化

- [] babel-polifill 根据环境动态加载
  - 方案一：require，多 30k，估计没有 treeshaking
  - 方案二：import 'babel-polifill',但是不能更具环境区分动态加载
  - 方案三：import('babel-polifill'),无@types/babel-polyfill
- [x] react 环境配置问题，每个组件都应用 React 类，但是没有代码上面的调用，删除后报错："React is not defined"
  - 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。
- [x] 样式表内不能使用 @import '#/normalize.css'导入 node_modules 里的文件
  - 暂时解决方案：使用相对路径
  - 解决方案：postcss 处理
- [x] 由于使用了 babel-react-css-module @import '@/styles/index.scss';无法在 src/browser/index.js 单独导入
  - 暂时解决方案：放到 app 的 scss 里面@import
  - 解决方案：由于无法使用别名处理，所以./styles/index.scss 即可
- [x] sass 升级到 cssNext
- [] mixin 不能单独提出来，首次会报错，估计加载顺序有问题
- [] DefinePlugin 使用 ENV 变量比使用字符串字面量，打包要多 200k？？
- [] 根据打包内容，如果大于 160k 采用按需加载方案，否则只出一个包
- [] eslint-loader 在 webpack 的 nodeAPI 中无法使用
  - Module build failed: TypeError: Cannot read property 'VERSION' of undefined at Object.module.exports (/Users/garry/myworkspace/blog/node_modules/tslint-loader/index.js:135:37)

### node 相关

- [x] typescript 升级处理
  - webpack 有 node 热修复插件？
  - 解决方案：使用 nodemon 的 runtime 方案，由于 webpackHRM 方案，但是有资源读取问题
- [] 服务器端渲染同构方案
  - [] 开发环境：对 css 等资源的处理
  - [] 开发环境：HRM 实现
  - [] 开发环境：模版耦合
- [] 开发环境服务器
- [] docker 容器化
- [] 测试用例规范
- [] debug 调试环境
- [] https 处理

### webpack 相关处理

#### webpack 工程化处理

- [x] 开发生产环境区分，包括配置文件、环境变量设置等
- [x] CleanWebpackPlugin 打包前，目录自动清理 dist 目录下的所有文件
- [x] 第三方库提取
- [x] 根据路由实现按需加载
- [] 缓存处理
- [x] dll 处理
- [x] sourceMap:cheap-module-eval-source-map 处理 开发环境下，可以定位报错
- [x] devServer 搭建（HRM 热替换模块、服务代理）
- [] cdn 处理
- [x] webpack 打包分析
- [x] 别名处理
  - [x] 删除 node_module 别名处理
- 开发环境
  - [] output 删除 chunkhash 操作
  - [] 同构环境删除 devServer 处理
- 生产环境
  - [] 生产 html 压缩处理

### TS 处理

- [] ts-loader,transpileOnly 的利弊
- [] typeRoots 与 noImplicitAny 为 false 处理，自定义@types

#### js 处理

- [x] 主要使用 babel 进行处理
- [x] .js 文件支持 ES6(stage-3)语法、jsx 语法
- [x] 使用 envPreset，是 js 代码能根据环境进行兼容处理
- [x] 使用 transform-runtime 对 pollify 进行按需加赞
- [x] UglifyJsPlugin 对代码进行压缩、优化、丑化以及 TreeShaking
- [x] eslint 处理
- [x] flow 处理
- [x] props-type 处理
- [x] 升级 typescript
  - ts 可以统一前后端的静态类型语言
  - 升级后打包结果略大于 js，几 k

#### react 处理

- [] 样式加载使用装饰器处理
- [] react 热加载
- [] 服务器端渲染的优点
  - SEO
  - 预加载数据
  - 错误以及重定向的可控性，如 401，404，302
- [] 服务器端渲染的缺点
  - [x] 渲染了两次页面，考虑如何节省首次访问的前端渲染?实际上不会渲染两次，因为 react 有判断
  - [x] 首次渲染无样式？仅限开发环境，生产环境整个导入可以解决（分开导入？）

#### css 处理

- [x] sass 升级到 cssNext
  - 升级后打包结果略大于 sass，并且只支持 IE12 以上，而且语法尚不成熟
- [x] 免加载全局变量处理
  - 解决方案：postcss 处理
- [x] autoprefix 处理
- [x] sass 环境支持
- [x] css 模块化（css-loader）
- [x] react 组件，样式高阶函数处理（babel-react-css-modules 处理）
- [] BEM 规范
- [x] normalize 集成
- [x] 样式工具、函数、以及变量提取
- [x] 样式按需加载
- [x] MiniCssExtractPlugin 样式文件提取处理
- [x] css 压缩优化（css-loader）
- [x] 样式缓存处理，并且文件名根据内容决定

#### html 处理

- [x] index.html 文件提取
- [] 动态 title
- [] SEO

#### 其他资源处理

- [x] 小于 10k 文件 base64 化
- [x] 资源文件缓存处理

#### 其他

- [] 路径正则规则
