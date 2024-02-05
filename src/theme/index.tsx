import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { createPresets } from './options/presets';
import { createContrast } from './options/contrast';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {

  const presets = createPresets();

  const contrast = createContrast();

  const themeOptions = useMemo(() => ({
    palette: {
      ...palette(),
      ...presets.palette,
      ...contrast.palette,
    },
    customShadows: {
      ...customShadows(),
    },
    shadows: shadows(),
    shape: { borderRadius: 8 },
    typography,
  }), [presets.palette, contrast.palette]);

  const theme = createTheme(themeOptions as ThemeOptions);

  theme.components = componentsOverrides(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
