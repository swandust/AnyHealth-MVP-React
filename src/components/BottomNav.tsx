import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

//assets
import logo from '../assets/icons/logo.svg';
import profileIcon from '../assets/icons/profile-icon.png';
import healthIcon from '../assets/icons/health-icon.png';


interface BottomNavProps {
  isCaregiverView: boolean;
  toggleView: () => void;
}

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${colors.black};
  font-size: 0.8rem;
`;

const CenterButton = styled.button`
  background-color: ${colors.primaryGreen};
  color: ${colors.white};
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-20px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const BottomNav: React.FC<BottomNavProps> = ({ isCaregiverView, toggleView }) => {
  return (
    <NavContainer>
      <NavButton onClick={toggleView}>
            <img src={profileIcon} alt="Profile" style={{ width: 32, height: 32 }} />
        <span>{isCaregiverView ? 'Patient' : 'Profile'}</span>
      </NavButton>
      
      <CenterButton>
        <img src={logo} alt="Home" style={{ width: 70, height: 70 }} />
      </CenterButton>
      
      <NavButton onClick={toggleView}>
        <img src={healthIcon} alt="Caregiver" style={{ width: 36, height: 36 }} />
        <span>{isCaregiverView ? 'Profile' : 'Caregiver'}</span>
      </NavButton>
    </NavContainer>
  );
};

export default BottomNav;