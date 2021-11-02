import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../Validator/Validator';
import Modal from '../Modal/Modal';

const Profile = ({profileEditFn, signOut, modal, responseStatus}) => {
  const validateForm = useFormWithValidation();
  const contextUser = useContext(CurrentUserContext);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [userName, setUserName] = useState(contextUser.name);
  const [userEmail, setEmail] = useState(contextUser.email);
  const [editing, setEditing] = useState(false);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    validateForm.handleChange(e);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateForm.handleChange(e);
  }
  const handleSubmitForm = (e) => {
    e.preventDefault();
    profileEditFn({
      name: userName,
      email: userEmail
    })
  }
  const handleEditProfile = (e) => {
    e.preventDefault();
    setEditing(true);
  }
  const cancelEditing = (e) => {
    e.preventDefault();
    setEditing(false);
  }
  useEffect(() => {
    contextUser.name !== undefined && setUserName(contextUser.name);
    contextUser.email !== undefined && setEmail(contextUser.email);
    setEditing(false);
  }, [contextUser]);

  useEffect(() => {
    if(userName !== contextUser.name || userEmail !== contextUser.email) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [userName, userEmail, contextUser.name, contextUser.email])

  useEffect(() => {
    if(!editing) {
      setUserName(contextUser.name)
      setEmail(contextUser.email)
    }
  }, [editing]);
  return (
    <>
    <section className="profile">
      <div className="profile__content">
        <form action="#" className="profile__form" id="profile__edit" onSubmit={handleSubmitForm}>
          <fieldset className="profile__fieldset">
            <legend className="profile__legend">
              <h2 className="profile__title">Привет, {contextUser.name}</h2>
            </legend>
            <div className="profile__inputs">
              <span className="profile__input-title">Имя</span>
              <input
                type="text"
                required
                className="profile__input profile__input_name"
                minLength="2"
                maxLength="30"
                name="name"
                placeholder="Введите имя"
                value={userName}
                onChange={handleUserNameChange}
                readOnly={editing ? null : 'readonly'} />
              <span className={`profile__error profile__error_name ${editing ? '' : 'profile__error_off'}`}>{validateForm.errors.name}</span>
              <hr className="profile__line" />
              <span className="profile__input-title">E-mail</span>
              <input
                type="email"
                required
                className="profile__input profile__input_email"
                placeholder="Введите почту"
                value={userEmail}
                onChange={handleEmailChange}
                pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                readOnly={editing ? null : 'readonly'}
                name="email"
                />
                <span className={`profile__error profile__error_email ${editing ? '' : 'profile__error_off'}`}>{validateForm.errors.email}</span>
            </div>
          </fieldset>
          <span className="profile__notification-text">При обновлении профиля произошла ошибка.</span>
          {editing ? (
            <>
              <button
              className={`profile__btn_submit ${validateForm.isValid && !btnDisabled ? 'profile__btn_submit-active' : ''}`}
              disabled={validateForm.isValid && !btnDisabled ? '' : 'disabled'}
              type="submit"
              form="profile__edit">Сохранить</button>
              <button
                className={`${!editing ? "profile__signout_hide" : "profile__signout_show"}`}
                type="button"
                onClick={cancelEditing}>
                Отменить
              </button>
            </>
          ) : (
            <button className="profile__btn" type="button" onClick={handleEditProfile}>Редактировать</button>
          )}
          <button
            className={`${editing ? "profile__signout_hide" : "profile__signout_show"}`}
            type="button"
            onClick={signOut}>
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </section>
    <Modal isActive={modal} responseStatus={responseStatus} />
    </>
  )
}

export default Profile;