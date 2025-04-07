import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import InformationsContainer from "../../components/Container/InformationsContainer/InformationsContainer";
import SocialContainer from "../../components/Container/SocialContainer/SocialContainer";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { Container, NavbarContainer, MainContent, ProfileSection } from "./ProfilePage.styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const jwt = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        if (jwt == null) {
            navigate("/login");
        }
    }, [jwt, navigate]);

    if (jwt != null) {
        return (
            <Container>
                <NavbarContainer>
                    <Navbar />
                </NavbarContainer>
                <MainContent>
                    <ProfileSection>
                        <ProfileForm />
                    </ProfileSection>
                    <SocialContainer>
                    </SocialContainer>
                </MainContent>
            </Container>
        );
    }
    return null;
};

export default ProfilePage;