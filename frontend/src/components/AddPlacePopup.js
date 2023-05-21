import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect } from 'react';


function AddPlacePopup(props) {
  const [place, setPlace] = useState('');
  const [url, setPlaceUrl] = useState('');

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeUrl(e) {
    setPlaceUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(place, url);
  };

  useEffect(() => {
    setPlace('');
    setPlaceUrl('');
  }, [props.isOpen]);

  return (
    <PopupWithForm name="add_place" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text" className="popup__input popup__input_data_place" placeholder="Название" id="popup__input_data_place" name="name" minLength="2" maxLength="30" required onChange={handleChangePlace} value={place ?? ''} />
      <span className="popup__input-span-error-active popup__input-place-error" id="popup__input_data_place-error"></span>
      <input type="url" className="popup__input popup__input_data_link" placeholder="Ссылка на картинку" id="popup__input_data_link" name="link" required onChange={handleChangeUrl} value={url ?? ''} />
      <span className="popup__input-span-error-active popup__input-link-error" id="popup__input_data_link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;