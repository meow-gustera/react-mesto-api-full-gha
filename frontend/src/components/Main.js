import { useContext } from 'react';
import Card from './Card.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'


function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} />
        <div className="profile__change-block">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile} />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить место" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        <ul className="element">
          {props.cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;