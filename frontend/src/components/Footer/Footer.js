import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
          <p className="footer__year">&#169; 2023</p>
          <ul className="footer__items">
            <li className="footer__item">
              <Link to="https://practicum.yandex.ru/" target="_blank" className="footer__link link">Яндекс.Практикум</Link>
            </li>
            <li className="footer__item">
              <Link to="https://github.com/NataliaRom1" target="_blank" className="footer__link link">Github</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
