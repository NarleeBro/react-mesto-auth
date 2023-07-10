import { useContext, useEffect } from "react";
import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "./contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isValid, isInputVAlid, handleChange, reset, setValue } = useFormValidation()

    useEffect(() => {
        setValue("yourname", currentUser.name)
        setValue("yourjob", currentUser.about)
    }, [currentUser, setValue])

    function resetForClose () {
        onClose()
        reset({ yourname: currentUser.name, yourjob: currentUser.about })
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({yourname: values.yourname, yourjob: values.yourjob}, reset)
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={resetForClose}
            isValid={isValid}
            isSend={isSend}
            onSubmit={handleSubmit}
        >
            <label htmlFor="nameInput" className="popup__label">
                <input
                    type="text"
                    className={`popup__input popup__input_edit_name ${isInputVAlid.yourname === undefined || isInputVAlid.yourname ? '' : "popup__input_type_error"}`}
                    id="nameInput"
                    placeholder="Ваше имя"
                    name="yourname"
                    minLength={2}
                    maxLength={40}
                    required
                    value={values.yourname ? values.yourname : ''}
                    disabled={isSend}
                    onChange={handleChange}
                />
                <span id="nameInput-error" className="nameInput-error error">{errors.yourname}</span>
            </label>
            <label htmlFor="jobInput" className="popup__label">
                <input
                    type="text"
                    className={`popup__input popup__input_edit_job ${isInputVAlid.yourjob === undefined || isInputVAlid.yourjob ? '' : "popup__input_type_error"}`}
                    id="jobInput"
                    placeholder="Ваша должность"
                    name="yourjob"
                    minLength={2}
                    maxLength={100}
                    required
                    value={values.yourjob ? values.yourjob : ''}
                    disabled={isSend}
                    onChange={handleChange}
                />
                <span id="jobInput-error" className="jobInput-error error">{errors.yourjob}</span>
            </label>
        </PopupWithForm>
    )
}