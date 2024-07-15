import { ReactNode, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PaletteOptions } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMeQuery } from "./services/user.api";
import Loader from "./components/Loader";
import linkComponents from "./components/LinkBehavior";
import "./App.scss";

type Props = {
  children: ReactNode;
};

export default function App({ children }: Props) {
  // Get the user's preference for dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const palette: PaletteOptions = useMemo(
    () => ({
      mode: prefersDarkMode ? "dark" : "light",
    }),
    [prefersDarkMode]
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette,
        components: {
          ...linkComponents,
        },
      }),
    [palette]
  );

  // Load user data
  const { isLoading } = useMeQuery();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading ? <Loader /> : children}
    </ThemeProvider>
  );
}
