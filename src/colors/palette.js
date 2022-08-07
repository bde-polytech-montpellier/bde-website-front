import { createTheme } from "@mui/material";
import { blue, green, purple, red, teal } from "@mui/material/colors";

const { palette } = createTheme();

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
    yellow: palette.augmentColor({
      color: {
        main: teal[400],
      },
    }),
  },
});