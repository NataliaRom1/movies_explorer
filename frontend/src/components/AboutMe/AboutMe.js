import './AboutMe.css';
import { Link } from 'react-router-dom';
import my_photo from '../../images/my-photo.jpg'

function AboutMe() {
  return (
    <section className="about-me">

      <h2 className="about-me__title lending-title">Студент</h2>
      <div className="about-me__container">
        <img src={my_photo} className="about-me__img"></img>
        <div className="about-me__info-container">
          <h3 className="about-me__name">Наталья</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 24 года</p>
          <p className="about-me__text">Я окончила магистратуру "Сколтеха" по специальности "Информационные системы и технологии" и бакалвриат - "Строительство" в УрФУ с отличием. Я прошла курс по Веб-разработке и хочу найти работу разработчиком.</p>
          <Link to="https://github.com/NataliaRom1" target="_blank" className="link">
            <p className="about-me__sign">Github</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
