import { createTheme } from '@mui/material/styles';
import componentStyleOverrides from './componentStyleOverrides';
import colors from './colors';
import { UI_VARIABLES } from "constants/ui";

export const customThemeCreator = ({customTheme, theme}) => {
  const themeOption = { 
    colors, 
    isDarkMode: customTheme.mode === UI_VARIABLES.UI_MODE_DARK,
    theme 
  };

  return createTheme({
    palette: {
      mode: customTheme.mode,
      primary: {
        ...colors.primary,
      },
    },
    components: componentStyleOverrides(themeOption),
    typography: {
      fontFamily: ['"Rubik"', '"Montserrat"', '"Roboto"', '"Caveat"', 'sans-serif'].join(',')
    }
  });
};

export default customThemeCreator;
