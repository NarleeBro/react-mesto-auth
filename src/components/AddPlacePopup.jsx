import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {

    const { values, errors, isValid, isInputVAlid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({ placename: values.placename, link: values.link }, reset)
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            button="Создать"
            isValid={isValid}
            isOpen={isOpen}
            isSend={isSend}
            onClose={resetForClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="placeNameInput" className="popup__label">
                <input
                    type="text"
                    className={`popup__input popup__input_edit_place-name ${isInputVAlid.placename === undefined || isInputVAlid.placename ? '' : "popup__input_type_error"}`}
                    id="placename"
                    placeholder="Название"
                    name="placename"
                    minLength={2}
                    maxLength={30}
                    required=""
                    value={values.placename ? values.placename : ''}
                    disabled={isSend}
                    onChange={handleChange}
                />
                <span id="placename-error" className="placename-error error" >{errors.placename}</span>
            </label>
            <label htmlFor="imageUrlInput" className="popup__label">
                <input
                    type="url"
                    className={`popup__input popup__input_edit_image-url ${isInputVAlid.link === undefined || isInputVAlid.link ? '' : "popup__input_type_error"}`}
                    id="link"
                    placeholder="Ссылка на картинку"
                    name="link"
                    required=""
                    value={values.link ? values.link : ''}
                    disabled={isSend}
                    onChange={handleChange}
                />
                <span id="link-error" className="link-error error" >{errors.link}</span>
            </label>
        </PopupWithForm>
    )
}