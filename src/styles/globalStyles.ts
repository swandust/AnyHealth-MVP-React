import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url('../assets/fonts/Poppins-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('../assets/fonts/Poppins-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.text.secondary};
    color: ${props => props.theme.colors.text.primary};
  }

  * {
    box-sizing: border-box;
  }
`;