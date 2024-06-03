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
  addLike,
  deleteLike,
  updateAvatar,
} from "./scripts/api.js";

//переменные

const setLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

const addCardPopup = document.querySelector(".popup_type_new-card"); // модальное окно добавления карточки
const addCardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const saveCardButton = addCardPopup.querySelector(".popup__button");

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
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
  setLoading(true, saveCardButton);
  createCard(cardData)
    .then((res) => {
      cardData._id = res._id;
      renderCard(res, openImagePopup, deleteCallback, profileID);
      closePopup(addCardPopup);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function () {
      setLoading(false, saveCardButton);
    });
});

//переменные модальных окон

const addCardButton = document.querySelector(".profile__add-button"); // при нажатии на кнопку +
const closeCardPopup = addCardPopup.querySelector(".popup__close"); // закрываем модальное окно
const profileEditButton = document.querySelector(".profile__edit-button"); //при нажатии на кнопку редактировать профиль
const profileEditPopup = document.querySelector(".popup_type_edit"); //модальное окно редактировать профиль
const closeProfilePopup = profileEditPopup.querySelector(".popup__close"); //закрываем мод окно редактировать
const editProfileForm = document.querySelector('form[name="edit-profile"');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileImage = document.querySelector(".profile__image"); //аватар профиля
const profileSaveButton = profileEditPopup.querySelector(".popup__button");

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

closeCardPopup.addEventListener("click", function () {
  closePopup(addCardPopup);
});

closeProfilePopup.addEventListener("click", function () {
  closePopup(profileEditPopup);
});

//редактировать профиль

function handleFormSubmit(evt) {
  evt.preventDefault();
  const userInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };
  setLoading(true, profileSaveButton);

  updateUser(userInfo)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function () {
      setLoading(false, profileSaveButton);
    });
}

editProfileForm.addEventListener("submit", handleFormSubmit);

//открытие попапа с картинкой

const imagePopup = document.querySelector(".popup_type_image");
const closePhotoPopup = imagePopup.querySelector(".popup__close");
const incImagePopup = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

function openImagePopup(evt) {
  incImagePopup.src = evt.target.src;
  incImagePopup.alt = evt.target.alt;
  imagePopupCaption.textContent = evt.target.alt;
  openPopup(imagePopup);
}

closePhotoPopup.addEventListener("click", function () {
  closePopup(imagePopup);
});

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
const closeAvatarUpdatePopup = avatarUpdatePopup.querySelector(".popup__close");
const avatarForm = document.forms["avatar_update"];
const avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");
const avatarSaveButton = avatarUpdatePopup.querySelector(".popup__button");

avatarImageButton.addEventListener("click", function () {
  openPopup(avatarUpdatePopup);
  avatarForm.reset();
  clearValidation(avatarUpdatePopup, validationConfig);
});

closeAvatarUpdatePopup.addEventListener("click", function () {
  closePopup(avatarUpdatePopup);
});

function handleAvatarUpdate(evt) {
  evt.preventDefault();
  const avatarLink = avatarLinkInput.value;
  avatarSaveButton.disabled = true;
  setLoading(true, avatarSaveButton);
  updateAvatar(avatarLink)
    .then(function (user) {
      profileImage.setAttribute(
        "style",
        `background-image: url(${user.avatar});`
      );
      closePopup(avatarUpdatePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function () {
      setLoading(false, avatarSaveButton);
    });
}

avatarForm.addEventListener("submit", handleAvatarUpdate);

//вызываем функцию валидации

enableValidation(validationConfig);
