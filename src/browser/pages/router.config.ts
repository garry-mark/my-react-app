import { RouteConfig } from 'react-router-config';

import * as Loadable from 'react-loadable';

import Loading from '@/components/loading/';

import App from '@/pages/app';

import AboutMe from '@/pages/about-me';

import NotFound from '@/components/status/notFound';

export interface DigitizedRouteConfig extends RouteConfig {
  loadData?: (store: any) => void;
  path?: string;
  routes?: DigitizedRouteConfig[];
}

const ArticleList = Loadable({
  loader: () => import('@/pages/article/list'),
  loading: Loading
});

// const AboutMe = Loadable({
//   loader: () => import('@/pages/about-me'),
//   loading: Loading
// });

const ArticleDetails = Loadable({
  loader: () => import('@/pages/article'),
  loading: Loading
});

const RouteConfig: DigitizedRouteConfig[] = [
  {
    component: App,
    routes: [
      {
        component: ArticleList,
        path: '/home'
      },
      {
        component: AboutMe,
        path: '/aboutme',
        loadData: AboutMe.loadData
      },
      {
        component: ArticleDetails,
        path: '/article/:id'
      },
      {
        component: NotFound
      }
    ]
  }
];

export default RouteConfig;
