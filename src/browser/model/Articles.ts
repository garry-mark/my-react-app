// @flow
import { Category } from './Category';

export interface Article {
	id: number;
	category: Category;
	title: string;
	content: string;
	pageview: number;
	like: number;
	createTime: number;
	updateTime: number;
}
