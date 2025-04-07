import React from "react";
import { StyledInput } from "./Input.styles";

// Typisierung erweitern, um alle Standard-HTML-Attribute zu unterstützen
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string; // Überschreiben von `type` als Pflichtfeld
  placeholder: string; // Überschreiben von `placeholder` als Pflichtfeld
};

const Input: React.FC<InputProps> = ({ type, placeholder, ...props }) => {
  return <StyledInput type={type} placeholder={placeholder} {...props} />;
};

export default Input;
