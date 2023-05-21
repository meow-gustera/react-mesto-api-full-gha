//для работы с темплейтом
const cardsContainer = document.querySelector('.element');
const cardTemplate = document.querySelector('.element__template').content;

const validationConfig = {
  formSelector: '.popup__form', // выбор формы
  inputSelector: '.popup__input', //выбор инпута
  submitButtonSelector: '.popup__button_input_save', //общая кнопка
  inactiveButtonClass: 'popup_button_input_save_disabled', //неактвная кнопка отправки
  inputErrorClass: 'popup__input-error', //ошибка для инпута
  errorClass: 'popup__input-span-error-active', //ошибка спан
};


const profileData = {
  userName: '.profile__name',
  userDescription: '.profile__description',
  profileAvatar: '.profile__avatar',
  _id: '',
}
//кнопки для вызова/закрытия попаов
const profileEditButton = document.querySelector('.profile__edit');
const placeAddButton = document.querySelector('.profile__add-button');

//подписи аватара
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');

//отправка форм
const formElementEdit = document.querySelector('div.popup_edit_profile .popup__form');
const formElementAddPlace = document.querySelector('div.popup_add_place .popup__form');
const formEditAvatar = document.querySelector('div.popup_change_avatar .popup__form');

//инпуты
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_description');

export { cardsContainer, cardTemplate, validationConfig, profileEditButton, placeAddButton, profileName, profileJob, formElementEdit, formElementAddPlace, nameInput, jobInput, profileAvatar, formEditAvatar, profileData };
