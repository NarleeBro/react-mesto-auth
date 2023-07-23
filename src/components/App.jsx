////////////////////////////
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
/* import PopupWithForm from "./PopupWithForm.jsx"; */
import ImagePopup from "./ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../components/contexts/CurrentUserContext.js'
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";

import InfoTooltip from "./InfoTooltip.jsx";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import DeletePopup from "./DeletePopup.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx";
import { getUserData } from "../utils/auth.js";
import SendContext from "../components/contexts/SendContext.js";
import { authorization } from "../utils/auth.js";
import { auth } from "../utils/auth.js";
import ProtectedHome from "./ProtectedHome.jsx";

function App() {
  const navigate = useNavigate()
  //popup state
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);

  //context state
  const [currentUser, setCurrentUser] = useState({})
  const [dataUser, setDataUser] = useState('')

  //card state
  const [cards, setCards] = useState([]);
  const [isLoadCards, setIsLoadCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState('');
  //state for registration and login
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isError, setIsError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)
  //состояния popups
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePopupOpen || isImagePopup || isSuccessful || isError || isResultPopupOpen

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeletePopupOpen(false)
    setIsImagePopup(false)
   /*  setIsSuccessful(false) */
    setIsError(false)
    setIsResultPopupOpen(false)
  }, [])

  useEffect(() => {
    function closePopupsByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closePopupsByEsc)
      return () => {
        document.removeEventListener('keydown', closePopupsByEsc)
      }
    }
  }, [isOpen, closeAllPopups])

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then(res => {
          setDataUser(res.data.email)
          setLoggedIn(true)
          setIsCheckToken(false)
          navigate('/')
        })
        .catch((error) => console.error(`ERROR ТУТ ошибка useEffect-localStorage.jwt-repeatEnter ${error}`))
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
    }
  }, [navigate])

  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true)
  }, [])

  const handleEditAvatarClick = useCallback(() => {
    setIsEditAvatarPopupOpen(true)
  }, [])

  const handleDeletePopupClick = useCallback((cardId) => {
    setDeleteCardId(cardId)
    setIsDeletePopupOpen(true)
  }, [])

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card)
    setIsImagePopup(true)
  }, [])

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true)
  }, [])

  useEffect(() => {
    if (loggedIn) {
      setIsLoadCards(true)
      Promise.all([api.getInfo(), api.getCards()]).then(
        ([dataUser, dataCArd]) => {
          setCurrentUser(dataUser)
          setCards(dataCArd);
          setIsLoadCards(false)
        })
        .catch((error) =>
          console.error(`ERROR ТУТ ошибка useEffectREACT-loggedIn-PromiseAll ${error}`))
    }
  }, [loggedIn]);

  const handleSubmit = useCallback((request, textError) => {
    setIsSend(true)
    request()
      .then(closeAllPopups)
      .catch((error) => console.error(`${textError} ${error}`))
      .finally(() => setIsSend(false))
  }, [closeAllPopups])

  const handleDeleteSubmit = useCallback(() => {
    function makeRequest() {
      return (api.deleteCard(deleteCardId)
        .then(() => {
          setCards(cards.filter(card => { return card._id !== deleteCardId }))
        })
      )
    }
    handleSubmit(makeRequest, 'ERROR ТУТ ошибка handleDeleteSubmitREACT')
  }, [cards, deleteCardId, handleSubmit])

  const handleUpdateUser = useCallback((dataUser) => {
    function makeRequest() {
      return (api.setUserInfo(dataUser)
        .then(res => {
          setCurrentUser(res)
        }))
    }
    handleSubmit(makeRequest, 'ERROR ТУТ ошибка handleUpdateUserREACT')
  }, [handleSubmit])

  const handleUpdateAvatar = useCallback((dataUser) => {
    function makeRequest() {
      return (api.setNewAvatar(dataUser)
        .then(res => {
          setCurrentUser(res)
        }))
    }
    handleSubmit(makeRequest, 'ERROR ТУТ ошибка handleUpdateAvatarREACT')
  }, [handleSubmit])

  const handleAddCard = useCallback((dataCard) => {
    function makeRequest() {
      return (api.addCard(dataCard)
        .then(res => {
          setCards([res, ...cards]);
        }))
    }
    handleSubmit(makeRequest, 'ERROR ТУТ ошибка handleAddCardREACT')
  }, [cards, handleSubmit])

  const handleCardLike = useCallback((card) => {
    const isLike = card.likes.some(element => currentUser._id === element._id)
    if (isLike) {
      api.deleteLike(card._id)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item))
        })
        .catch((error) => console.error(`ERROR ТУТ ошибка handleCardLikeREACT-delete ${error}`))
    } else {
      api.addLike(card._id)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item))
        })
        .catch((error) => console.error(`ERROR ТУТ ошибка handleCardLikeREACT-add ${error}`))
    }
  }, [currentUser._id])

  function handleLogin(password, email) {
    setIsSend(true)
    authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        window.scrollTo(0, 0)
        navigate('/')
      })
      .catch((error) => {
        setIsResultPopupOpen(true)
        setIsSuccessful(true)
        setIsError(true)
        console.error(`ERROR ТУТ ошибка handleLoginREACT ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleRegister(password, email) {
    setIsSend(true)
    auth(password, email)
      .then(res => {
        setIsResultPopupOpen(true)
        setIsSuccessful(true)
        window.scrollTo(0, 0)
        navigate('/sign-in')
      })
      .catch((error) => {
        setIsResultPopupOpen(true)
        setIsSuccessful(true)
        setIsError(true)
        console.error(`ERROR ТУТ ошибка handleRegisterREACT ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <SendContext.Provider value={isSend}>
          <Routes>
            <Route path='/' element={<ProtectedRoute
              element={ProtectedHome}
              dataUser={dataUser}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onDelete={handleDeletePopupClick}
              onCardClick={handleCardClick}
              cards={cards}
              isLoad={isLoadCards}
              onCardLike={handleCardLike}
              loggedIn={loggedIn}
              isCheckToken={isCheckToken}
            />
            } />
            <Route path='/sign-up' element={
              <>
                <Header name='signup' />
                <Main name='signup' handleRegister={handleRegister} isCheckToken={isCheckToken} />
              </>
            } />
            <Route path='/sign-in' element={
              <>
                <Header name='signin' />
                <Main name='signin' handleLogin={handleLogin} isCheckToken={isCheckToken} />
              </>
            } />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </SendContext.Provider>

        <Footer />

        <SendContext.Provider value={isSend}>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            onAddPlace={handleAddCard}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />

          <DeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
          />
        </SendContext.Provider>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />

        {/* <InfoTooltip
          name='successful'
          titleText={'Вы успешно зарегистрировались!'}
          isOpen={isSuccessful}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name='error'
          titleText={'Что-то пошло не так! Попробуйте ещё раз.'}
          isOpen={isError}
          onClose={closeAllPopups}
        /> */}

        <InfoTooltip
          name='result'
          isSuccessful={isSuccessful}
          isOpen={isResultPopupOpen}
          onClose={closeAllPopups}
        />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;