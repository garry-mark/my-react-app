import { RouteConfig } from 'react-router-config';

import App from '@/pages/app';

import AboutMe from '@/pages/about-me';

import ArticleDetails from '@/pages/article';

import ArticleList from '@/pages/article-list';

import NotFound from '@/components/status/notFound';

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
        component: ArticleList,
        path: '/home',
        loadData: ArticleList.loadData
      },
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
