import { useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ButtonLike from "./ButtonLike";

export default function Card({ card, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <article className="element">
      {currentUser._id === card.owner._id && <button className="element__trash" type="button" onClick={() => onDelete(card._id)} />}
      <img
        className="element__mask-group"
        src={card.link}
        alt={`Картинка ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="element__group-title-and-like">
        <h2 className="element__title">{card.name}</h2>
        <ButtonLike myid={currentUser._id} card={card} onCardLike={onCardLike} />
      </div>
    </article>
  );
}