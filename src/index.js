import "./pages/index.css"; // добавили импорт главного файла стилей`

import { initialCards } from "./scripts/cards.js";

import { renderCard } from "./components/card.js";

import { openPopup, closePopup } from "./components/modal.js";

//переменные

const addCardPopup = document.querySelector(".popup_type_new-card"); // модальное окно добавления карточки
const addCard = document.querySelector('form[name="new-place"]');
const cardNameInput = addCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCard.querySelector(".popup__input_type_url");

addCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderCard(cardData, openImagePopup);
  closePopup(addCardPopup);
  cardNameInput.value = "";
  cardLinkInput.value = "";
});

// @todo: Вывести карточки на страницу

initialCards.forEach((data) => { renderCard(data, openImagePopup);});

//переменные модальных окон

const addCardButton = document.querySelector(".profile__add-button"); // при нажатии на кнопку +
const closeCardPopup = addCardPopup.querySelector(".popup__close"); // закрываем модальное окно
const profileEditButton = document.querySelector(".profile__edit-button"); //при нажатии на кнопку редактировать профиль
const profileEditPopup = document.querySelector(".popup_type_edit"); //модальное окно редактировать профиль
const closeProfilePopup = profileEditPopup.querySelector(".popup__close"); //закрываем мод окно редактировать

//открываем попапы

addCardButton.addEventListener("click", function () {
  openPopup(addCardPopup);
});

profileEditButton.addEventListener("click", function () {
  openPopup(profileEditPopup);
});

closeCardPopup.addEventListener("click", function () {
  closePopup(addCardPopup);
});

closeProfilePopup.addEventListener("click", function () {
  closePopup(profileEditPopup);
});

//редактировать профиль

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;

  closePopup(profileEditPopup);
}

formElement.addEventListener("submit", handleFormSubmit);

//открытие попапа с картинкой

const imagePopup = document.querySelector(".popup_type_image");
const closePhotoPopup = imagePopup.querySelector(".popup__close");
const incImagePopup = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

function openImagePopup(evt) {
  incImagePopup.setAttribute("src", evt.target.src);
  incImagePopup.setAttribute("alt", evt.target.alt);
  imagePopupCaption.textContent = evt.target.alt;
  openPopup(imagePopup);
}

closePhotoPopup.addEventListener("click", function () {
  closePopup(imagePopup);
});
