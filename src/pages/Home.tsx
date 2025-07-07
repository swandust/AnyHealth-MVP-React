import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import BottomNav from '../components/BottomNav';
import CallButton from '../components/CallButton';
import HealthStats from '../components/HealthStats';
import MedicationReminder from '../components/Medication/MedicationReminder';
import MedicationCalendar from '../components/Medication/MedicationCalendar';

interface HomeProps {
  toggleView: () => void;
  startCall: () => void;
}

const HomeContainer = styled.div`
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

const Greeting = styled.h2`
  color: ${colors.black};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${colors.primaryGreen};
  margin-top: 0;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${colors.black};
  margin-bottom: 1rem;
`;

const Home: React.FC<HomeProps> = ({ toggleView, startCall }) => {
  // Hardcoded data for MVP
  const profileImage = require('../assets/images/patient-face.png');
  const caregiverImage = require('../assets/images/caregiver-face.png');
  
  return (
    <>
      <HomeContainer>
        <Header>
          <div>
            <Greeting>Good morning, Ah Ma</Greeting>
            <Subtitle>How are you feeling today?</Subtitle>
          </div>
          <ProfileButton onClick={toggleView}>
            <ProfileImage src={profileImage} alt="Profile" />
          </ProfileButton>
        </Header>
        
        <Section>
          <CallButton image={caregiverImage} name="Ah Boy" onCall={startCall} />
        </Section>
        
        <Section>
          <SectionTitle>Today's Medication</SectionTitle>
          <MedicationReminder />
        </Section>
        
        <Section>
            <SectionTitle>Your Medication History</SectionTitle>
            <MedicationCalendar />
        </Section>
        
        <Section>
          <SectionTitle>Your Health Today</SectionTitle>
          <HealthStats />
        </Section>
      </HomeContainer>
      
      <BottomNav isCaregiverView={false} toggleView={toggleView} />
    </>
  );
};

export default Home;