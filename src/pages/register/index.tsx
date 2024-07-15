import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRegisterMutation } from "../../services/user.api";
import { EMAIL_REGEX } from "../../utils/constants";

export default function SignUp() {
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setError("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("firstName") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!name) setNameError("Имя не может быть пустым");
    if (!email) setEmailError("Email не может быть пустым");
    if (!password) setPasswordError("Пароль не может быть пустым");

    if (!EMAIL_REGEX.test(email)) setEmailError("Введите корректный email");
    if (password.length < 8)
      setPasswordError("Пароль должен быть не менее 8 символов");

    if (nameError || emailError || passwordError) return;

    await register({ name, email, password })
      .unwrap()
      .catch((error) => {
        const { data } = error;
        if (data.message.includes("email already exists")) {
          setEmailError("Пользователь с таким email уже существует");
          return;
        }

        console.error(error);
        setError(error.data.message);
      });
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="name"
                label="Имя"
                autoFocus
                error={!!nameError}
                helperText={nameError}
                onChange={() => setNameError("")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
                onChange={() => setEmailError("")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!passwordError}
                helperText={passwordError}
                onChange={() => setPasswordError("")}
              />
            </Grid>
          </Grid>

          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}

          <LoadingButton
            type="submit"
            fullWidth
            loading={isLoading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Регистрация
          </LoadingButton>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
