import React from 'react';
import { StarsContainer, Star } from './StarsAnimation.styles'; // Importiere die Styles

const StarsAnimation: React.FC<{ show: boolean }> = ({ show }) => {
    return (
        <StarsContainer show={show}>
            <Star>XP</Star>
        </StarsContainer>
    );
};

export default StarsAnimation;