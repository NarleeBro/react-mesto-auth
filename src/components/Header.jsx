import logo from "../images/logoSVG.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Лого на английском языке Mesto Russia"
      />
    </header>
  );
}
