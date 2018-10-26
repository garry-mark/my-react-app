import * as style from './article-filter.css';

import * as React from 'react';

import { ORDER_BY_CREATETIME, ORDER_BY_PAGEVIEW } from '../../../../const';

interface ArticleListFilterState {
	activeOrder: string;
}

class ArticleListFilter extends React.Component<any, ArticleListFilterState> {
	public state: ArticleListFilterState = {
		activeOrder: ORDER_BY_CREATETIME
	};

	public changeListOrder = (newOrder: any) => {
		console.log(newOrder);
		this.setState({ activeOrder: newOrder });
	}

	public render() {
		// const {} = this.props;
		const { activeOrder } = this.state;
		return (
			<div className={style.articleListFilter}>
				<button
					className={activeOrder === ORDER_BY_CREATETIME ? style.active : ''}
					onClick={() => this.changeListOrder(ORDER_BY_CREATETIME)}
				>
					最新
				</button>
				<button
					className={activeOrder === ORDER_BY_PAGEVIEW ? style.active : ''}
					onClick={() => this.changeListOrder(ORDER_BY_PAGEVIEW)}
				>
					最Top
				</button>
			</div>
		);
	}
}

export default ArticleListFilter;
