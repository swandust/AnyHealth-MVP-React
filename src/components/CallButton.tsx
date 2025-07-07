import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

interface CallButtonProps {
  image: string;
  name: string;
  onCall: () => void;
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CallCircle = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${colors.highlightGreen};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(80, 155, 82, 0.4);
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const CaregiverImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${colors.white};
`;

const CallLabel = styled.span`
  color: ${colors.black};
  font-weight: bold;
`;




const CallButton: React.FC<CallButtonProps> = ({ image, name, onCall }) => {
  return (
    <ButtonContainer>
      <CallCircle onClick={onCall}>
        <CaregiverImage src={image} alt={name} />
      </CallCircle>
      <CallLabel>CALL {name.toUpperCase()}</CallLabel>
    </ButtonContainer>
  );
};

export default CallButton;