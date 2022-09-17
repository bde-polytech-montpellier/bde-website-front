import { createTheme } from "@mui/material";
import { blue, green, purple, red, teal, pink } from "@mui/material/colors";

const { palette } = createTheme();
declare module "@mui/material/styles" {
  interface Palette {
    blue?: Palette["primary"];
    red?: Palette["primary"];
    green?: Palette["primary"];
    purple?: Palette["primary"];
    greeny?: Palette["primary"];
    pink?: Palette["primary"];
  }
  interface PaletteOptions {
    blue?: PaletteOptions["primary"];
    red?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    purple?: PaletteOptions["primary"];
    greeny?: PaletteOptions["primary"];
    pink?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    blue: true;
    red: true;
    green: true;
    purple: true;
    greeny: true;
    pink: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    blue: true;
    red: true;
    green: true;
    purple: true;
    greeny: true;
    pink: true;
  }
}

export default createTheme({
  palette: {
    blue: palette.augmentColor({
      color: {
        main: blue[500],
      },
    }),
    red: palette.augmentColor({
      color: {
        main: red[400],
      },
    }),
    green: palette.augmentColor({
      color: {
        main: green[600],
      },
    }),
    purple: palette.augmentColor({
      color: {
        main: purple[400],
      },
    }),
    greeny: palette.augmentColor({
      color: {
        main: teal[400],
      },
    }),
    pink: palette.augmentColor({
      color: {
        main: pink[300],
      },
    }),
  },
});
