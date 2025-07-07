import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import logo from '../assets/icons/logo.svg';

interface LoginProps {
  onLogin: () => void;
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, ${colors.primaryGreen}, ${colors.darkGreen});
`;

const Logo = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${colors.white};
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primaryGreen};
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  color: ${colors.white};
  margin-bottom: 2rem;
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
      <Logo>        <img src={logo} alt="AnyHealth Logo" style={{ width: 100, height: 100, alignItems: 'center'}} /> </Logo>
      {!showGreeting ? (
        <>
          <Title>Welcome to Anyhealth</Title>
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