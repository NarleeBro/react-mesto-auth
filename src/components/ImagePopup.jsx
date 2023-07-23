import Popup from './Popup.jsx'
import { memo } from 'react'

const ImagePopup = memo(({ card, isOpen, onClose }) => {
  return (
    <Popup
      name='image'
      isOpen={isOpen}
      onClose={onClose}
    >
      <figure className="popup__figure">
        <img src={card.link ? card.link : '#'} alt={card.name ? card.name : '#'} className="popup__image" />
        <figcaption className="popup__figcaption-text">
          {card.name && card.name}
        </figcaption>
      </figure>
    </Popup>
  )
})

export default ImagePopup