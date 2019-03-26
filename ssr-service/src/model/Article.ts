// import Category from './Category';

export default interface Article {
  id: number;
  categoryName: string;
  title: string;
  content: string;
  pageView: number;
  like: number;
  createTime: number;
  updateTime: number;
}
