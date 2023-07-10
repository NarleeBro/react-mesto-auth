////////////////////////////
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../components/contexts/CurrentUserContext.js'
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";

function App() {
  //popup state
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  //context state
  const [currentUser, setCurrentUser] = useState({})
  //card state
  const [cards, setCards] = useState([]);
  const [isLoadCards, setIsLoadCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState('');

  const setAllStatesByClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false)
  }, [])

  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setAllStatesByClosePopups()
      document.removeEventListener('mousedown', closePopupByEsc)
    }
  }, [setAllStatesByClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllStatesByClosePopups()
    document.removeEventListener('mousedown', closePopupByEsc)
  }, [setAllStatesByClosePopups, closePopupByEsc])

  function setEventListenetDoc() {
    document.addEventListener('keydown', closePopupByEsc);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenetDoc();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenetDoc();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenetDoc();
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
    setEventListenetDoc();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEventListenetDoc();
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) =>
        console.error(`ERROR ТУТ ошибка handleCardLikeREACT ${error}`)
      )
  }

  useEffect(() => {
    setIsLoadCards(true)
    Promise.all([api.getInfo(), api.getCards()]).then(
      ([dataUser, dataCArd]) => {
        setCurrentUser(dataUser)
        setCards(dataCArd);
        setIsLoadCards(false)
      }
    )
      .catch((error) =>
        console.error(`ERROR ТУТ ошибка useEffectREACT ${error}`)
      )
  }, []);

  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    setIsSend(true)
    api.deleteCard(deleteCardId)
      .then(res => {
        setCards(cards.filter(element => {
          return element._id !== deleteCardId
        }))
        closeAllPopups()
        setIsSend(false)
      })
      .catch((error) => console.error(`ERROR ТУТ ошибка handleDeleteSubmiteREACT ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true)
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch((error) => console.error(`ERROR ТУТ ошибка handleUpdateUserREACT ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true)
    api.setNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch((error) => console.error(`ERROR ТУТ ошибка handleUpdateAvatarREACT ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleSubmit(dataCArd, reset) {
    setIsSend(true)
    api.addCard(dataCArd)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch((error) => console.error(`ERROR ТУТ ошибка handleSubmitREACT ${error}`))
      .finally(() => setIsSend(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDelete={handleDeletePopupClick}
          cards={cards}
          isLoad={isLoadCards}
          onCardLike={handleCardLike}
        />

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend} />

        <AddPlacePopup
          onAddPlace={handleSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend} />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend} />

        <PopupWithForm name="delete" title="Вы уверены?" button="Да" isOpen={isDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleDeleteSubmit} isSend={isSend} />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;