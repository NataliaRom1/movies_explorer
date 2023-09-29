import './Navigation.css';
import '../Burger/Burger.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import Burger from '../Burger/Burger';

function Navigation(props) {
  const { pathname } = useLocation();

  return (
    <>
      {props.loggedIn ?
        (
          <section className={`navigation ${props.isOpen ? "overlay" : ""}`}>
            <div className={`navigation__wrapper ${props.isOpen ? "navigation__wrapper_burger-opened" : ""}`}>
              <div className={`navigation__menu-container`}>
                {
                  props.isOpen &&
                  <Link to="/" className="link navigation__menu-item">Главная</Link>
                }
                <NavLink
                  to="/movies"
                  className={`link navigation__menu-item ${(pathname === '/movies') ? "navigation__menu-item_active" : ""}`}>
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={`link navigation__menu-item ${(pathname === "/saved-movies") ? "navigation__menu-item_active" : ""}`}>
                  Сохранённые фильмы
                </NavLink>
              </div>

              <div className="navigation__acc-container">
                <Link to="/profile" className="link navigation__acc-item">
                  Аккаунт
                </Link>
                <Link to="/profile" className="link navigation__acc-item">
                  <button className="button navigation__acc-button"></button>
                </Link>
              </div>
            </div>

            <Burger
              isOpen={props.isOpen}
              onBurgerClick={props.onBurgerClick}
              onClose={props.onClose}
            />
          </section>
        )
        :
        (
          <section className="navigation">
            <div className="navigation__link-container">
              <Link to="/signup" className="link navigation__link">
                Регистрация
              </Link>
              <Link to="/signin" className="link navigation__link">
                <button className="button navigation__button">
                  Войти
                </button>
              </Link>
            </div>
          </section>
        )
      }
    </>
  )
}

export default Navigation;
