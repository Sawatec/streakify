import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./LandingPage.styles";
import Companion from "../../components/Companion/Companion";
import SpeechBubble from "../../components/SpeechBubble/SpeechBubble";

const LandingPage: React.FC = () => {
  const [slideOut, setSlideOut] = useState(false);
  const navigate = useNavigate();

  const handleSkip = () => {
    setSlideOut(true);
    setTimeout(() => {
      localStorage.setItem("previousPage", "landing");
      navigate("/login");
    }, 300); // 1 Sekunde warten, bis die Animation abgeschlossen ist
  };

  const text = `Willkommen in der Welt von Habito!
Ich bin [Companion Name], und ich bin hier, um dir alles zu zeigen, was du wissen musst, um deine Ziele zu erreichen und tolle Gewohnheiten zu entwickeln.
Hättest du Lust, ein kleines Tutorial mit mir zu machen? Ich erkläre dir, wie du Habits anlegst und XP sammelst.
Wenn du später starten willst, ist das auch okay!`;

  return (
    <Container $slideOut={slideOut}>
      <SpeechBubble
        text={text}
        buttons={[
          { label: "Tutorial Starten!", onClick: () => navigate("/tutorial") },
          { label: "Überspringen", onClick: handleSkip },
        ]}
      />
      <Companion />
    </Container>
  );
};

export default LandingPage;