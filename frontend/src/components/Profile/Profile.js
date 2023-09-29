import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../hooks/useFormValidation';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const { formValues, setFormValues, formErrors, isFormValid, handleChange, resetForm } = useFormValidation();

  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormValues({
      name: currentUser.name,
      email: currentUser.email
    })
  }, [currentUser, resetForm]);


  function handleSubmit(e) {
    e.preventDefault();

    setIsEditing(!isEditing);
    setInputsDisabled(!inputsDisabled);

    props.onUpdateUser(formValues);
    return formValues
  }

  function handleEditUser() {
    props.setInfo('');
    setInputsDisabled(!inputsDisabled);
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    props.setInfo('')
  }, [])

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit} name="form-profile" method="get" noValidate>

        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__input-wrapper profile__input-wrapper_border_grey">
          <p className="profile__input-title">Имя</p>
          <input
            value={formValues.name || ""}
            onChange={handleChange}
            disabled={inputsDisabled}
            type="text"
            className="profile__input"
            name="name"
            required
            id="name"
          />
        </div>
        <span className="profile__input-error profile__input-error_name" id="name-input-error">{formErrors.name}</span>
        <div className="profile__input-wrapper">
          <p className="profile__input-title">Email</p>
          <input
            value={formValues.email || ""}
            onChange={handleChange}
            disabled={inputsDisabled}
            type="email"
            className="profile__input"
            name="email"
            required
            id="email"
          />
        </div>
        <span className="profile__input-error profile__input-error_email" id="email-input-error">{formErrors.email}</span>
        <p className="auth__info">{props.info}</p>
        {isEditing ?
          <>
            <button className={`${!isFormValid || (currentUser.name === formValues.name && currentUser.email === formValues.email) ? 'profile__button_disabled' : ''} button profile__button `} type="submit"
              disabled={!isFormValid || (currentUser.name === formValues.name && currentUser.email === formValues.email)}>Сохранить</button>
          </>
          :
          <ul className="profile__links-container">
            <li className="profile__link link" onClick={handleEditUser}>Редактировать</li>
            <li className="profile__link link profile__link_color_red" onClick={props.onSignOut}>Выйти из аккаунта</li>
          </ul>}

      </form>
    </section>
  )
}

export default Profile;
