import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IhelloProps {
	compiler: string;
	framework: string;
}

const Hello = (props: IhelloProps) => <h1>hello world</h1>;

ReactDOM.render(
	<Hello compiler="abc" framework="abc" />,
	document.getElementById('root')
);
