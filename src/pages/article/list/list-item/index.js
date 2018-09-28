import './article-item.scss';
// @flow
import * as React from 'react';
import type { Article } from '@/model/Article';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
	data: Article
};

class ArticleListItem extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		const { data } = this.props;
		const {
			id,
			category,
			title,
			content,
			pageview,
			like,
			createTime,
			updateTime
		} = data;
		return (
			<div styleName="article-list-item">
				<div styleName="article-top">
					<span>
						来自分类 <em>{category.name}</em>
					</span>
					<time>{new Date(createTime).toLocaleString()}</time>
				</div>
				<h3>
					<Link to={`/article/${id}`}> {title}</Link>
				</h3>
				<div styleName="article-content">{content}</div>
				<div styleName="article-bottom">
					<button>
						<FontAwesomeIcon icon="thumbs-up" /> 赞 ({like > 999
							? '999+'
							: like})
					</button>
					<button>
						<FontAwesomeIcon icon="eye" /> 浏览量（{pageview > 999
							? '999+'
							: pageview}）
					</button>
					<button>
						<FontAwesomeIcon icon="share-square" /> 分享
					</button>
				</div>
			</div>
		);
	}
}

export default ArticleListItem;
