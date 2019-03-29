## 什么是前后端同构

发展趋势：前后端异构 -> 前后端分离 -> 前后端同构

### 前后端异构

> 典型传统单机MVC模式：JavaWeb + jquery + web服务

#### 特点：
- 可有利于SEO，尤其是门户网站
- 前后端开发逻辑是一起的，通过http协议进行通讯
- 可以直接渲染出带数据和样式的html页面，在低网速多请求数据的情况下，大大增加用户体验
    - 但是，仍然需要等待异步js解析执行，才可以交互
    - 同时，开发体验较差，虽然JSP也是数据驱动，但是但是比较于现阶段前端MVC框架而言，能力不足（数据流方面）
    - 并且，异构每次访问都需要经过服务器，造成一定服务器压力，开销较大

### 前后端分离

> 现阶段项目模式：前端MVC + web服务

#### 特点：
- SEO不友好
- 前后端在开发逻辑上是分开的，通过http协议进行通讯
- 部署逻辑可以分别采用同时部署 和 把前端当作静态资源放在nginx上部署处理
- 页面渲染只走客户端渲染，在低网速多请求数据的情况下，用户体验不好，甚至长时间现实白屏幕

### node前后端同构
![SSR](https://github.com/garry-mark/markdownImage/raw/master/ssr/SSR.png)

![CSR](https://github.com/garry-mark/markdownImage/raw/master/ssr/CSR.png)

### 区别主要在于出现首屏渲染的时机
- 对于服务器端渲染（Server Side Render，简写SSR）来说
    - 服务器返回的是结构相对完整的通过解释的HTML文件，浏览器就能渲染出页面
    - 换句话，浏览器再也不需要等到所有的JavaScript文件下载并执行完之后才去渲染页面啦（增量式构建）
- 而对客户端渲染（Client Side Render，简写CSR）来说
    - 浏览器拿到的只是包含JavaScript代码的HTML文件
    - 换句话，在浏览器渲开始渲染出页面之前，需要动态创建HTML标签
    - 所以，有白屏现象。为什么会出现白屏？
        - 因为在自上而下的解析html时候，在解析执行js时候，浏览器渲染内核会停止渲染，而往往样式和元素都是js动态添加进去的。

从SSR以及CSR的时序图里，我们可以发现，这两种渲染方式还是有蛮多共同点的：
- 都需要下载React的
- 都需要经历虚拟DOM构建过程
- 都需要（给页面元素）绑定事件来增强页面的可交互性

> 前后端同构：前端MVC + web服务

#### 特点
- 可有利于SEO，尤其是门户网站
- 前后端开发逻辑是一起，通过http协议进行通讯
- 部署逻辑可以分别采用同时部署 和 把前端当作静态资源放在nginx上部署处理
- 可以直接渲染出带数据和样式的html页面，在低网速多请求数据的情况下，大大增加用户体验
    - 但是由于react的数据绑定，仍然无法进行交互
- 仅首屏渲染需要经过服务器，开销较小

## 为什么要进行前后端同构

### 分析方案

| 方案       | 开发（代码）逻辑 | 部署逻辑 | 用户体验 | 开发难度 | 性能消耗 | SEO
| ---------- | -------- | -------- | -------- | -------- | -------- |
| 前后端异构 | 混合     | 动静分离 | 好       | 高       | 高       | 可用
| 前后端分离 | 独立     | 动静分离 | 不好     | 中       | 中       | 不可用
| 前后端同构 | 混合     | 动静分离 | 好       | 高       | 低       | 可用

### 选择前端后同构的原因
- 性能优化，增强用户体验：利用Node处理IO密集型的优势，实现首屏服务端页面渲染
- 增加前端工程师产能：技术积累不局限于页面交互复制粘贴，在业务、部署运维等方面更多可用有更多的接触和空间
- 提高效率：降低前端工程师 与 运维人员 沟通成本后提高生产效率，在前端的理解下，更好地处理静态资源

## 如何架构和使用前端后同构

> 前端后同构的本质：是一个node服务，提供服务器端渲染功能，不参与api、静态资源等相关的操作。得到首屏后，进行前端静态资源的请求（向nginx）和加载，通过客户端渲染提供服务。

```
git clone https://github.com/garry-mark/my-react-app.git @types

cd my-react-app/ssr-service

npm install

# 启动项目
npm start

```

### 目录结构
```
- ssr-service
    - .vscode                               # 记录项目vscode特征
    - config                                # typescript和webpack配置文件
        - webpack.base.conf.ts              # webpack公共配置，配置了公共的webpack的loader和resolve相关配置
        - webpack.browser.dev.conf.ts       # 浏览器开发阶段
        - webpack.browser.prod.conf.ts      # 浏览器生产阶段
        - webpack.dll.conf.ts               # 第三方依赖打包
        - webpack.node.base.conf.ts         # node公共配置：主要使用isomorphic-style-loader，与node在webpack打包的相关配置（其实node并不需要webpack打包）
        - webpack.node.dev.conf.ts          # node开发配置
        - webpack.node.prod.conf.ts         # node生产配置
        - webpack.prod.conf.ts              # 同构工程生产环境配置
        - tsconfig.browser.json
        - tsconfig.server.json
    - dist                                  # 生成部署的目录
        - server
            - main.js                       # 生成压缩后的node，包含css，react组件等资源
        - static
            - css
                - styles.css
                - styles.css.gz
            - js
                - main.js
                - main.js.gz
            - vendor
                - vendor.dll.js
                - vendor.dll.js.gz
            - favicon.ico
            - favicon.ico.gz
            - index.html
            - index.html.gz
    - log                                   # 服务日志：包含访问、操作、错误日志的记录
    - node_module                           # node依赖
    - src
        - api                               # （待实现）对service的封装，node服务自动生成
        - agent                             # 基于axios的http-client
            - broser-agent.ts
            - index.ts
            - server-agent.ts
        - browser                           # 基于react全家桶前端工程目录
            - actions                       # redux中的action，包含改变当前store中state的同步action，和发送请求的异步action
                - aboutme.ts
                - Action.ts
            - components                    # 公共组件
                - HOC
                    - withStyles.tsx
                - layout
                - loading
                - status
                    - index.tsx
                    - notFound.tsx
                    - redirect.tsx
                    - serviceErroe.tsx
            - const
                - actionTypes.ts
                - index.ts
            - pages
                - about-me
                    - about-me.css
                    - about-me.css.d.ts
                    - about-me.tsx          # UI组件
                    - index.tsx             # 容器组件
                - app
                    - index.tsx             # 布局框架入口，包含Layout下的布局组件以及router相关实现
                - router.config.ts          # 静态路由配置
            - reducers
                - abouteme.ts
            - store
                - index.ts                  # redux中的store，提供getStore方法，服务端和浏览器会有不同处理
            - theme
                - _mixins.css               # 混合类
                - _reset.css                # 基于normalize.css的样式重设
                - _var.css                  # 变量
                - global.css                # 全局样式
            - index.tsx
        - model
            - Me.ts                         # 前后端公用的数据模型（但仅前端使用，后面会修改）
        - server
            - middleware
                - handleError.ts            # 程序健壮性处理
                - log4js.ts                 # 日志记录
                - serverSideRender.tsx      # 服务器端渲染中间件
            - app.ts                        # 服务端中间件挂载
            - index.dev.ts                  # 开发环境入口：包含webpack开发环境服务中间件和热替换中间件
            - index.prod.ts                 # 生成入口
        - utils
        - views
            - index.html                    # 开发环境下根据模版生成的html
            - index.tmpl.html               # 单页面模版文件
            - 40x.html
            - 50x.html
    - static                                # 其他静态资源文件
         - favicon.ico
    - typings
    - .babelrc
    - Dockerfile
    - ecosystem.config.js                   # pm2启动文件
    - package.json                          # npm包配置文件
    - tsconfig.json                         # 项目typescript配置文件（有点多余）
    - tslint.json                           # tslint配置文件
    - vendor-manifest.json                  # 第三方依赖映射文件

```
### 开发阶段

> 目的：完成前端开发自动化，即自动打包与重启

#### 从npm start开始了解如何设计

从本质上看同构工程是一个node服务，所以npm start启动的是一个node服务

```json
{
"start": "npm run dev",
"dev": "npm-run-all --parallel dev:**",
"dev:serve": "nodemon ./dist/server/main.js --watch 'dist/server/**/*.*' ",
"dev:build": "webpack --watch --config ./config/webpack.node.dev.conf.ts",

// 另外方案
"dev": "nodemon --watch 'src/server/**/*.*' --exec 'ts-node' src/server/index.dev.ts",
}
```

#### 服务端代码修改后自动重启
npm start 实际上是dev的别名（比npm run dev短），dev使用npm-run-all并行执行dev:serve和dev:build两个脚本
- dev:build 主要是使用webpack打包，生成开发阶段的服务端代码，并持续监听服务端代码而重新打包
- dev:serve 主要是使用nodemon 启动打包后的服务端代码，并且监听打包后的服务端代码，重启服务

#### 前端代码热替换
打包后的服务端代码，是以server/index.dev.ts为入口文件，里面包含koa-webpack

``` typescript
import * as path from 'path';
import * as fs from 'fs';
import * as koaWebpack from 'koa-webpack';
import devConfig from '../../config/webpack.browser.dev.conf';
import * as config from '../../app.config';

import app from '@/server/app';

const publicPath = (devConfig.output && devConfig.output.publicPath) || '';
const pathName = (devConfig.output && devConfig.output.path) || '';
const port = process.env.PORT || config.app[process.env.NODE_ENV].port;

// koa-webpack会以浏览器webpack配置（webpack.browser.dev.conf）进行前端打包，并且把生成的资源文件放在内存中
koaWebpack({
  config: devConfig,
  devMiddleware: {
    publicPath,
    serverSideRender: true
  }
}).then((middleware) => {
  // 挂载koa-webpack-Dev-server
  app.use(middleware);

  app.use(async (ctx: any, next: any) => {
    // 在内存中获取生成的index.html文件，该文件包含对开发阶段，前端资源的连接以及热替换相关代码
    const rs = await middleware.devMiddleware.fileSystem.createReadStream(
      path.resolve(pathName, 'index.html')
    );
    // 将该文件输出到views下
    const ws = await fs.createWriteStream(
      path.resolve(__dirname, '../views/index.html')
    );
    await rs.pipe(ws);
    await next();
  });

});

app.listen(port, () => {
  logger.trace(
    `\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
  );
});

```

#### 思考？
- 是否可以不适用webpack打包生成的js作为服务器启动文件
    - 可以，直接使用ts-node运行 nodemon监听
    - 但是，需要解决同构项目模块化样式文件问题，需要自己写一个hooks

### 生产阶段

> 目的：提供高可用服务与docker镜像文件

```json
{
"build": "npm-run-all --parallel build:app build:dll",
"build:app": "webpack --config ./config/webpack.prod.conf.ts",
"build:dll": "webpack --config ./config/webpack.dll.conf.ts",
"serve": "pm2 start ./ecosystem.config.js",
"stop": "pm2 stop ./dist/server/main.js",
"build:docker": "docker build -t ssr-service .",
"docker:run": "docker run -d -p 80:4000 ssr-service",
}
```
#### 第三方依赖打包

使用webacpk的dll-plugin对第三方依赖进行打包（如React等），生成manifest.json文件和vendor.js，再使用DllReferencePlugin读取预先打包文件，有以下优点：
- 因为第三方依赖是长期稳定的，不需要根据应用业务代码变化而变化，可以单独打包，并且做缓存处理
- 另外，预编译可以增强webpack的打包速度

#### 前端资源打包（非重点）
- 使用按模块划分、压缩、混淆、gz、hash名缓存等方式优化
- 后续，使用nginx实现静态资源服务部署

#### 使用pm2和docker

### 实现细节

#### 从访问路径体现实现细节

访问http://localhost:4000/aboutme为例子

##### 首屏渲染

从浏览器地址栏输入http://localhost:4000/aboutme

SSR的redux、axios、router与csr的都不是同一个

![SSR-timer](https://github.com/garry-mark/markdownImage/raw/master/ssr/SSR-timer.jpg)

```typescript
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { StaticRouter, StaticRouterContext } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import RouteConfig from '@/browser/pages/router.config';

import { getStore } from '@/browser/store';
import { Provider } from 'react-redux';

interface WithStyleStaticRouterContext extends StaticRouterContext {
  styles?: string[];
  referUrl?: string;
}

function matchRouteConifg(url: string) {

  const branch = matchRoutes(RouteConfig, url);
  const withParamsDataLoaders = branch
    .map((route: any) => {
      return route.route.loadData ? { loadData: route.route.loadData, params: route.match.params } : null;
    })
    .filter((route) => route);
  return withParamsDataLoaders;
}

export default async (ctx: any, next: any) => {
  // 进入中间件后
  // 首先校验是否匹配静态路由，如果匹配在静态路由
  // 从路由中获取相关的所有Dataloader方法（因为存在路由嵌套，所以有多个）
  const withParamsDataLoaders = matchRouteConifg(ctx.url);
  const regexp = /\w+\.\w+$/;
  const store = getStore();

  // 判断路由是否属于非扩展名结尾，过滤资源文件请求
  if (!regexp.test(ctx.url)) {
    // 设置一个上下文用于在路由对应组件渲染时候，记录组件的样式
    let context: WithStyleStaticRouterContext = { styles: [] };
    // 遍历DataLoaders，传入服务器端的store，执行loadData方法
    const promiseifyDataLoaders = withParamsDataLoaders
      .map((dataLoader: any) => dataLoader.loadData(store, dataLoader.params));

    try {
      // 等待所有loadData方法方法执行完毕后，即所有数据都设置到store后
      // 由于SSR是同步渲染，所有只要有一个数据获取失败，都会放弃SSR
      // 除非用户关闭浏览器脚本功能，否则该渲染最终走CSR
      await Promise.all(promiseifyDataLoaders);
    } catch (e) {
      // 如果SSR失败，会记录范围此次ssr的url便于页面重新尝试。只有不支持CSR 情况下出现
      context = { ...context, referUrl: ctx.url };
      // 把页面只向重新尝试页面
      ctx.url = '/service-error';
      ctx.logger.error(`SSR Fail ${e.config && e.config.url} ( ${e.message} )`);
    }

    // 根据相关的url匹配对应的路由组件和已经预加载数据的store进行静态渲染，生成html形式的字符串
    const markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.url} context={context}>
          {renderRoutes(RouteConfig)}
        </StaticRouter>
      </Provider>
    );

    // 将store记录到window下便于CSR时候获得以及初始化的store
    // 样式放到html中，是加载页面时候可以先出样式
    const template = {
      root: markup,
      state: JSON.stringify(store.getState()) || '',
      styles: context.styles ? context.styles.join('') : ''
    };

    // 根据渲染路由时候，各个路由设置的返回码，控制http状态码
    switch (context.statusCode) {
      default:
        await ctx.render('index', template);
        break;
      case 301:
      case 302:
        ctx.status = context.statusCode;
        ctx.redirect(context.url);
        break;
      case 404:
        ctx.status = context.statusCode;
        await ctx.render('index', template);
        break;
    }

  }
  await next();
};

```

##### 首屏渲染后的客户端渲染

节流判断：由于以及进行预加载数据store中有数据存在，在react完成加载可以交互的过程中会出发componentMounted，即一般数据加载的生命周期，这时候需要判断是否已经有数据，再进行数据获取。

首屏渲染只加载对应模块组件的数据，其他页面的数据需要在其他模块CSR时候加载

#### 快速上手体验实现细节

以aboutme模块为例子

##### 设置静态路由

```
import { RouteConfig } from 'react-router-config';
import App from '@/browser/pages/app';
import AboutMe from '@/browser/pages/about-me';
import ArticleDetails from '@/browser/pages/article';
import ArticleList from '@/browser/pages/article-list';

import NotFound from '@/browser/components/status/notFound';
import ServiceError from '@/browser/components/status/serviceError';

export interface DigitizedRouteConfig extends RouteConfig {
  loadData?: (store: any, params: any) => void;
  path?: string;
  routes?: DigitizedRouteConfig[];
}

const RouteConfig: DigitizedRouteConfig[] = [
  {
    component: App,
    routes: [
      {
        component: AboutMe,
        path: '/aboutme',
        // 暴露容器组件的loadata方法到此，方便路由匹配时获取
        loadData: AboutMe.loadData
      },
      {
        component: ServiceError,
        path: '/service-error'
      },
      {
        component: NotFound
      }
    ]
  }
];

export default RouteConfig;
```
##### 编写容器组件

react中容器组件都是通过高阶组件的方式为UI组件提供相关增强
一般组件都包含Loadable、connect、withRouter、widthStyle等这几个

其中widthStyle封装了_getCss，在webpack打包是赋值给Style对象的方法用于获取原生css字符串，这是为什么node端使用webpack打包

如果使用其他方案在node中添加css-module钩子（原理增强requried处理其他后缀名功能），但是由于css-module钩子没有提供_getCss类似的方法，所有使用webpack打包。因为避免使用webpack打包，有助于使用原生requried模块加载的优点，即无需把样式打进最后的js文件中。

```
import * as React from 'react';
import { withRouter } from 'react-router';

import actions from '@/browser/actions/aboutme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from '@/browser/components/HOC/withStyles';
import * as style from './about-me.css';

import Loading from '@/browser/components/loading/';
import * as Loadable from 'react-loadable';

// 实现懒加载和loading效果
const LoadableAboutMe = Loadable({
  loader: () => import('@/browser/pages/about-me/about-me'),
  loading: Loading
});

//
const ConnectAboutMe = connect(mapStateToProps, mapDispatchToProps)(LoadableAboutMe);

class AboutMe extends React.Component<any, any> {
  // SSR获取数据的核心
  // 为什么写在这里，因为方便绑定每个模块时候，在静态路由中导出
  public static loadData(store: any): void {
    return store.dispatch(actions.getAboutme());
  }

  public render() {
    // react中使用自定义的高阶组件时，需要注意props的透传
    return <ConnectAboutMe {...this.props} />;
  }
}

function mapStateToProps(state: any) {
  return { aboutme: state.aboutme };
}

function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(actions, dispatch) };
}

// why withStyles on here?
// because data and style muse be load before LoadableComponent
export default withStyles(style)(withRouter(AboutMe));

```

##### 编写UI组件
```
import * as React from 'react';
import * as style from './about-me.css';

class AboutMe extends React.Component<any, any> {

  public componentDidMount() {
    // 节流判断
    if (this.props && this.props.aboutme === null) { this.getAboutme(); }
  }

  public render() {
    const { aboutme } = this.props;
    const initAboutme = {
      avatar: '',
      chineseName: '',
      username: '',
      birthday: '',
      degree: '',
      company: '',
      jobTitle: '',
      hobby: [],
      email: ''
    };
    const {
      avatar = 'https://via.placeholder.com/400x400',
      chineseName = '麦健荣',
      username = '',
      birthday = '1994-12-31',
      degree = 'Computer',
      company = 'Chinatelecom',
      jobTitle = 'Front-end engineer',
      hobby = [
        'bodybuilding',
        'swimming',
        'cooking',
        'surfing internet',
        'watching movie'
      ],
      email = ''
    } =
      aboutme || initAboutme;

    const [lastName, firstName] = username.split(' ');

    return (
      <section className={style.aboutMe}>
        <h2>About Me</h2>
        <h3>Base Info</h3>
        <p>
          My name is{' '}
          <a href={avatar} target="_blank" rel="noopener noreferrer">
            {lastName} {firstName}
          </a>{' '}
          ({chineseName}). You can call me {lastName}. I was born in{' '}
          {birthday && birthday.split('-')[0]}s.
        </p>
        <p>
          I have an {degree} degree. Now I am employed by {company} as an{' '}
          {jobTitle}.
        </p>
        <p>In spare time, I like {hobby && hobby.join(', ')}.</p>
        <h3>Concact Me</h3>

        <p>
          email: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </section>
    );
  }
  private getAboutme = () => {
    const { actions } = this.props;
    actions.getAboutme().catch(() => {
      this.props.history.push('/service-error');
    });
  }
}

export default AboutMe;
```
### 优化空间
- 单元测试、集成测试、压力测试
- 开发环境监听混乱问题，考虑ts-node方案
- 生产环境node编译，考虑单纯tsc
- 热替换模块优化
- tsconfig乱混
- tslint无法使用
