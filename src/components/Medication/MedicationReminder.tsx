import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { getToday } from '../../utils/date';

interface Medication {
  id: number;
  name: string;
  time: string;
  taken: boolean;
  missed: boolean;
  nextDose?: string;
}

const MedicationReminder: React.FC = () => {
  const today = getToday();
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Metformin', time: '8:00 AM', taken: false, missed: false, nextDose: '8:00 PM' },
    { id: 2, name: 'Lisinopril', time: '12:00 PM', taken: false, missed: false },
    { id: 3, name: 'Atorvastatin', time: '8:00 PM', taken: false, missed: false },
  ]);

  const handleTake = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: true, missed: false } : med
    ));
  };

  const handleMiss = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: false, missed: true } : med
    ));
  };

  return (
    <ReminderContainer>
      <DateHeader>{today.date}</DateHeader>
      {medications.map(med => (
        <MedicationItem key={med.id} taken={med.taken} missed={med.missed}>
          <MedicationInfo>
            <MedicationIcon>💊</MedicationIcon>
            <div>
              <MedicationName>{med.name}</MedicationName>
              <MedicationTime>{med.time}</MedicationTime>
              {med.missed && med.nextDose && (
                <NextDose>Next dose: {med.nextDose}</NextDose>
              )}
            </div>
          </MedicationInfo>
          {med.taken ? (
            <StatusBadge success>Good Job!</StatusBadge>
          ) : med.missed ? (
            <StatusBadge urgent>PLEASE TAKE NOW</StatusBadge>
          ) : (
            <ActionButtons>
              <TakeButton onClick={() => handleTake(med.id)}>Take</TakeButton>
              <MissButton onClick={() => handleMiss(med.id)}>Miss</MissButton>
            </ActionButtons>
          )}
        </MedicationItem>
      ))}
    </ReminderContainer>
  );
};

// Updated styled components
const ReminderContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DateHeader = styled.h3`
  color: ${colors.primaryGreen};
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.highlightPurple};
`;

interface MedicationItemProps {
  taken: boolean;
  missed: boolean;
}

const MedicationItem = styled.div<MedicationItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${colors.highlightPurple};
  background-color: ${props => 
    props.taken ? 'rgba(80, 155, 82, 0.1)' : 
    props.missed ? 'rgba(231, 76, 60, 0.1)' : 'transparent'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const MedicationInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const MedicationIcon = styled.span`
  margin-right: 1rem;
  font-size: 1.5rem;
`;

const MedicationName = styled.div`
  font-weight: bold;
`;

const MedicationTime = styled.div`
  font-size: 0.8rem;
  color: ${colors.primaryGreen};
`;

const NextDose = styled.div`
  font-size: 0.7rem;
  color: ${colors.black};
  opacity: 0.7;
  margin-top: 0.2rem;
`;

interface StatusBadgeProps {
  success?: boolean;
  urgent?: boolean;
}

const StatusBadge = styled.div<StatusBadgeProps>`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${props => 
    props.success ? colors.highlightGreen : 
    props.urgent ? '#e74c3c' : 'transparent'};
  color: ${props => props.success || props.urgent ? colors.white : colors.black};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TakeButton = styled.button`
  background-color: ${colors.highlightGreen};
  color: ${colors.white};
  border: none;
  border-radius: 15px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

const MissButton = styled.button`
  background-color: ${colors.white};
  color: '#e74c3c';
  border: 1px solid '#e74c3c';
  border-radius: 15px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

export default MedicationReminder;