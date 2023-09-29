import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import logo from '../../images/logo.svg';
import useFormValidation from '../../hooks/useFormValidation';

function Login(props) {
  const { formValues, formErrors, isFormValid, handleChange, resetForm } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(formValues);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    props.setInfo('')
  }, [])

  return (
    <section className="auth">
      <form className="auth__form" onSubmit={handleSubmit} name="form-register" method="get" noValidate>
        <Link to="/" className="auth__logo-link link">
          <img src={logo} className="auth__logo" alt="Логотип" />
        </Link>
        <h2 className="auth__title">Рады видеть!</h2>
        <p className="auth__input-title">Email</p>
        <input
          value={formValues.email || ""}
          onChange={handleChange}
          type="email"
          className="auth__input auth__input_login"
          name="email"
          required
          id="email"
        />
        <span className="auth__input-error auth__input-error_email" id="email-input-error">{formErrors.email}</span>
        <p className="auth__input-title">Пароль</p>
        <input
          value={formValues.password || ""}
          onChange={handleChange}
          type="password"
          className="auth__input auth__input_login"
          name="password"
          required
          id="password-input" />
        <span className="auth__input-error auth__input-error_password" id="password-input-error">{formErrors.password}</span>
        <p className="auth__info">{props.info}</p>
        <button className={`${isFormValid ? '' : "auth__button_disabled"} button auth__button auth__button_login`} type="submit" disabled={!isFormValid ? true : false}>Войти</button>
        <p className="auth__text">Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="auth__link link">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Login;
