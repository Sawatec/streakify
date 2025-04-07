import styled from "styled-components";
import { CompanionShadow } from "../Shadow/Shadow.styles";

export const StyledCompanion = styled.img`
  width: 200px; 
  height: auto; 
  margin-top: 10px; 
  display: block; 
  z-index: 1;
`;

export const CompanionWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 200px; /* Gleiche Breite wie StyledCompanion */
  height: auto;
  margin-left: 90px;
`;