import PopupWithForm from "./PopupWithForm.jsx"
import useFormValidation from "../utils/useFormValidation.js"
import Input from "./Input.jsx"
import { memo, useEffect } from "react"

const EditAvatarPopup = memo(({ onUpdateAvatar, isOpen, onClose }) => {
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    useEffect(() => {
        if (isOpen) {
            reset()
        }
    }, [isOpen/* , reset */])

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({ avatar: values.avatar })
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить Аватарку?"
            isOpen={isOpen}
            onClose={onClose}
            isValid={isValid}
            onSubmit={handleSubmit}
        >
            <label htmlFor="imageUrlInput" className="popup__label">
                <Input
                    type="url"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    name="avatar"
                    required=""
                    value={values.avatar}
                    onChange={handleChange}
                    isInputValid={isInputValid.avatar}
                    error={errors.avatar}
                />
            </label>
        </PopupWithForm>
    )
})

export default EditAvatarPopup