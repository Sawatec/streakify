import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FriendsPageContainer, NavbarWrapper, ContentContainer, LeftContainer, RightContainer } from './FriendsPage.styles';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ManageFriends from "../../components/Container/SocialContainer/ManageFriends";
import AddFriends from "../../components/Container/SocialContainer/AddFriends";
import FriendRequests from "../../components/FriendRequests/FriendRequests";

const FriendsPage: React.FC = () => {
    const navigate = useNavigate();
    const jwt = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        if (jwt == null) {
            navigate("/login");
        }
    }, [jwt, navigate]);

    if (jwt != null) {
        return (
            <FriendsPageContainer>
                <NavbarWrapper>
                    <Navbar />
                </NavbarWrapper>
                <ContentContainer>
                    <LeftContainer>
                        <ManageFriends />
                    </LeftContainer>
                    <RightContainer>
                        <FriendRequests />
                        <AddFriends />
                    </RightContainer>
                </ContentContainer>
            </FriendsPageContainer>
        );
    }
    return null;
};

export default FriendsPage;