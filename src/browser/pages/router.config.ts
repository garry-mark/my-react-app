import { RouteConfig } from 'react-router-config';

import * as Loadable from 'react-loadable';

import Loading from '@/components/loading/';

import App from '@/pages/app';

const ArticleList = Loadable({
  loader: () => import('@/pages/article/list'),
  loading: Loading
});

const AboutMe = Loadable({
  loader: () => import('@/pages/about-me'),
  loading: Loading
});

const ArticleDetails = Loadable({
  loader: () => import('@/pages/article'),
  loading: Loading
});

const RouteConfig: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        component: ArticleList,
        path: '/home'
      },
      {
        component: AboutMe,
        path: '/aboutme'
      },
      {
        component: ArticleDetails,
        path: '/article/:id'
      }
    ]
  }
];

export default RouteConfig;
