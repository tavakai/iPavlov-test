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
// Метод проверки ответа и преобразование в json
export const _getResponseData = (response) => {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}
