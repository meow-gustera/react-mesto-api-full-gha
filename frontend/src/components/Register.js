import { Link } from "react-router-dom";
import { useState } from 'react';


function Register(props) {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.signUpUser(userPassword, userEmail);
  };

  return (
    <main className="content">
      <section className="auth">
        <form className="auth__form" onSubmit={handleSubmit} >
          <h1 className="auth__title">Регистрация</h1>
          <input type="email" className="auth__input" placeholder="Email" name="auth" required onChange={handleChangeEmail} value={userEmail ?? ''} />
          <input type="password" className="auth__input" placeholder="Пароль" name="userPassword" required onChange={handleChangePassword} value={userPassword ?? ''} />
          <button className="auth__button_input_save" type="submit">Зарегистрироваться</button>
          <Link className="auth__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </section>
    </main >
  )
}

export default Register;