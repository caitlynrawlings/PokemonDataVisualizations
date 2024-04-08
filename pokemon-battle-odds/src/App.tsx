// React Imports
import * as React from "react";
import { Routes, Route } from "react-router-dom";

// Custom Imports
import Sidebar from "./app-components/Sidebar";
import Header from "./app-components/Header";
import BodyContainer from "./app-components/BodyContainer";
import { useToggle } from "./hooks/useToggle";

// Route Imports
import Home from "./pages/Home/Home";
import IndividualPokemon from "./pages/IndividualPokemon/IndividualPokemon";
import Rationale from "./pages/Rationale/Rationale";
import TheScaleInAllOfItsGlory from "./pages/TheScaleInAllOfItsGlory/TheScaleInAllOfItsGlory";
import StatFilter from "./pages/IndividualPokemon/StatFilter";

// MUI Imports
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TestPage from "./pages/TestPage/TestPage";
import Search from "./pages/Search/Search";

// MUI imports
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Graphing from "./pages/Graphing/Graphing";

// Adjusting the type of the MUI palette to
// allow for custom colors
declare module "@mui/material/styles" {
  interface button {
    restingText?: string;
    restingBackground?: string;
    hoverText?: string;
    hoverBackground?: string;
  }
  interface PaletteOptions {
    button?: button;
  }
  interface Palette {
    button: button;
  }
}

let lightAppTheme = createTheme({
  typography: {
    fontFamily: ["YuGothic"].join(","),
  },
  palette: {
    primary: {
      main: "#ee4000",
      light: "#9e3e3e",
    },
    secondary: {
      main: "#8f8d8d",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#000000",
    },
    button: {
      restingText: "#FFFFFF",
      restingBackground: "#ee4000",
      hoverText: "#3c52b2",
      hoverBackground: "#9e3e3e",
    },
  },
});

let darkAppTheme = createTheme({
  typography: {
    fontFamily: ["YuGothic"].join(","),
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "black",
        },
      },
    },
    MuiButton: {
      // Figure out how to change color
      // here instead of customizing palette stuff
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#64b5f6", // Change the color as per your requirement
          textDecoration: "underline", // Optional: Add underline
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#9e3e3e",
      light: "#d4d4d4",
      dark: "#421616",
    },
    secondary: {
      main: "#292929",
    },
    background: {
      default: "#4d4d4d",
    },
    text: {
      primary: "#FFFFFF", // causes the text in the dropdowns not to be visible
      secondary: "#000000",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    button: {
      restingText: "#FFFFFF",
      restingBackground: "#9e3e3e",
      hoverText: "#3c52b2",
      hoverBackground: "#421616",
    },
  },
});

function App() {
  const { state: drawerOpen, toggle: toggleDrawerOpen } = useToggle(false);
  const { state: darkModeOn, toggle: toggleDarkModeOn } = useToggle(false);

  return (
    <>
      <ThemeProvider theme={darkModeOn ? darkAppTheme : lightAppTheme}>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <CssBaseline />
          <Header
            drawerOpen={drawerOpen}
            toggleDrawerOpen={toggleDrawerOpen}
            darkModeOn={darkModeOn}
            toggleDarkModeOn={toggleDarkModeOn}
          />
          <Sidebar
            drawerOpen={drawerOpen}
            toggleDrawerOpen={toggleDrawerOpen}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "auto",
            }}
          >
            <Box sx={{ width: "100%", height: "64px" }} />
            <BodyContainer className={"BodyContainer"}>
              <Routes>
                <Route path={"/24wi/final-project/Pokemon-Battle-Odds/"} element={<Home isDarkMode={darkModeOn}/>} />
                <Route path={"/24wi/final-project/Pokemon-Battle-Odds/Graphing"} element={<Graphing />} />
                <Route
                  path={
                    "/24wi/final-project/Pokemon-Battle-Odds/IndividualPokemon"
                  } ///:filterName"}
                  element={<IndividualPokemon />}
                />
                <Route
                  path={"/24wi/final-project/Pokemon-Battle-Odds/StatFilter"}
                  element={<StatFilter />}
                />

                <Route
                  path={"/24wi/final-project/Pokemon-Battle-Odds/Rationale"}
                  element={<Rationale />}
                />
                <Route
                  path={
                    "/24wi/final-project/Pokemon-Battle-Odds/TheScaleInAllOfItsGlory"
                  }
                  element={<TheScaleInAllOfItsGlory />}
                />
                <Route
                  path={"/24wi/final-project/Pokemon-Battle-Odds/Search"}
                  element={<Search />}
                />
                <Route
                  path={"/24wi/final-project/Pokemon-Battle-Odds/TestPage"}
                  element={<TestPage />}
                />
              </Routes>
            </BodyContainer>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
