export default function PopupWithForm({
  name,
  title,
  button,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSend,
  isValid=true
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <button
          className="popup__close popup__close_edit-profile"
          type="button"
          onClick={onClose}
        />
        <h2 className={`popup__title`}>{title}</h2>
        <form
          className="popup__form popup__form_edit_profile"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__button-save-profile popup__button-valid ${isValid ? '' : 'popup__button-invalid'}`}
            type="submit"
            disabled={isSend}
          >
            {isSend ? '...' : button || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}
