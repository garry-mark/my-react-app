import './style.scss';
// @flow
import * as React from 'react';

type Props = {};

type State = {
	avatar: string,
	chineseName: string,
	firstName: string,
	lastName: string,
	birthday: string,
	degree: string,
	company: string,
	jobTitle: string,
	hobby: string[],
	email: string
};

class AboutMe extends React.Component<Props, State> {
	static defaultProps: Props = {};
	state: State = {
		avatar: 'https://via.placeholder.com/350x150',
		chineseName: '麦健荣',
		firstName: 'Mark',
		lastName: 'Garry',
		birthday: '1994-12-31',
		degree: 'Computer',
		company: 'Chinatelecom',
		jobTitle: 'Front-end engineer',
		hobby: [
			'bodybuilding',
			'swimming',
			'cooking',
			'surfing internet',
			'watching movie'
		],
		email: '763224334@qq.com'
	};

	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		const {
			avatar,
			chineseName,
			firstName,
			lastName,
			birthday,
			degree,
			company,
			jobTitle,
			hobby,
			email
		} = this.state;
		return (
			<section styleName="about-me">
				<h1>About Me</h1>
				<h2>Base Info</h2>
				<img src={avatar} alt="avatar" />
				<p>
					My name is {lastName} {firstName}({chineseName}). You can call me{' '}
					{lastName}. I was born in {birthday}.
				</p>
				<p>
					I have an {degree} degree. Now I am employed by {company} as an{' '}
					{jobTitle}.
				</p>
				<p>In spare time, I like {hobby}.</p>
				<h2>Concact Me</h2>
				<p>
					email:<a href={`mailto:${email}`}>{email}</a>
				</p>
			</section>
		);
	}
}

export default AboutMe;
