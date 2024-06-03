import "./pages/index.css"; // добавили импорт главного файла стилей`

import { renderCard } from "./scripts/components/card.js";

import { openPopup, closePopup } from "./scripts/components/modal.js";

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import {
  getUser,
  getCards,
  updateUser,
  createCard,
  deleteCard,
  updateAvatar,
} from "./scripts/api.js";

import { handleSubmit } from "./scripts/util.js";

//переменные

const addCardPopup = document.querySelector(".popup_type_new-card"); // модальное окно добавления карточки
const addCardForm = document.forms["new-place"];
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

addCardForm.addEventListener("submit", function (evt) {
  function makeRequest() {
    let cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
      owner: {
        _id: profileID,
      },
    };
    function deleteCallback(evt) {
      deleteCard(cardData)
        .then(() => {
          evt.target.closest(".places__item").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return createCard(cardData).then((res) => {
      cardData._id = res._id;
      renderCard(res, openImagePopup, deleteCallback, profileID);
      closePopup(addCardPopup);
    });
  }
  handleSubmit(makeRequest, evt);
});

//переменные модальных окон

const addCardButton = document.querySelector(".profile__add-button"); // при нажатии на кнопку +
const profileEditButton = document.querySelector(".profile__edit-button"); //при нажатии на кнопку редактировать профиль
const profileEditPopup = document.querySelector(".popup_type_edit"); //модальное окно редактировать профиль
const editProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileImage = document.querySelector(".profile__image"); //аватар профиля
const closeButtons = document.querySelectorAll(".popup__close");

//открываем попапы

addCardButton.addEventListener("click", function () {
  openPopup(addCardPopup);
  clearValidation(addCardPopup, validationConfig);
});

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(profileEditPopup);
  clearValidation(profileEditPopup, validationConfig);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//редактировать профиль

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    const userInfo = {
      name: nameInput.value,
      about: jobInput.value,
    };
    return updateUser(userInfo).then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(profileEditPopup);
    });
  }
  handleSubmit(makeRequest, evt);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//открытие попапа с картинкой

const imagePopup = document.querySelector(".popup_type_image");
const incImagePopup = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

function openImagePopup(evt) {
  incImagePopup.src = evt.target.src;
  incImagePopup.alt = evt.target.alt;
  imagePopupCaption.textContent = evt.target.alt;
  openPopup(imagePopup);
}

// загружаем инфориацию с сервера для профиля

let profileID = "";

function loadUserData(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.setAttribute("style", `background-image: url(${user.avatar});`);
  profileID = user._id;
}

Promise.all([getUser(), getCards()])
  .then((results) => {
    const [user, cards] = results;
    loadUserData(user);
    cards.forEach(function (element) {
      function deleteCallback(evt) {
        deleteCard(element)
          .then(() => {
            evt.target.closest(".places__item").remove();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      renderCard(element, openImagePopup, deleteCallback, profileID);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//смена аватара

const avatarImageButton = document.querySelector(".profile__image_container");
const avatarUpdatePopup = document.querySelector(".popup_avatar");
const avatarForm = document.forms["avatar_update"];
const avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");

avatarImageButton.addEventListener("click", function () {
  openPopup(avatarUpdatePopup);
  avatarForm.reset();
  clearValidation(avatarUpdatePopup, validationConfig);
});

function handleAvatarUpdate(evt) {
  function makeRequest() {
    const avatarLink = avatarLinkInput.value;
    return updateAvatar(avatarLink).then((userData) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${userData.avatar});`
      );
      closePopup(avatarUpdatePopup);
    });
  }
  handleSubmit(makeRequest, evt);
}

avatarForm.addEventListener("submit", handleAvatarUpdate);

//вызываем функцию валидации

enableValidation(validationConfig);
