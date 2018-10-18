import React from 'react';
import ReactDOM from 'react-dom';

// import 'babel-polyfill';

interface IhelloProps {
	compiler: string;
	framework: string;
}

const Hello = (props: IhelloProps) => <h1>hello world.{props.compiler}</h1>;

ReactDOM.render(
	<Hello compiler="abc" framework="abc" />,
	document.getElementById('root')
);
