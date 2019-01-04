import { RouteConfig } from 'react-router-config';

// import * as Loadable from 'react-loadable';

// import Loading from '@/components/loading/';

import App from '@/pages/app';

import AboutMe from '@/pages/about-me';

import ArticleDetails from '@/pages/article';

import NotFound from '@/components/status/notFound';

export interface DigitizedRouteConfig extends RouteConfig {
  loadData?: (store: any, params: any) => void;
  path?: string;
  routes?: DigitizedRouteConfig[];
}

// const ArticleList = Loadable({
//   loader: () => import('@/pages/article-list'),
//   loading: Loading
// });

const RouteConfig: DigitizedRouteConfig[] = [
  {
    component: App,
    routes: [
      // {
      //   component: ArticleList,
      //   path: '/home'
      // },
      {
        component: AboutMe,
        path: '/aboutme',
        loadData: AboutMe.loadData
      },
      {
        component: ArticleDetails,
        path: '/article/:id',
        loadData: ArticleDetails.loadData
      },
      {
        component: NotFound
      }
    ]
  }
];

export default RouteConfig;
