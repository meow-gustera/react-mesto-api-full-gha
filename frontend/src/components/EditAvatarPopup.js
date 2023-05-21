import PopupWithForm from './PopupWithForm.js';
import { useRef, useEffect } from 'react';


function EditAvatarPopup(props) {
  const avatarRef = useRef('');

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="change_avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="url" className="popup__input popup__input__change_avatar" placeholder="Ссылка" id="popup__input_change_avatar" name="avatar" required ref={avatarRef} />
      <span className="popup__input-span-error-active popup__input-place-error" id="popup__input_change_avatar-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;