import React from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { ExperienceBoardWrapper, UserName, ExperienceText, ProfileWrapper } from './ExperienceBoard.styles';

type ExperienceBoardProps = {
    children?: React.ReactNode;
};

const ExperienceBoard: React.FC<ExperienceBoardProps> = ({ children }) => {
    const userName = "Max Mustermann";
    const xp = 220;

    return (
        <ExperienceBoardWrapper>
            <ProfileWrapper>
                <ProfilePicture />
                <UserName>{userName ? userName : "Benutzername"}</UserName>
                <ExperienceText>{xp ? xp + " XP" : "Experience"}</ExperienceText>
            </ProfileWrapper>
            {children}
        </ExperienceBoardWrapper>
    );
};

export default ExperienceBoard;
