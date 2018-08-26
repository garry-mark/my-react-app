import './style.scss';
// @flow
import * as React from 'react';

type Props = {};

type State = {};

class ArticlesListFilter extends React.Component<Props, State> {
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
				<button>最新</button>
				<button>最Top</button>
			</div>
		);
	}
}

export default ArticlesListFilter;
