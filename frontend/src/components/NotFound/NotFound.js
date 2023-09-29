import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <h2 className="not-found__header">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__button button" onClick={goBack}>Назад</button>
    </section>
  )
}

export default NotFound;
