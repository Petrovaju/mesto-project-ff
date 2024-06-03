const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "c728fd5c-f71c-472b-bc08-0d8f7d889e3d",
    "Content-Type": "application/json",
  },
};

export function getUser() {
  const url = `${config.baseUrl}/users/me`;
  const options = { headers: config.headers };
  return request(url, options);
}

function parseResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

function request(url, options) {
  return fetch(url, options).then(parseResponse);
}

export function getCards() {
  const url = `${config.baseUrl}/cards`;
  const options = { headers: config.headers };
  return request(url, options);
}

export function updateUser(user) {
  const url = `${config.baseUrl}/users/me`;
  const options = {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  };
  return request(url, options);
}

export function createCard(card) {
  const url = `${config.baseUrl}/cards `;
  const options = {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  };
  return request(url, options);
}

export function deleteCard(card) {
  const url = `${config.baseUrl}/cards/${card._id} `;
  const options = {
    headers: config.headers,
    method: "DELETE",
  };
  return request(url, options);
}

export function addLike(card) {
  const url = `${config.baseUrl}/cards/likes/${card._id} `;
  const options = {
    headers: config.headers,
    method: "PUT",
  };
  return request(url, options);
}

export function deleteLike(card) {
  const url = `${config.baseUrl}/cards/likes/${card._id} `;
  const options = {
    headers: config.headers,
    method: "DELETE",
  };
  return request(url, options);
}

export function updateAvatar(avatarLink) {
  const url = `${config.baseUrl}/users/me/avatar`;
  const options = {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  };
  return request(url, options);
}
