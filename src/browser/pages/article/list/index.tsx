import * as style from './article-list.css';

import * as React from 'react';

import ArticleListItem from './list-item';

import ArticleListFilter from './list-filter';

import { Article } from '@/model/Articles';

import { PAGE_SIZE } from '@/const';

interface State {
	articleList: Article[];
	pageSize: number;
	pageCurrent: number;
}

class ArticleList extends React.Component<any, State> {
	public state: State = {
		articleList: [
			{
				id: 1,
				category: { id: 1, name: 'JS' },
				title: 'Hello world',
				content: 'Hello world',
				pageview: 2,
				like: 11,
				createTime: Date.now(),
				updateTime: Date.now()
			},
			{
				id: 2,
				category: { id: 1, name: 'JS' },
				title: 'Hello world agained',
				content: 'Hello world agained',
				pageview: 99,
				like: 23,
				createTime: Date.now(),
				updateTime: Date.now()
			}
		],
		pageSize: PAGE_SIZE,
		pageCurrent: 1
	};

	public getMore = () => {
		const newPageNumber = this.state.pageCurrent + 1;
		this.getArticleList({ pageCurrent: newPageNumber });
		this.setState({ pageCurrent: newPageNumber });
	}

	public getArticleList(options = {}) {
		console.log(options);
		// options = {
		// 	pageSize: options.pageSize,
		// 	pageCurrent: options.pageCurrent,
		// 	order: options.order || '',
		// 	categoryId: options.categoryId || ''
		// };
		// dispatch
	}

	public render() {
		// const {} = this.props;
		const { articleList } = this.state;
		return (
			<section>
				<ArticleListFilter getArticleList={this.getArticleList} />
				{articleList.map((item) => (
					<ArticleListItem key={item.id} article={item} />
				))}
				<button onClick={this.getMore} className={style.more}>
					查看更多
				</button>
			</section>
		);
	}
}

export default ArticleList;
