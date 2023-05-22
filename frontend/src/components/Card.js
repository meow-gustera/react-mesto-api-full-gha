import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js'

function Card(props) {
  //Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__likes element__like ${isLiked && 'element__like_active'}`
  );;

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  };

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleClickLike() {
    props.onCardLike(props.card)
  }

  return (
    <li className="element__item">
      <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button type="button" className={cardLikeButtonClassName} aria-label="Лайк" onClick={handleClickLike} />
          <p className="element__likes element__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="element__delete" onClick={handleDeleteClick} />}
    </li>
  )
}

export default Card;