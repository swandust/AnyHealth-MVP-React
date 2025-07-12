import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 5rem;
`;

const StatCard = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h4`
  color: ${colors.primaryGreen};
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
`;

const StatValue = styled.p`
  color: ${colors.black};
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const StatUnit = styled.span`
  font-size: 0.8rem;
  color: ${colors.black};
  opacity: 0.7;
`;

const HealthStats: React.FC = () => {
  // Hardcoded data for MVP
  const stats = [
    { title: 'Steps', value: '4,892', unit: 'steps' },
    { title: 'Heart Rate', value: '72', unit: 'bpm' },
    { title: 'Sleep', value: '7.5', unit: 'hours' },
    { title: 'Blood Pressure', value: '120/80', unit: 'mmHg' },
  ];

  return (
    <StatsContainer>
      {stats.map((stat, index) => (
        <StatCard key={index}>
          <StatTitle>{stat.title}</StatTitle>
          <StatValue>
            {stat.value} <StatUnit>{stat.unit}</StatUnit>
          </StatValue>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default HealthStats;