import * as React from 'react';
import * as style from './about-me.css';

interface Me {
	avatar: string;
	chineseName: string;
	firstName: string;
	lastName: string;
	birthday: string;
	degree: string;
	company: string;
	jobTitle: string;
	hobby: string[];
	email: string;
}

interface State {
	me: Me;
}

class AboutMe extends React.Component<any, State> {
	public state: State = {
		me: {
			avatar: 'https://via.placeholder.com/400x400',
			birthday: '1994-12-31',
			chineseName: '麦健荣',
			company: 'Chinatelecom',
			degree: 'Computer',
			email: '763224334@qq.com',
			firstName: 'Mark',
			hobby: [
				'bodybuilding',
				'swimming',
				'cooking',
				'surfing internet',
				'watching movie'
			],
			jobTitle: 'Front-end engineer',
			lastName: 'Garry'
		}
	};

	public render() {
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
			<section className={style.aboutMe}>
				<h2>About Me</h2>
				<h3>Base Info</h3>
				<p>
					My name is{' '}
					<a href={avatar} target="_blank" rel="noopener noreferrer">
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
