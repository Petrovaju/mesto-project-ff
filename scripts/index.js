// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard(nameValue, linkValue, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardTitle.textContent = nameValue;
  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  deleteButton.addEventListener("click", deleteCard);

  placesList.append(cardElement);
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  addCard(element.name, element.link, deleteCard);
});
