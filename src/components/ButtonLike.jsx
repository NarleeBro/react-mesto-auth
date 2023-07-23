export default function ButtonLike({ myid, card, onCardLike }) {
    const isLike = card.likes.some(element => myid === element._id)

    return (
        <>
            <div className="element__container">
                <button type="button" className={`element__like ${isLike ? 'element__like_active' : ''}`} onClick={() => onCardLike(card)} />
                <span className="element__counter">{card.likes.length}</span>
            </div>
        </>
    )
}
