import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">

        <li className="portfolio__item">

          <Link to="https://nataliarom1.github.io/how-to-learn/"target="_blank" className="portfolio__item-link link">
            <p className="portfolio__item-text">Статичный сайт</p>
            <button className="portfolio__item-button button">
            </button>
          </Link>
        </li>

        <li className="portfolio__item">
          <Link to="https://nataliarom1.github.io/russian-travel/" target="_blank" className="portfolio__item-link link">
            <p className="portfolio__item-text">Адаптивный сайт</p>
            <button className="portfolio__item-button button"></button>
          </Link>
        </li>

        <li className="portfolio__item">
          <Link to="https://mestonr.nomoredomains.work" target="_blank" className="portfolio__item-link link">
            <p className="portfolio__item-text">Одностраничное приложение</p>
            <button className="portfolio__item-button button"></button>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
