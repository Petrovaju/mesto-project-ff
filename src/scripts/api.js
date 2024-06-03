const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "c728fd5c-f71c-472b-bc08-0d8f7d889e3d",
    "Content-Type": "application/json",
  },
};


export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => parseResponse(res));
}

function parseResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => parseResponse(res));
}

export function updateUser(user) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  }).then((res) => parseResponse(res));
}

export function createCard(card) {
  return fetch(`${config.baseUrl}/cards `, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => parseResponse(res));
}

export function deleteCard(card) {
  return fetch(`${config.baseUrl}/cards/${card._id} `, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => parseResponse(res));
}

export function addLike(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id} `, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => parseResponse(res));
}

export function deleteLike(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id} `, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => parseResponse(res));
}

export function updateAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => parseResponse(res));
}
