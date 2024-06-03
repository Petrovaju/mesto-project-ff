// validationConfig это объект с полями:
// formSelector - класс формы для доступа через querySelector
// inputSelector - класс ввода формы для доступа через querySelector
// submitButtonSelector - класс кнопки отправки формы для доступа через querySelector
// inactiveButtonClass - название стиля класса, который делает кнопку неактивной
// inputErrorClass - название стиля класса, который помечает ввод формы как ошибочный
// errorClass - название стиля класса, который отвечает за отображение текста ошибки ввода формы

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function isValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

// функция enableValidation включает фалидацию форм на всей странице
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const saveButton = form.querySelector(config.submitButtonSelector);

    toggleButton(inputList, saveButton, config);

    inputList.forEach(function (element) {
      element.addEventListener("input", function () {
        isValid(form, element, config);

        toggleButton(inputList, saveButton, config);
      });
    });
  });
}

function disableButton(button, config) {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}

function enableButton(button, config) {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
}

function toggleButton(inputList, button, config) {
  if (isAllInputsValid(inputList)) {
    enableButton(button, config);
  } else {
    disableButton(button, config);
  }
}

function isAllInputsValid(inputList) {
  return !inputList.some(function (element) {
    return !element.validity.valid;
  });
}

// функция clearValidation очищает ошибки валидации и делает кнопку отправки формы неактивной
export function clearValidation(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  disableButton(button, config);

  inputList.forEach(function (element) {
    hideInputError(form, element, config);
    element.setCustomValidity("");
  });
}
