import { memo, useContext } from "react"
import Card from "./Card.jsx";
import CurrentUserContext from "./contexts/CurrentUserContext.js";
import LoaderDots from "./Loaderdots/Loaderdots.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";

const Main = memo(({ name,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDelete,
  cards,
  isLoad,
  onCardLike,
  handleLogin,
  handleRegister
}) => {

  const currentUser = useContext(CurrentUserContext)

  return (

    <main className="content">
      {name === 'content' ?
        <>
          <section className="profile content__section">
            <button
              type="button"
              className="profile__avatar-overlaybutton"
              onClick={onEditAvatar}
            >
              <img
                src={currentUser.avatar ? currentUser.avatar : '#'}
                alt="Аватарка профиля"
                className="profile__avatar-pic"
              />
            </button>
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name ? currentUser.name : ''}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
              <p className="profile__subtitle">{currentUser.about ? currentUser.about : ''}</p>
            </div>
            <button
              className="profile__add-button"
              type="button"
              onClick={onAddPlace}
            />
          </section>
          <section
            className="elements content__section"
            aria-label="Лайкни понравившуюся фотку"
          >
            <ul className="elements__list-template">

              {isLoad ? <LoaderDots /> : cards.map(data => {
                /* console.log(cards)
                console.log(data) */
                return (
                  <Card key={data._id} card={data} onDelete={onDelete} onCardClick={onCardClick} onCardLike={onCardLike} />
                )
              })}
            </ul>
          </section>
        </>
        :
        name === 'signup' ?
          <Register name={name} handleRegister={handleRegister} />
          :
          <Login name={name} handleLogin={handleLogin} />
      }
    </main>
  )
})

export default Main;

//123