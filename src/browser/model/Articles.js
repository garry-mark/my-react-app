// @flow
import type { Category } from './Category';

export type Article = {
	id: number,
	category: Category,
	title: string,
	content: string,
	pageview: number,
	like: number,
	createTime: number,
	updateTime: number
};
