import useFormValidation from "../utils/useFormValidation.js";
import Input from "./Input.jsx"
import PopupWithForm from "./PopupWithForm.jsx";
import { memo, useEffect } from "react"

const AddPlacePopup = memo(({ onAddPlace, isOpen, onClose }) => {
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    useEffect(() => {
        if (isOpen) {
            reset()
        }
    }, [isOpen/* , reset */])

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({ placename: values.placename, link: values.link })
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            titleButton="Создать"
            isValid={isValid}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="placeNameInput" className="popup__label">
                <Input
                    type="text"
                    placeholder="Название"
                    name="placename"
                    minLength={2}
                    maxLength={30}
                    value={values.placename}
                    onChange={handleChange}
                    isInputValid={isInputValid.placename}
                    error={errors.placename}
                />
            </label>
            <label htmlFor="imageUrlInput" className="popup__label">
                <Input
                    type="url"
                    placeholder="Ссылка на картинку"
                    name="link"
                    required=""
                    value={values.link}
                    onChange={handleChange}
                    isInputValid={isInputValid.link}
                    error={errors.link}
                />
            </label>
        </PopupWithForm>
    )
})

export default AddPlacePopup