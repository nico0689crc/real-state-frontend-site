import { useSelector } from 'react-redux';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import customThemeCreator from 'themes/customThemeCreator';
import { QueryClientProvider } from "contexts/QueryClient";
import AppAuth from 'components/core/AppAuth/AppAuth';
import AppLayout from 'components/core/AppLayout/AppLayout';

const App = () => {
  const theme = useTheme();
  const customTheme = useSelector((state) => state.uiStore);

  return (
    <QueryClientProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={customThemeCreator({customTheme, theme})}>
          <CssBaseline />
          <AppAuth>
            <AppLayout />
          </AppAuth>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default App;
