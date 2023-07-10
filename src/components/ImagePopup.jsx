export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_section_increase-image ${isOpen ? "popup_opened" : ''
        }`}
      aria-label="Лайкни понравившуюся фотку"
      onClick={onClose}
    >
      <div className="popup__container-increase-image" onClick={(evt => evt.stopPropagation())}>
        <button
          className="popup__close popup__close_increase-image"
          type="button"
          onClick={onClose}
        />
        <figure className="popup__figure">
          <img src={card.link} alt={`${card.name}`} className="popup__image" />
          <figcaption className="popup__figcaption-text">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
