import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/logo.png'
import Modal from '../Modal/Modal';
import { useFormWithValidation } from '../Validator/Validator';

const Login = ({handleSubmit, responseStatus, modal}) => {
  const validateForm = useFormWithValidation();
  const handleChangeEmail = (e) => {
    validateForm.handleChange(e);
  };

  const handleChangePassword = (e) => {
    validateForm.handleChange(e);
  };
  const submit = (e) => {
    e.preventDefault();
    handleSubmit(validateForm.values);
  };
  return (
    <section className="login">
        <div className="content login__content">
          <form action="#" name="login" className="login__form" onSubmit={submit}>
            <NavLink to="/" className="login__logo">
              <img src={logo} className="login__logo-img" alt="logo" />
            </NavLink>
            <fieldset className="login__fieldset">
              <legend>
                <h2 className="login__title">Рады видеть!</h2>
              </legend>
              <p className="login__input-title">E-mail</p>
              <input
              type="email"
              className="login__input login__input_email"
              required
              name="email"
              placeholder="Введите email"
              autoComplete="username"
              onChange={handleChangeEmail}
              pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
              />
              <span className="login__error login__error_email">{validateForm.errors.email}</span>
              <p className="login__input-title">Пароль</p>
              <input
              type="password"
              className="login__input login__input_password"
              required
              name="password"
              minLength="8"
              placeholder="Введите пароль"
              autoComplete="current-password"
              onChange={handleChangePassword}
              />
              <span className="login__error login__error_password">{validateForm.errors.password}</span>
            </fieldset>
            <button type="submit" disabled={`${validateForm.isValid ? '' : 'disabled'}`} className={`login__btn ${validateForm.isValid ? 'login__btn_active' : ''}`}>Войти</button>
          </form>
          <span className="login__signup-text">Ещё не зарегистрированы?&nbsp;
            <Link to="/signup" className="login__signup-btn">Регистрация</Link>
          </span>
        </div>
        <Modal isActive={modal} responseStatus={responseStatus} />
    </section>
  )
}

export default Login;