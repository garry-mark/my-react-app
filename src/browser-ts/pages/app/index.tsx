import * as React from 'react';
import * as style from './app.scss';

console.log(style);

class App extends React.Component<any, any> {
	public static defaultProps = {
		styleName: 'app'
	};

	public state: any = {};

	constructor(props: any) {
		super(props);
	}
	public render() {
		return <div className="app">123</div>;
	}
}

export default App;
