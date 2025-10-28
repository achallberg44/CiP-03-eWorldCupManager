import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MaxRundor from "./pages/maxRundor.jsx";
import SpecifikRunda from "./pages/specifikrunda.jsx";
import ValjSpelare from "./pages/valjSpelare.jsx";
import VemMoter from "./pages/vemMoter.jsx";
import Spelare from "./pages/spelare.jsx";
import Layout from "./components/layout.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Globalt tema för hela appen
const theme = createTheme({
  palette: {
    primary: {
      main: "#07291B",
      contrastText: "#fff",
    },
    secondary: {
      main: "#6A7451",
      contrastText: "#fff",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/maxrounds" element={<MaxRundor />} />
            <Route path="/specifikrunda" element={<SpecifikRunda />} />
            <Route path="/valjspelare" element={<ValjSpelare />} />
            <Route path="/vemmoter" element={<VemMoter />} />
            <Route path="/spelarlista" element={<Spelare />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
