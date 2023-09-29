import './Promo.css';
import curve from '../../images/promo-curve.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
      <img src={curve} className="promo__img" alt="Картинка кривой"></img>
    </section>
  );
}

export default Promo;
