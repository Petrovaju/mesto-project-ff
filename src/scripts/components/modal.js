// открытие и закрытие модальных окон

export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  popup.addEventListener("mousedown", closeOverlayPopup);
  document.addEventListener("keydown", closeEscapePopup);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscapePopup);
  popup.removeEventListener("mousedown", closeOverlayPopup);
}

function closeOverlayPopup(evt) {
  //слушатель закрытия карточки нажатием на оверлей
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closeEscapePopup(evt) {
  //слушатель закрытия карточки нажатием эскейп
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}