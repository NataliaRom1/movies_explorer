import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title lending-title">О проекте</h2>

      <ul className="about-project__items">

        <li className="about-project__item">
          <h3 className="about-project__item-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>

        <li className="about-project__item">
          <h3 className="about-project__item-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>

      </ul>

      <ul className="about-project__terms">

        <li className="about-project__term">
          <h3 className="about-project__term-title about-project__term-title_bgc_black">1 неделя</h3>
          <p className="about-project__term-text">Back-end</p>
        </li>

        <li className="about-project__term">
          <h3 className="about-project__term-title about-project__term-title_bgc_grey">4 недели</h3>
          <p className="about-project__term-text">Front-end</p>
        </li>

      </ul>
    </section>
  );
}

export default AboutProject;