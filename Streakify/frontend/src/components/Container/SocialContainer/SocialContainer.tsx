import React from 'react';
import ManageFriends from './ManageFriends'; // Importiere die ManageFriends-Komponente
import AddFriends from './AddFriends'; // Importiere die AddFriends-Komponente
import { SocialContainer as StyledSocialContainer } from './SocialContainer.styles';

type SocialContainerProps = React.PropsWithChildren<{}>;

const SocialContainer: React.FC<SocialContainerProps> = ({ children }) => {
    return (
        <StyledSocialContainer>
            {children}
            <ManageFriends />
            <AddFriends />
        </StyledSocialContainer>
    );
};

export default SocialContainer;