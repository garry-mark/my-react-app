import './articles-list.scss';
// @flow
import * as React from 'react';
import ArticlesListItem from '../list/list-item/';
import ArticlesListFilter from '../list/list-filter/';
import type { Articles } from '@/model/Articles';
import { PAGE_SIZE } from '@/const';

type Props = {};

type State = {
	articlesList: Array<Articles>,
	pageSize: number,
	pageCurrent: number
};

class ArticlesList extends React.Component<Props, State> {
	static defaultProps: Props = {};
	state: State = {
		articlesList: [
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
		this.getArticlesList({ pageCurrent: newPageNumber });
		this.setState({ pageCurrent: newPageNumber });
	};

	getArticlesList(options = {}) {
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
		const { articlesList } = this.state;
		return (
			<section>
				<ArticlesListFilter getArticlesList={this.getArticlesList} />
				{articlesList.map(item => (
					<ArticlesListItem key={item.id} data={item} />
				))}
				<button onClick={this.getMore} styleName="more">
					查看更多
				</button>
			</section>
		);
	}
}

export default ArticlesList;
