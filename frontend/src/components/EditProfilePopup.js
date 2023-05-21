import PopupWithForm from './PopupWithForm.js';
import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const [name, setUserName] = useState('');
  const [description, setUserAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setUserName(currentUser.name);
    setUserAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleChangeAbout(e) {
    setUserAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit_profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text" className="popup__input popup__input_data_name" id="popup__input_data_name" placeholder="Имя" name="userName" minLength="2" maxLength="40" required onChange={handleChangeName} value={name ?? ''} />
      <span className="popup__input-span-error-active popup__input-data-name-error" id="popup__input_data_name-error"></span>
      <input type="text" className="popup__input popup__input_data_description" id="popup__input_data_description" placeholder="О себе" name="userDescription" minLength="2" maxLength="200" required onChange={handleChangeAbout} value={description ?? ''} />
      <span className="popup__input-span-error-active popup__input-span-error popup__input-description-error" id="popup__input_data_description-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;