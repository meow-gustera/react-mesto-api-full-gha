import logo from '../images/logo.svg';
import { Link, Route, Routes } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Лого Место" />
      <Routes>

        <Route path="/" element={<>
          <p className="header__email">{props.userEmail}</p>
          <Link className="header__link header__link_exit" to="/sign-in" onClick={props.handleExit}
          >Выйти
          </Link>
        </>}
        />

        <Route path="/sign-up" element={
          <><Link className="header__link" to="/sign-in">
            Войти
          </Link></>}
        />

        <Route path="/sign-in" element={
          <> <Link className="header__link" to="/sign-up">
            Регистрация
          </Link></>}
        />

      </Routes>
    </header>
  )
}

export default Header;
