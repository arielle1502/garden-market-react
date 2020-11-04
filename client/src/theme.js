import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#AED1B1',
    },
    secondary: {
      main: '#DFEFE1',
    },
  },
  typography:{
    p: {
      fontFamily: "'Mulish', sans-serif"
    },
  h1: {
      fontFamily: "'Montserrat', sans-serif"
    },
    button: {
      fontFamily: "'Montserrat', sans-serif"
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '3.5rem',
  fontWeight: 'bolder'
    }
  }
});

export default theme;