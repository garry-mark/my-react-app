import './style.scss';
// @flow
import * as React from 'react';
import ArticlesListItem from '../list/list-item/';
import ArticlesListFilter from '../list/list-filter/';
type Props = {};

type State = {};

class ArticlesList extends React.Component<Props, State> {
	static defaultProps: Props = {};
	state: State = {};

	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		const {} = this.props;
		const {} = this.state;
		return (
			<section>
				<ArticlesListFilter />
				<ul>
					<li>
						<ArticlesListItem />
					</li>
				</ul>
			</section>
		);
	}
}

export default ArticlesList;
