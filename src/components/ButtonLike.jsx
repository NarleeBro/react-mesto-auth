import { useEffect, useState } from "react";
/* import api from "../utils/api" */

export default function ButtonLike({ onCardLike, myid, card }) {
    const [isLike, setIsLike] = useState(false)
    /*  const [count, setCount] = useState(likes.length) */

    useEffect(() => {
        setIsLike(card.likes.some(element => myid === element._id))
    }, [card, myid])

    return (
        <>
            <div className="element__container">
                <button type="button" className={`element__like ${isLike ? 'element__like_active' : ''}`} onClick={() => onCardLike(card)} />
                <span className="element__counter">{card.likes.length}</span>
            </div>
        </>
    )
}
