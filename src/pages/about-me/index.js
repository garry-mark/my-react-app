import './about-me.scss';
// @flow
import * as React from 'react';

type Props = {};

type Me = {
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

type State = {
	me: Me
};

class AboutMe extends React.Component<Props, State> {
	static defaultProps: Props = {};
	state: State = {
		me: {
			avatar: 'https://via.placeholder.com/400x400',
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
		}
	};

	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		const { me } = this.state;
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
		} = me;
		return (
			<section styleName="about-me">
				<h2>About Me</h2>
				<h3>Base Info</h3>
				<p>
					My name is{' '}
					<a href={avatar} target="_blank">
						{lastName} {firstName}
					</a>{' '}
					({chineseName}). You can call me {lastName}. I was born in{' '}
					{birthday.split('-')[0]}s.
				</p>
				<p>
					I have an {degree} degree. Now I am employed by {company} as an{' '}
					{jobTitle}.
				</p>
				<p>In spare time, I like {hobby.join(', ')}.</p>
				<h3>Concact Me</h3>

				<p>
					email: <a href={`mailto:${email}`}>{email}</a>
				</p>
			</section>
		);
	}
}

export default AboutMe;
