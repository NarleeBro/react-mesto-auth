import { useRef } from "react"
import PopupWithForm from "./PopupWithForm"
import useFormValidation from "../utils/useFormValidation"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {

    const input = useRef()
    const { values, errors, isValid, isInputVAlid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({avatar: input.current.value}, reset)
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить Аватарку?"
            isOpen={isOpen}
            isSend={isSend}
            onClose={resetForClose}
            isValid={isValid}
            onSubmit={handleSubmit}
        >
            <label htmlFor="imageUrlInput" className="popup__label">
                <input
                    ref={input}
                    type="url"
                    className={`popup__input popup__input_edit_image-url ${isInputVAlid.avatar === undefined || isInputVAlid.avatar ? '' : "popup__input_type_error"}`}
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    name="avatar"
                    required=""
                    value={values.avatar ? values.avatar : ''}
                    disabled={isSend}
                    onChange={handleChange}
                />
                <span id="avatar-error" className="avatar-error error">{errors.avatar}</span>
            </label>
        </PopupWithForm>
    )
}