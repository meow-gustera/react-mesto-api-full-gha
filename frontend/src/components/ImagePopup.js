function ImagePopup(props) {
  return (
    <div className={`popup popup_zoom_image  ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__overlay"></div>
      <div className="popup__container-photo" id="zoom-photo">
        <button className="popup__button popup__button_input_close" type="button" aria-label="Закрыть изображение" onClick={props.onClose}></button>
        <img className="popup__photo" src={props.card.link} alt={props.card.name} />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;