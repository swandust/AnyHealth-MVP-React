import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { getToday } from '../../utils/date';

const MedicationCalendar: React.FC = () => {
  const today = getToday();
  
  // Mock data for calendar
  const adherenceData = [
    { date: '7/1/2025', adherence: 100 },
    { date: '7/2/2025', adherence: 100 },
    { date: '7/3/2025', adherence: 50 },
    { date: '7/4/2025', adherence: 100 },
    { date: '7/5/2025', adherence: 75 },
    { date: '7/6/2025', adherence: 100 },
    { date: today.date, adherence: 0 }, // Today
  ];

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>Medication Adherence</CalendarTitle>
        <ViewMoreLink>View Full Calendar</ViewMoreLink>
      </CalendarHeader>
      
      <WeekGrid>
        {adherenceData.map((day, index) => (
          <DayCell key={index} adherence={day.adherence} isToday={day.date === today.date}>
            <DayDate>{day.date.split('/')[1]}</DayDate>
            <DayAdherence>
              {day.adherence === 100 ? '✓' : day.adherence > 0 ? `${day.adherence}%` : '✗'}
            </DayAdherence>
          </DayCell>
        ))}
      </WeekGrid>
      
      <AdherenceSummary>
        Weekly Adherence: <strong>85%</strong>
      </AdherenceSummary>
    </CalendarContainer>
  );
};

// Styled components
const CalendarContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CalendarTitle = styled.h3`
  color: ${colors.black};
  margin: 0;
`;

const ViewMoreLink = styled.a`
  color: ${colors.primaryGreen};
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

interface DayCellProps {
  adherence: number;
  isToday: boolean;
}

const DayCell = styled.div<DayCellProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${props => 
    props.isToday ? colors.highlightPurple :
    props.adherence === 100 ? 'rgba(80, 155, 82, 0.2)' :
    props.adherence > 0 ? 'rgba(255, 165, 0, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  border: ${props => props.isToday ? `2px solid ${colors.primaryGreen}` : 'none'};
`;

const DayDate = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
`;

const DayAdherence = styled.div`
  font-weight: bold;
`;

const AdherenceSummary = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${colors.black};
`;

export default MedicationCalendar;