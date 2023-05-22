import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect } from 'react';
import newApi from '../utils/api.js';
import authApi from '../utils/auth.js';

import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import { Navigate } from "react-router-dom";

function App() {
  const [currentUser, setUserInfo] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [statusInfo, setStatusInfo] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || imagePopupOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleCardClick(evt) {
    setSelectedCard(evt);
    setImagePopupOpen(true);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    newApi.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(cardId) {
    newApi.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      authApi.getAuthUserData(localStorage.getItem('jwt'))
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email)
        })
        .catch((err) => {
          console.log(err);
        })
        newApi.preloadInfo()
        .then(([profileData, cards]) => {
          setUserInfo(profileData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setIsInfoPopupOpen(false);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleUpdateUser(profileData) {
    newApi.editProfile(profileData.name, profileData.about)
      .then(profileData => setUserInfo(profileData))
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
  };

  function handleUpdateAvatar(avatar) {
    newApi.editAvatar(avatar)
      .then(profileData => setUserInfo(profileData))
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(name, link) {
    newApi.postNewCard(name, link)
      .then(newCard => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
  }

  function handleExit() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function signUpUser(password, email) {
    authApi.signUp(password, email)
      .then(() => {
        setIsInfoPopupOpen(true);
        setStatusInfo(true);
      })
      .catch(() => {
        setIsInfoPopupOpen(true);
        setStatusInfo(false);
      })
  }

  function signInUser(password, email) {
    authApi.signIn(password, email)
      .then((response) => {
        if (response.token) {
          localStorage.setItem('jwt', response.token);
        }
      })
      .then(() => {
        setLoggedIn(true);
        setUserEmail(email)
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header loggedIn={loggedIn} userEmail={userEmail} handleExit={handleExit} />

        <Routes>
          {/* для регистрации пользователя; */}
          <Route path="/sign-up" element={<Register signUpUser={signUpUser} />} > </Route>
          {/*для авторизации пользователя.*/}
          <Route path="/sign-in" element={loggedIn ? <Navigate to="/" replace /> : <Login signInUser={signInUser} />} />
          <Route path="/"
            element={<ProtectedRoute
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn} />} />
        </Routes>
        <Footer />

        <InfoTooltip isOpen={isInfoPopupOpen} onClose={closeAllPopups} statusInfo={statusInfo} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="delete_image" title="Вы уверены?" buttonText="Да" />
        <ImagePopup card={selectedCard} isOpen={imagePopupOpen} onClose={closeAllPopups} />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;

