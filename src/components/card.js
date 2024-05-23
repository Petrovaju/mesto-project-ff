import { openPopup, closePopup } from "./modal.js";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(cardData, deleteCallback, openPopupCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  deleteButton.addEventListener("click", deleteCallback);
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", cardLike);
  cardImage.addEventListener("click", openPopupCallback);

  return cardElement;
}

export function renderCard(cardData, openPopupCallback) {
  const cardElement = createCard(cardData, deleteCard, openPopupCallback);
  placesList.prepend(cardElement);
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

//лайк карточки

function cardLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

