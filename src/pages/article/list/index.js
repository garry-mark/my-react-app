import './article-list.scss';
// @flow
import * as React from 'react';
import ArticleListItem from '../list/list-item/';
import ArticleListFilter from '../list/list-filter/';
import type { Article } from '@/model/Article';
import { PAGE_SIZE } from '@/const';

type Props = {};

type State = {
	articleList: Array<Article>,
	pageSize: number,
	pageCurrent: number
};

class ArticleList extends React.Component<Props, State> {
	static defaultProps: Props = {};
	state: State = {
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

	constructor(props: Props) {
		super(props);
	}

	getMore = () => {
		const newPageNumber = this.state.pageCurrent + 1;
		this.getArticleList({ pageCurrent: newPageNumber });
		this.setState({ pageCurrent: newPageNumber });
	};

	getArticleList(options = {}) {
		options = {
			pageSize: options.pageSize,
			pageCurrent: options.pageCurrent,
			order: options.order || '',
			categoryId: options.categoryId || ''
		};
		// dispatch
	}

	render() {
		const {} = this.props;
		const { articleList } = this.state;
		return (
			<section>
				<ArticleListFilter getArticleList={this.getArticleList} />
				{articleList.map(item => <ArticleListItem key={item.id} data={item} />)}
				<button onClick={this.getMore} styleName="more">
					查看更多
				</button>
			</section>
		);
	}
}

export default ArticleList;
