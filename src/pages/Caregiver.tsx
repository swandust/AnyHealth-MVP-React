import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import BottomNav from '../components/BottomNav';
import CallButton from '../components/CallButton';
import RefillPurchase from '../components/Medication/RefillPurchase';

import HealthStats from '../components/HealthStats';
import MedicationCalendar from '../components/Medication/MedicationCalendar';




interface CaregiverProps {
  toggleView: () => void;
  startCall: () => void;
}

const CaregiverContainer = styled.div`
  padding: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h2`
  color: ${colors.black};
  margin-bottom: 0.5rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${colors.black};
  margin-bottom: 1rem;
`;

const Caregiver: React.FC<CaregiverProps> = ({ toggleView, startCall }) => {
  // Hardcoded data for MVP
  const profileImage = require('../assets/images/patient-face.png');
  const patientImage = require('../assets/images/patient-photo.png');
  
  return (
    <>
      <CaregiverContainer>
        <Header>
          <Title>Caregiver View</Title>
          <ProfileButton onClick={toggleView}>
            <ProfileImage src={profileImage} alt="Profile" />
          </ProfileButton>
        </Header>
        
        <Section>
          <CallButton image={patientImage} name="Ah Ma" onCall={startCall} />
        </Section>
        
        <Section>
          <SectionTitle>Medication Refill</SectionTitle>
          <RefillPurchase />
        </Section>

        <Section>
            <SectionTitle>Patient Medication History</SectionTitle>
            <MedicationCalendar />
        </Section>
        
        <Section>
          <SectionTitle>Patient Health Today</SectionTitle>
          <HealthStats />
        </Section>


      </CaregiverContainer>
      
      <BottomNav isCaregiverView={true} toggleView={toggleView} />
    </>
  );
};

export default Caregiver;