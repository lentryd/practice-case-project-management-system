import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLoginMutation } from "../../services/user.api";
import { EMAIL_REGEX } from "../../utils/constants";

export default function SignIn() {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setError("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!email) setEmailError("Email не может быть пустым");
    if (!password) setPasswordError("Пароль не может быть пустым");
    if (!email || !password) return;

    const isValidEmail = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      setEmailError("Введите корректный email");
      return;
    }

    await login({ email, password })
      .unwrap()
      .catch((error) => {
        const { data } = error;
        if (data.message.includes("Wrong email or password")) {
          setError("Неверный email или пароль");
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
          Войти
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={() => setEmailError("")}
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Пароль"
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                margin="normal"
                fullWidth
                onChange={() => setPasswordError("")}
                error={!!passwordError}
                helperText={passwordError}
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
            variant="contained"
            fullWidth
            loading={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </LoadingButton>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                {"Нет аккаунта? Зарегистрироваться"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
