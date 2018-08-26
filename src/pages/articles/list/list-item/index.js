import './style.scss';
// @flow
import * as React from 'react';

type Props = {};

type State = {};

class ArticlesListItem extends React.Component<Props, State> {
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
			<div>
				<h3>标题</h3>
				<p>概要</p>
				<p>时间</p>
			</div>
		);
	}
}

export default ArticlesListItem;
