import { useContext } from "react";
import Card from "./Card.jsx";
import CurrentUserContext from "./contexts/CurrentUserContext";
import LoaderDots from "./Loaderdots/Loaderdots.jsx";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDelete,
  cards,
  isLoad,
  onCardLike
}) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
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
          {isLoad ? <LoaderDots /> : cards.map((data) => {
            return (
              <li className="template__list" key={data._id}>
                <Card card={data} onCardClick={onCardClick} onDelete={onDelete} onCardLike={onCardLike} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
