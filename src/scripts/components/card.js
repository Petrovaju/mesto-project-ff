const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCallback, openPopupCallback, likeCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  deleteButton.addEventListener("click", deleteCallback);

  likeButton.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", openPopupCallback);

  return cardElement;
}

export function renderCard(cardData, openPopupCallback) {
  const cardElement = createCard(
    cardData,
    deleteCard,
    openPopupCallback,
    likeCard
  );
  placesList.prepend(cardElement);
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

//лайк карточки

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
