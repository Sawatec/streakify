import React from "react";
import {
  MissionContainer,
  MissionTitle,
  MissionDescription,
  ProgressBarContainer,
  ProgressBar,
  MissionStatus,
  SparklingStars,
  Star,
} from "./mission.styles";

interface MissionProps {
  title: string;
  description: string;
  progress: number;
}

const CompletedMission: React.FC<MissionProps> = ({
  title,
  description,
  progress,
}) => {
  // Generiere Sterne für diese spezifische Mission
  const randomStars = Array.from({ length: 10 }).map(() => ({
    top: Math.random() * 100, // Position innerhalb des Mission-Containers
    left: Math.random() * 100, // Position innerhalb des Mission-Containers
    delay: Math.random() * 1.5, // Zufällige Verzögerung
  }));

  return (
    <MissionContainer>
      <MissionTitle>{title}</MissionTitle>
      <MissionDescription>{description}</MissionDescription>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      <MissionStatus>{progress}% abgeschlossen</MissionStatus>
      <SparklingStars>
        {randomStars.map((star, index) => (
          <Star key={index} top={star.top} left={star.left} delay={star.delay} />
        ))}
      </SparklingStars>
    </MissionContainer>
  );
};

export default CompletedMission;
