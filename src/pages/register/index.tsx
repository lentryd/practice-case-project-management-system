import { useState } from "react";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import validEmail from "../../utils/validEmail";
import { useLazyMeQuery, useRegisterMutation } from "../../services/user.api";

export default function Register() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const nameValid = () => name.length > 0;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const emailValid = () => email.length > 0 && validEmail(email);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordValid = () => password.length >= 8;

  const [register, { isLoading }] = useRegisterMutation();
  const [triggerMeQuery] = useLazyMeQuery();

  const handleSubmit = async () => {
    setNameError(!nameValid());
    setEmailError(!emailValid());
    setPasswordError(!passwordValid());

    if (!emailValid()) {
      setEmailErrorMsg("Введите корректный email");
    }

    if (!nameValid() || !emailValid() || !passwordValid()) {
      return;
    }

    register({ name, email, password })
      .unwrap()
      .then(() => triggerMeQuery().unwrap())
      .catch((e) => {
        if (e.data?.message.includes("email already exists")) {
          setEmailError(true);
          setEmailErrorMsg("Этот email уже зарегистрирован");
          return;
        }

        console.error(e);
      });
  };

  return (
    <>
      <div className="info">
        <h1>Регистрация</h1>

        <span className="body-medium">
          Для использования системы необходимо авторизоваться
        </span>
      </div>

      <form className="content" onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          autocomplete="name"
          error={nameError}
          errorMsg="Введите имя"
          modelValue={name}
          onUpdateModelValue={(value) => {
            setName(value);
            setNameError(false);
          }}
        />
        <TextField
          label="Email"
          type="email"
          autocomplete="email"
          error={emailError}
          errorMsg={emailErrorMsg}
          modelValue={email}
          onUpdateModelValue={(value) => {
            setEmail(value);
            setEmailError(false);
          }}
        />
        <TextField
          label="Пароль"
          type="password"
          error={passwordError}
          errorMsg="Пароль должен содержать не менее 8 символов"
          modelValue={password}
          autocomplete="new-password"
          onUpdateModelValue={(value) => {
            setPassword(value);
            setPasswordError(false);
          }}
        />
      </form>

      <div className="actions">
        <Button to="/login" label="Уже есть аккаунт" />
        <Button
          label="Далее"
          filled
          loading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
