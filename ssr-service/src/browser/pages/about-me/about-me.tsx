import * as React from 'react';
import * as style from './about-me.css';

class AboutMe extends React.Component<any, any> {

  public componentDidMount() {
    if (this.props && this.props.aboutme === null) { this.getAboutme(); }
  }

  public render() {
    const { aboutme } = this.props;
    const initAboutme = {
      avatar: '',
      chineseName: '',
      username: '',
      birthday: '',
      degree: '',
      company: '',
      jobTitle: '',
      hobby: [],
      email: ''
    };
    const {
      avatar = 'https://via.placeholder.com/400x400',
      chineseName = '麦健荣',
      username = '',
      birthday = '1994-12-31',
      degree = 'Computer',
      company = 'Chinatelecom',
      jobTitle = 'Front-end engineer',
      hobby = [
        'bodybuilding',
        'swimming',
        'cooking',
        'surfing internet',
        'watching movie'
      ],
      email = ''
    } =
      aboutme || initAboutme;

    const [lastName, firstName] = username.split(' ');

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
          {birthday && birthday.split('-')[0]}s.
        </p>
        <p>
          I have an {degree} degree. Now I am employed by {company} as an{' '}
          {jobTitle}.
        </p>
        <p>In spare time, I like {hobby && hobby.join(', ')}.</p>
        <h3>Concact Me</h3>

        <p>
          email: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </section>
    );
  }
  private getAboutme = () => {
    const { actions } = this.props;
    actions.getAboutme().catch(() => {
      this.props.history.push('/service-error');
    });
  }
}

export default AboutMe;
