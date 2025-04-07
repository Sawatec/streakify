import React from "react";
import {
  CompletedMission,
  MissionTitle,
  MissionDescription,
  MissionStatus,
  SparklingStars,
  Star,
  MissionContainer,
} from "./mission.styles";
import ProgressBar from "./ProgressBar";

interface MissionProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  type: string;
  completed: boolean;
  onComplete: () => void; // Callback-Funktion
}

const Mission: React.FC<MissionProps> = ({
  title,
  description,
  progress,
  completed,
  onComplete,
}) => {
  const formattedProgress = Math.round(progress);

  const randomStars = completed
    ? Array.from({ length: 8 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
      }))
    : [];

    const handleCompleteClick = () => {
      if (!completed && progress === 100) {
        onComplete(); // Callback aufrufen
      }
    };

  return (
    <div onClick={handleCompleteClick}>
      {completed ? (
        <CompletedMission>
          <MissionTitle>{title}</MissionTitle>
          <MissionDescription>{description}</MissionDescription>
          <ProgressBar progress={progress} />
          <MissionStatus>{formattedProgress}% abgeschlossen</MissionStatus>
          <SparklingStars>
            {randomStars.map((star, index) => (
              <Star
                key={index}
                delay={star.delay}
                top={star.top}
                left={star.left}
              />
            ))}
          </SparklingStars>
        </CompletedMission>
      ) : (
        <MissionContainer>
          <MissionTitle>{title}</MissionTitle>
          <MissionDescription>{description}</MissionDescription>
          <ProgressBar progress={progress} />
          <MissionStatus>{formattedProgress}% abgeschlossen</MissionStatus>
        </MissionContainer>
      )}
    </div>
  );
};

export default Mission;
