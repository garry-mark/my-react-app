### 待续优化

- [] react 环境配置问题，每个组件都应用 React 类，但是没有代码上面的调用，删除后报错："React is not defined"
  - 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。
- [] 样式表内不能使用 @import '#/normalize.css'导入 node_modules 里的文件
  - 暂时解决方案：使用相对路径
- [x] 由于使用了 babel-react-css-module @import '@/styles/index.scss';无法在 src/index.js 单独导入
  - 暂时解决方案：放到 app 的 scss 里面@import
  - 解决方案：由于无法使用别名处理，所以./styles/index.scss 即可
- [] sass 升级到 cssNext

### webpack 相关处理

#### webpack 工程化处理

- [x] 开发生产环境区分，包括配置文件、环境变量设置等
- [] CleanWebpackPlugin 打包前，目录自动清理 dist 目录下的所有文件
- [] 第三方库提取
- [x] 根据路由实现按需加载
- [] 缓存处理
- [] dll 处理
- [x] sourceMap:cheap-module-eval-source-map 处理 开发环境下，可以定位报错
- [x] devServer 搭建（HRM 热替换模块、服务代理）
- [] cdn 处理
- [] webpack 打包分析
- [x] 别名处理
  - [x] 删除 node_module 别名处理
- 开发环境
  - [] output 删除 chunkhash 操作
  - [] 同构环境删除 devServer 处理
  - [] DefinePlugin 使用 ENV
- 生产环境
  - [] 生产 html 压缩处理
  - [] DefinePlugin 使用 ENV

#### js 处理

- [x] 主要使用 babel 进行处理
- [x] .js 文件支持 ES6(stage-3)语法、jsx 语法
- [x] 使用 envPreset，是 js 代码能根据环境进行兼容处理
- [x] 使用 transform-runtime 对 pollify 进行按需加赞
- [x] UglifyJsPlugin 对代码进行压缩、优化、丑化以及 TreeShaking
- [x] eslint 处理
- [x] flow 处理
- [x] props-type 处理

#### css 处理

- [] sass 升级到 cssNext
- [] 免加载全局变量处理
- [x] autoprefix 处理
- [x] sass 环境支持
- [x] css 模块化（css-loader）
- [x] react 组件，样式高阶函数处理（babel-react-css-modules 处理）
- [] BEM 规范
- [x] normalize 集成
- [x] 样式工具、函数、以及变量提取
- [] 样式按需加载
- [x] MiniCssExtractPlugin 样式文件提取处理
- [x] css 压缩优化（css-loader）
- [x] 样式缓存处理，并且文件名根据内容决定
- [] 标签选择器的局部处理

#### html 处理

- [x] index.html 文件提取
- [] 动态 title
- [] SEO

#### 其他资源处理

- [x] 小于 10k 文件 base64 化
- [x] 资源文件缓存处理
