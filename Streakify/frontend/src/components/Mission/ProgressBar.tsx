import React from "react";
import { ProgressBarContainer, ProgressBar as StyledProgressBar, LiquidOverlay } from "./mission.styles";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <LiquidOverlay progress={progress} /> {/* Wiederholender Liquid-Effekt */}
      <StyledProgressBar progress={progress} /> {/* Statischer Fortschrittsbalken */}
    </ProgressBarContainer>
  );
};

export default ProgressBar;
