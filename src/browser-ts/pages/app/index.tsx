import * as React from 'react';
import * as style from './app.css';

console.log(style);

class App extends React.Component<any, any> {
	public state: any = {};

	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<div className={style.app}>
				<h1 className="test">abc</h1>
			</div>
		);
	}
}

export default App;
