import React from 'react';
import { Container, ButtonWrapper, Button } from './AddHabitButton.styles';
import { Shadow } from '../Shadow/Shadow.styles'; // Korrigieren des Imports

interface AddHabitButtonProps {
    onClick: () => void;
}

const AddHabitButton: React.FC<AddHabitButtonProps> = ({ onClick }) => {
    return (
        <Container>
            <ButtonWrapper>
                <Button onClick={onClick}>
                    +
                </Button>
                <Shadow />
            </ButtonWrapper>
        </Container>
    );
};

export default AddHabitButton;