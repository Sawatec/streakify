import React from "react";
import { StyledSpeechBubble, SpeechText, ButtonContainer, HighlightedText } from "./SpeechBubble.styles";
import Button from "../Button/Button";

interface SpeechBubbleProps {
  text: string;
  highlightedText?: string;
  buttons?: { label: string; onClick: () => void }[];
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, highlightedText, buttons }) => {
  return (
    <StyledSpeechBubble>
      <SpeechText>
        {text} {highlightedText && <HighlightedText>{highlightedText}</HighlightedText>}
      </SpeechText>
      {buttons && buttons.length > 0 && (
        <ButtonContainer>
          {buttons.map((button, index) => (
            <Button key={index} onClick={button.onClick}>
              {button.label}
            </Button>
          ))}
        </ButtonContainer>
      )}
    </StyledSpeechBubble>
  );
};

export default SpeechBubble;