import styled from "styled-components";

export const StyledSpeechBubble = styled.div`
  position: relative;
  max-width: 600px;
  margin: 10px auto 10px auto;
  padding: 1.5rem;
  background-color:rgba(20, 85, 85, 1);
  border-radius: 15px;
  border: none;
  box-shadow: 0 4px 6px rgb(70, 68, 68);
  color:  #f7f7f7;
  text-align: center;

  &:after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 20px 20px 0;
    border-style: solid;
    border-color: rgba(20, 85, 85, 1) transparent transparent transparent;
  }
`;

export const SpeechText = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const HighlightedText = styled.span`
  color: #ff8800; /* Farbe für das hervorgehobene Habit */
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: #f7f7f7;
`;