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
