import { memo, useContext, useEffect } from "react";
import useFormValidation from "../utils/useFormValidation.js";
import PopupWithForm from "./PopupWithForm.jsx";
import CurrentUserContext from "./contexts/CurrentUserContext.js";
import Input from "./Input.jsx";

const EditProfilePopup = memo(({ onUpdateUser, isOpen, onClose }) => {
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    useEffect(() => {
        if (isOpen) {
            reset({ yourname: currentUser.name, yourjob: currentUser.about })
        }
    }, [currentUser, isOpen/* , reset */])

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({ yourname: values.yourname, yourjob: values.yourjob }, reset)
    }

    return (
        <PopupWithForm
            name={"edit-profile"}
            title={"Редактировать профиль"}
            isOpen={isOpen}
            onClose={onClose}
            isValid={isValid}
            onSubmit={handleSubmit}
        >
            <label htmlFor="nameInput" className="popup__label">
                <Input
                    type="text"
                    id="nameInput"
                    placeholder="Ваше имя"
                    name="yourname"
                    minLength={2}
                    maxLength={40}
                    required
                    value={values.yourname}

                    onChange={handleChange}
                    isInputValid={isInputValid.yourname}
                    error={errors.yourname}
                />
            </label>
            <label htmlFor="jobInput" className="popup__label">
                <Input
                    type="text"
                    placeholder="Ваша должность"
                    name="yourjob"
                    minLength={2}
                    maxLength={100}
                    required
                    value={values.yourjob}
                    onChange={handleChange}
                    isInputValid={isInputValid.yourjob}
                    error={errors.yourjob}
                />
            </label>
        </PopupWithForm>
    )
})

export default EditProfilePopup