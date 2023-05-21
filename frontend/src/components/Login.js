import { useState } from 'react';


function Login(props) {
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
    props.signInUser(userPassword, userEmail);
  };

  return (
    <main className="content">
      <section className="auth">
        <form className="auth__form" onSubmit={handleSubmit}>
          <h1 className="auth__title">Вход</h1>
          <input type="email" className="auth__input" placeholder="Email" name="userEmail" required onChange={handleChangeEmail} value={userEmail ?? ''} />
          <input type="password" className="auth__input" placeholder="Пароль" name="userPassword" required onChange={handleChangePassword} value={userPassword ?? ''} />
          <button className="auth__button_input_save" type="submit">Войти</button>
        </form>
      </section>
    </main >
  )
}

export default Login;