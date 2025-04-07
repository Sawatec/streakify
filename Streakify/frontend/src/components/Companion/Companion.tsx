import React from "react";
import { StyledCompanion, CompanionWrapper } from "./Companion.styles";
import { CompanionShadow } from "../Shadow/Shadow.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Companion: React.FC = () => {
  const companion = useSelector((state: RootState) => state.user.companion);

  const companionSrc = companion ? companion : "https://res.cloudinary.com/dsalrs1mc/image/upload/v1738276684/llncem85jkdpmwg90llr.png";

  return (
    <CompanionWrapper>
      <StyledCompanion src={companionSrc} alt="Companion" />
      <CompanionShadow />
    </CompanionWrapper>
  );
};

export default Companion;