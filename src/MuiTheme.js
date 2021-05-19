import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2e2e2e'
      },
      secondary: {
        main: '#768d2f'
        // main: '#90a28a'
      }
    },
    typography: {
      h1: {
        fontSize: '2rem'
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: '400'
      },
    }
});
  
export default theme;