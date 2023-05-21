function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__overlay" />
      <div className="popup__container" id={`${props.name}`} >
        <h2 className="popup__title">{`${props.title}`}</h2>
        <form className="popup__form  popup__form_profile" name={`popup_${props.name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__button popup__button_input_save" type="submit">{props.buttonText}</button>
        </form>
        <button className="popup__button popup__button_input_close" type="button" aria-label="Закрыть попап" onClick={props.onClose} />
      </div>
    </div>
  )
}

export default PopupWithForm;

//