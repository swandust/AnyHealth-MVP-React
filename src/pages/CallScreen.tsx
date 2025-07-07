import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { getToday, formatTime } from '../utils/date';

interface CallScreenProps {
  endCall: () => void;
  isCaregiverView: boolean;
}

// Define props for AIMessage component
interface AIMessageProps {
  show: boolean;
}

const CallContainer = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.large};
`;

const CallerVideo = styled.div`
  width: 100%;
  height: 70vh;
  background-color: ${colors.black};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  position: relative;
`;

const CallerImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const CallerName = styled.h2`
  color: ${colors.white};
  margin-top: 1rem;
`;

const CallStatus = styled.p`
  color: ${colors.white};
  opacity: 0.8;
`;

const CallControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlButton = styled.button`
  background-color: ${colors.white};
  color: ${colors.primaryGreen};
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
`;

const EndCallButton = styled.button`
  background-color: #e74c3c;
  color: ${colors.white};
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
`;

// Properly typed AIMessage component
const AIMessage = styled.div<AIMessageProps>`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  max-width: 80%;
  font-size: 0.9rem;
  display: ${props => props.show ? 'block' : 'none'};
`;
//Today's date for AI prompt
const CallScreen: React.FC<CallScreenProps> = ({ endCall, isCaregiverView }) => {
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const today = getToday();
  const startTimeRef = useRef(new Date());

  // Hardcoded data for MVP
  const callerImage = isCaregiverView 
    ? require('../assets/images/patient-face.png')
    : require('../assets/images/caregiver-face.png');
  const callerName = isCaregiverView ? 'Ah Ma' : 'Ah Boy';
  

  
  // Toggle AI prompt visibility every 5 seconds for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setShowAIPrompt(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);



  // Simulate call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate local video stream
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(mediaStream => {
          stream = mediaStream;
          videoRef.current!.srcObject = mediaStream;
        })
        .catch(err => {
          // Optionally handle error (e.g., user denied camera)
          console.error("Camera error:", err);
        });
    }
    return () => {
      // Clean up: stop all tracks when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleEndCall = () => {
    if (isCaregiverView) {
      setShowSummary(true);
    } else {
      endCall();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };


return (
    <>
      {showSummary ? (
        <SummaryModal onClose={endCall} duration={callDuration} isCaregiverView={isCaregiverView} />
      ) : (
        <CallContainer>
          <CallerVideo>
            <LocalVideo ref={videoRef} autoPlay muted />
            <RemoteView>
              <CallerImage src={callerImage} alt={callerName} />
            </RemoteView>
            <AIMessage show={showAIPrompt && isCaregiverView}>
              AI Prompt: Ask about any dizziness or falls today
            </AIMessage>
          </CallerVideo>

          <CallInfo>
            <CallerName>{callerName}</CallerName>
            <CallStatus>Calling... {formatTime(startTimeRef.current)}</CallStatus>
            <CallDuration>{formatDuration(callDuration)}</CallDuration>
          </CallInfo>

          <CallControls>
            <ControlButton>🎤</ControlButton>
            <ControlButton>📷</ControlButton>
            <ControlButton>🔊</ControlButton>
          </CallControls>

          <EndCallButton onClick={handleEndCall}>End Call</EndCallButton>
        </CallContainer>
      )}
    </>
  );
};

// New components for CallScreen
const LocalVideo = styled.video`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 120px;
  height: 160px;
  border-radius: 8px;
  border: 2px solid ${colors.white};
  object-fit: cover;
`;

const RemoteView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CallInfo = styled.div`
  text-align: center;
`;

const CallDuration = styled.div`
  color: ${colors.white};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

// Summary Modal Component
interface SummaryModalProps {
  onClose: () => void;
  duration: number;
  isCaregiverView: boolean;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ onClose, duration, isCaregiverView }) => {
  const today = getToday();
  
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Conversation Recorded</ModalTitle>
        <ModalSubtitle>{today.date} - {formatTime(new Date())}</ModalSubtitle>
        <ModalDuration>{Math.floor(duration / 60)}mins {duration % 60}secs</ModalDuration>
        
        <SummarySection>
          <SummaryTitle>Patient Today</SummaryTitle>
          <SummaryItem>
            <strong>Medicine:</strong> Took Paracetamol at 8AM
          </SummaryItem>
          <SummaryItem>
            <strong>Mood:</strong> Happy and Energetic
          </SummaryItem>
          <SummaryItem>
            <strong>Activity:</strong> Played Tai Chi
          </SummaryItem>
          <SummaryItem>
            <strong>Meal:</strong> Breakfast - Noodle Soup
          </SummaryItem>
        </SummarySection>

        <ModalButtons>
          <ModalButton onClick={onClose}>Close</ModalButton>
          {isCaregiverView && (
            <ModalButton primary>Export as Note</ModalButton>
          )}
        </ModalButtons>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled components for Summary Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${colors.white};
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const ModalTitle = styled.h2`
  color: ${colors.primaryGreen};
  margin-bottom: 0.5rem;
`;

const ModalSubtitle = styled.p`
  color: ${colors.black};
  margin-bottom: 0.5rem;
`;

const ModalDuration = styled.p`
  color: ${colors.darkGreen};
  margin-bottom: 1.5rem;
`;

const SummarySection = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: ${colors.highlightPurple};
  border-radius: 8px;
`;

const SummaryTitle = styled.h3`
  color: ${colors.black};
  margin-bottom: 1rem;
`;

const SummaryItem = styled.p`
  margin: 0.5rem 0;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.primary ? colors.primaryGreen : colors.white};
  color: ${props => props.primary ? colors.white : colors.black};
  cursor: pointer;
  border: ${props => !props.primary ? `1px solid ${colors.black}` : 'none'};
`;

export default CallScreen;