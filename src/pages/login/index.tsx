import { useState } from "react";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import validEmail from "../../utils/validEmail";
import { useLazyMeQuery, useLoginMutation } from "../../services/user.api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const emailValid = () => email.length > 0 && validEmail(email);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordValid = () => password.length >= 8;

  const [login, { isLoading }] = useLoginMutation();
  const [triggerMeQuery] = useLazyMeQuery();

  const handleSubmit = async () => {
    setEmailError(!emailValid());
    setPasswordError(!passwordValid());

    if (!emailValid() || !passwordValid()) {
      return;
    }

    try {
      await login({ email, password }).unwrap();
      await triggerMeQuery().unwrap();
    } catch (error) {
      setEmailError(true);
      setPasswordError(true);
      console.error(error);
    }
  };

  return (
    <>
      <div className="info">
        <h1 className="display-medium">Вход</h1>

        <span className="body-medium">
          Для использования системы необходимо авторизоваться
        </span>
      </div>

      <form className="content" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          autocomplete="email"
          error={emailError}
          errorMsg="Проверьте правильность введенного email"
          modelValue={email}
          onUpdateModelValue={(value) => {
            setEmail(value);
            setEmailError(false);
          }}
        />
        <TextField
          label="Пароль"
          type="password"
          autocomplete="current-password"
          error={passwordError}
          errorMsg="Проверьте правильность введенного пароля"
          modelValue={password}
          onUpdateModelValue={(value) => {
            setPassword(value);
            setPasswordError(false);
          }}
        />
      </form>

      <div className="actions">
        <Button to="/register" label="Создать аккаунт" />
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
