### 待续优化

- react 环境配置问题，每个组件都应用 React 类，但是没有代码上面的调用，删除后报错："React is not defined"
- 样式表内不能使用 @import '#/normalize.css'导入 node_modules 里的文件

### webpack 相关处理

#### webpack 工程化处理

- [x] 开发生产环境区分，包括配置文件、环境变量设置等
- [x] CleanWebpackPlugin 打包前，目录自动清理
- [] 第三方库提取
- [] 根据路由实现按需加载
- [] 缓存处理
- [] dll 处理
- [x] sourceMap:cheap-module-eval-source-map 处理 开发环境下，可以定位报错
- [x] devServer 搭建（HRM 热替换模块、服务代理）
- [] cdn 处理
- [] webpack 打包分析
- [x] 别名处理

#### js 处理

- [x] 主要使用 babel 进行处理
- [x] .js 文件支持 ES6(stage-3)语法、jsx 语法
- [x] 使用 envPreset，是 js 代码能根据环境进行兼容处理
- [x] 使用 transform-runtime 对 pollify 进行按需加赞
- [] UglifyJsPlugin 对代码进行压缩、优化、丑化以及 TreeShaking

#### css 处理

- [x] autoprefix 处理
- [] sass 环境支持
- [] cssNext 环境支持（优于 sass）
- [] css 模块化（css-loader）
- [] react 组件，样式高阶函数处理
- [] BEM 规范
- [] normalize 处理
- [] 样式工具、函数、以及变量提取
- [] 样式按需加载
- [x] MiniCssExtractPlugin 样式文件提取处理
- [] css 压缩优化（css-loader）
- [x] 样式缓存处理，并且文件名根据内容决定

#### html 处理

- [x] index.html 文件提取
- [] 动态 title
- [] SEO

#### 其他资源处理

- [x] 小于 10k 文件 base64 化
- [x] 资源文件缓存处理
