import React, {useState, useEffect} from 'react';

const Modal = ({isActive, responseStatus}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(responseStatus === 409) {
      setMessage("Пользователь с таким email уже существует")
    } else if(responseStatus === 400) {
      setMessage("При регистрации пользователя произошла ошибка")
    } else if(responseStatus === 401) {
      setMessage("Неправильный логин или пароль")
    } else if(responseStatus === 200) {
      setMessage('Данные успешно сохранены')
    } else if(responseStatus === 201) {
      setMessage('Вы успешно зарегистрировались')
    }
  }, [responseStatus])
 
  return (
    <section className={`modal ${isActive ? "modal_active" : ""}`}>
      <div className={`${responseStatus === 200 || responseStatus === 201 ? 'modal__content_success' : 'modal__content'}`}>
        <p className="modal__message">{message}</p>
      </div>
    </section>
  )
}

export default Modal;