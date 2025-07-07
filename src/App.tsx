import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import Home from './pages/Home';
import Login from './pages/Login';
import Caregiver from './pages/Caregiver';
import CallScreen from './pages/CallScreen';

// Add type declaration for your theme
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      highlight: string;
      complementary: string;
      text: {
        primary: string;
        secondary: string;
      };
    };
    fonts: {
      primary: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  }
}


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCaregiverView, setIsCaregiverView] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleView = () => {
    setIsCaregiverView(!isCaregiverView);
  };

  const startCall = () => {
    setIsCalling(true);
  };

  const endCall = () => {
    setIsCalling(false);
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  if (isCalling) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CallScreen endCall={endCall} isCaregiverView={isCaregiverView} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isCaregiverView ? (
        <Caregiver toggleView={toggleView} startCall={startCall} />
      ) : (
        <Home toggleView={toggleView} startCall={startCall} />
      )}
    </ThemeProvider>
  );
};

export default App;