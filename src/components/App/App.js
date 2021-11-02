import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import * as mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const history = useHistory();
  const location = useLocation();

  // Регистрация пользователя
  const handleSubmitReg = (data) => {
    mainApi
      .register(data)
      .then((res) => {
        if (res.status === 201) {
          setLoggedIn(true);
          mainApi.getUserProfile().then((res) => {
            setCurrentUser(res);
          });
          history.push("/");
          setModal(true);
          setResponseStatus(201);
          setTimeout(() => {
            setModal(false);
          }, 4000);
        }
        return res.json();
      })
      .catch((err) => {
        if (err.message === "Ошибка: 409") {
          setModal(true);
          setResponseStatus(409);
          setTimeout(() => {
            setModal(false);
          }, 4000);
        } else if (err.message === "Ошибка: 400") {
          setModal(true);
          setResponseStatus(400);
          setTimeout(() => {
            setModal(false);
          }, 4000);
        }
      });
  };
  // Авторизация пользователя
  const handleSubmitAuth = (data) => {
    mainApi
      .authorize(data)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
          mainApi.getUserProfile().then((res) => {
            setCurrentUser(res);
          });
        } else if (res === undefined) {
          setModal(true);
          setResponseStatus(401);
          setTimeout(() => {
            setModal(false);
          }, 4000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Редактирование профиля
  const handleEditProfile = (data) => {
    mainApi
      .doChangeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setModal(true);
        setResponseStatus(200);
        setTimeout(() => {
          setModal(false);
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Выход из системы
  const signOut = () => {
    mainApi
      .logOut()
      .then((res) => {
        setLoggedIn(false);
        setCurrentUser({});
        history.push("/signup");
      })
      .catch((err) => {
        return err;
      });
  };
  // Начальная загрузка данных
  useEffect(() => {
    mainApi
      .getUserProfile()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        history.push(location.pathname);
      })
      .catch((err) => {
        setLoggedIn(false);
        history.push("/signin");
        return err;
      })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch history={history}>
            <ProtectedRoute
              exact path="/"
              profileEditFn={handleEditProfile}
              signOut={signOut}
              loggedIn={loggedIn}
              component={Profile}
              modal={modal}
              responseStatus={responseStatus}
            />
            <Route path="/signin">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login
                  handleSubmit={handleSubmitAuth}
                  modal={modal}
                  responseStatus={responseStatus}
                />
              )}
            </Route>
            <Route path="/signup">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Register
                  handleSubmit={handleSubmitReg}
                  modal={modal}
                  responseStatus={responseStatus}
                />
              )}
            </Route>
            {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/signin" />
              )}
          </Switch>
          <Modal isActive={modal} responseStatus={responseStatus} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
