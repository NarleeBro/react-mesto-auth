import Popup from "./Popup.jsx";
import Form from "./Form.jsx"

export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSend,
  isValid = true
}) {
  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className={`popup__title ${name === 'delete' ? 'popup__title_type_delete' : ''}`}>{title}</h2>
      <Form
        name={name}
        onSubmit={onSubmit}
        titleButton={titleButton}
        children={children}
        isSend={isSend}
        isValid={isValid}
      />
    </Popup>
  );
}
