export const base_url = "https://api.moviestavakai.nomoredomains.rocks";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = (data) => {
  return fetch(`${base_url}/signup`, {
    method: 'POST',
    headers: headers,
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      password: data.password
    })
  })
  .then(res => {
    if (res.ok) {
    return res;
    }
   return Promise.reject(new Error(`Ошибка: ${res.status}`));
  })
};

export const authorize = (user) => {
  return fetch(`${base_url}/signin`, {
    method: 'POST',
    headers: headers,
    credentials: "include",
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token){
      return data;
    }
  })
};

export const logOut = () => {
  return fetch(`${base_url}/signout`, {
    method: 'POST',
    headers: headers,
    credentials: "include",
  })
  .then(res => _getResponseData(res))
}

// Получить данные пользователя
export const getUserProfile = () => {
  return fetch(`${base_url}/users/me`, {
    method: 'GET',
    headers: headers,
    credentials: 'include',
    })
    .then((res) => {
      return _getResponseData(res)
    })
}
// Получить сохраненные фильмы
export const getSavedItems = () => {
  return fetch(`${base_url}/movies`, {
    method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(res => {
      return _getResponseData(res)
    });
}
// Изменить профиль пользователя
export const doChangeUserInfo = (data) => {
  return fetch(`${base_url}/users/me`, {
      method: 'PATCH',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
    .then(res => {
      return _getResponseData(res)
    })
}
// Создание нового фильма
export const addItem = (data) => {
  return fetch(`${base_url}/movies`, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image.url,
        trailer: data.trailerLink,
        nameRU: data.nameRU,
        nameEN : data.nameEN,
        thumbnail : data.image.formats.thumbnail.url,
        id : data.id,
      })
    })
    .then(res => {
      return _getResponseData(res)
    })
}
// Удаление фильма
export const removeItem = (id) => {
  return fetch(`${base_url}/movies/${id}`, {
      method: 'DELETE',
      headers: headers,
      credentials: 'include',
    })
    .then(res => {
      return _getResponseData(res)
    })
}
// Метод проверки ответа и преобразование в json
export const _getResponseData = (response) => {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}
