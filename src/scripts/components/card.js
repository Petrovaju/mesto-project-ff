import { addLike, deleteLike } from "../api";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCallback, openPopupCallback, profileID) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  if (profileID !== cardData.owner._id) {
    deleteButton.hidden = true;
  }
  if (isCardLiked(cardData, profileID)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeCount.textContent = cardData.likes.length;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  deleteButton.addEventListener("click", deleteCallback);

  likeButton.addEventListener("click", function () {
    handleCardLike(likeButton, likeCount, cardData);
  });
  cardImage.addEventListener("click", openPopupCallback);

  return cardElement;
}

export function renderCard(
  cardData,
  openPopupCallback,
  deleteCallback,
  profileID
) {
  const cardElement = createCard(
    cardData,
    deleteCallback,
    openPopupCallback,
    profileID
  );
  placesList.prepend(cardElement);
}

function isCardLiked(cardData, profileID) {
  if (cardData.likes.length === 0) {
    return false;
  }

  return cardData.likes.some(function (element) {
    return element._id === profileID;
  });
}

function handleCardLike(likeButton, likeCount, card) {
  const handleMethod = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : addLike;

  handleMethod(card)
    .then(function (cardData) {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCount.textContent = cardData.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
