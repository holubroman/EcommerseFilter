import { grey } from '../palette';
import { customShadows } from '../custom-shadows';

// ----------------------------------------------------------------------

export function createContrast() {
  const theme = {
        palette: {
          background: {
            default: grey[200],
          },
        },
  };

  const components = {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: customShadows().z1,
          },
        },
      },
  };

  return {
    ...theme,
    components,
  };
}
