import Category from './Category';

export default interface Article {
  id: number;
  category: Category;
  title: string;
  content: string;
  pageview: number;
  like: number;
  createTime: number;
  updateTime: number;
}
