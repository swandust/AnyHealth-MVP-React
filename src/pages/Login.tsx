import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import logo from '../assets/images/logo.png';

interface LoginProps {
  onLogin: () => void;
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(circle at center, ${colors.highlightPurple} 40%, ${colors.white} 60%);
`;
const LogoImg = styled.img<{ visible: boolean }>`
  width: auto;
  height: 160px;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 1s ease;
  padding-left: 10%;
  `;

const Logo = styled.div`
  margin-bottom: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1<{ welcome?: boolean }>`
  color: ${colors.black};
  margin-bottom: 2rem;
  font-family: Poppins, Arial, sans-serif;
  font-weight: ${props => (props.welcome ? 1000 : 600)};
  color: ${props => (props.welcome ? colors.highlightGreen : colors.black)};
  justify-content: center;
`;


const SingpassButton = styled.button`
  background-color: ${colors.white};
  color: ${colors.primaryGreen};
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 20px;
  border: none;
  margin-bottom: 1rem;
  font-size: 1rem;
  width: 220px;
  outline: none;
`;

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

    useEffect(() => {
    // Fade in logo after mount
    setLogoVisible(true);
  }, []);

  // In a real app, you would verify Singpass here
  const handleLogin = () => {
    if (!name.trim() || !age.trim()) return;
    setShowGreeting(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

   return (
    <LoginContainer>
      <Logo>
        <LogoImg src={logo} alt="AnyHealth Logo" visible={logoVisible} />
      </Logo>
      {!showGreeting ? (
        <>
          <Title welcome> Welcome!</Title>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
          <SingpassButton onClick={handleLogin}>Login with Singpass</SingpassButton>
        </>
      ) : (
        <Title>Hi {name}! Welcome to AnyHealth.</Title>
      )}
    </LoginContainer>
  );
};

export default Login;