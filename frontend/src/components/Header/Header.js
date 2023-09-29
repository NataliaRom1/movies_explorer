import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  return (
    <header className={`header ${props.loggedIn ? "" : "header-pink"}`}>
      <Link to="/" className="header__logo-link link">
        <img src={logo} alt="Логотип" className="header__logo" />
      </Link>
      <Navigation
        loggedIn={props.loggedIn}
        onBurgerClick={props.onBurgerClick}
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
    </header>
  )
}

export default Header;
