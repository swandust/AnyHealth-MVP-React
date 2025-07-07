import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

const RefillContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MedicationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${colors.highlightPurple};
  
  &:last-child {
    border-bottom: none;
  }
`;

const MedicationInfo = styled.div``;

const MedicationName = styled.span`
  font-weight: bold;
`;

const MedicationDosage = styled.span`
  font-size: 0.8rem;
  color: ${colors.primaryGreen};
`;

const RefillButton = styled.button`
  background-color: ${colors.primaryGreen};
  color: ${colors.white};
  border: none;
  border-radius: 15px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

const RefillPurchase: React.FC = () => {
  // Hardcoded data for MVP
  const medications = [
    { id: 1, name: 'Metformin', dosage: '500mg', remaining: '5 days left' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', remaining: '10 days left' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', remaining: '15 days left' },
  ];

  return (
    <RefillContainer>
      {medications.map(med => (
        <MedicationItem key={med.id}>
          <MedicationInfo>
            <MedicationName>{med.name}</MedicationName>
            <br />
            <MedicationDosage>{med.dosage} • {med.remaining}</MedicationDosage>
          </MedicationInfo>
          <RefillButton>Refill</RefillButton>
        </MedicationItem>
      ))}
    </RefillContainer>
  );
};

export default RefillPurchase;