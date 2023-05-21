import success from '../images/success.png'
import fail from '../images/fail.png'


function InfoTooltip(props) {
  return (
    <div className={`popup popup_info ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__overlay" />
      <div className="popup__container" id={`${props.name}`} >
        <img src={props.statusInfo ? success : fail} alt={props.statusInfo ? 'Успешная регистрация' : 'Ошибка'} className="popup__image_info" />
        <h1 className="popup__title_info"> {props.statusInfo ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h1>
        <button className="popup__button popup__button_input_close" type="button" aria-label="Закрыть попап" onClick={props.onClose} />
      </div>
    </div>
  )
}

export default InfoTooltip;