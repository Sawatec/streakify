import React, { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import {
  Container, Form, Title, SubmitButton, SocialButton, TermsText, SwitchContainer, ArrowDown, InputContainer, TutorialContainer,
  ArrowLeft,
} from "./LoginPage.styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import UserServices from "../../ApiServices/UserServices";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState<string>('');
  const [slideInRight, setSlideInRight] = useState(false);
  const [slideInFromTop, setSlideInFromTop] = useState(true);
  const [slideOutRight, setSlideOutRight] = useState(false);
  const [slideOutUp, setSlideOutUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const previousPage = localStorage.getItem("previousPage");
    if (previousPage === "landing") {
      setSlideInRight(true);
      setSlideInFromTop(false);
    } else if (previousPage === "register") {
      setSlideInRight(false);
      setSlideInFromTop(true);
    }
    localStorage.setItem("previousPage", "login");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await UserServices.loginUser(formData.email, formData.password);

      const { token, user: { id, userName, email, profilePicture, companion, streak, xp, level } } = response;

      const companionData = companion || null;

      console.log("name in loginPage", userName);
      console.log("profilePicture in loginPage", profilePicture);
      console.log("companion in loginPage", companionData);

      console.log("streak in loginPage", streak);
      console.log("response in LoginPage", response);
      dispatch(login({ id, token, name: userName, email, profilePicture, companion: companionData, streak: streak, xp, level }));

      navigate("/dashboard");

    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response && error.response.status === 403 && error.response.data.redirect) {
        localStorage.setItem("verificationToken", error.response.data.token);
        localStorage.setItem("verificationCodeExpires", (Date.now() + 10 * 60 * 1000).toString());
        navigate(error.response.data.redirect);
      } else {
        setError(error.response?.data?.error || "Ein unbekannter Fehler ist aufgetreten");
      }
    }
  };

  const handleSwitchToRegister = () => {
    setSlideOutUp(true);
    setTimeout(() => {
      navigate("/register");
    }, 300); // Wartezeit für die Animation
  };

  const handleTutorialClick = () => {
    setSlideOutRight(true);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <Container $slideInRight={slideInRight} $slideInFromTop={slideInFromTop} $slideOutRight={slideOutRight} $slideOutUp={slideOutUp}>
      <Form onSubmit={handleSubmit}>
        <Title>Anmeldung</Title>
        <InputContainer>
          <Input
            type="email"
            placeholder="E-Mail"
            name="email"
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            placeholder="Passwort"
            name="password"
            onChange={handleInputChange}
          />
        </InputContainer>
        <SubmitButton type="submit">Anmelden</SubmitButton>
        <SocialButton>Mit Facebook anmelden</SocialButton>
        <SocialButton>Mit Google anmelden</SocialButton>
        <TermsText>
          Durch deine Anmeldung bei Habito erklärst du dich mit unseren{" "}
          <a href="/terms">Geschäftsbedingungen</a> und unserer{" "}
          <a href="/privacy">Datenschutzerklärung</a> einverstanden.
        </TermsText>
        <SwitchContainer onClick={handleSwitchToRegister}>
          <span>Registrieren</span>
          <ArrowDown />
        </SwitchContainer>
      </Form>
      <TutorialContainer onClick={handleTutorialClick}>
        <ArrowLeft />
        <span>Zum Tutorial</span>
      </TutorialContainer>
    </Container>
  );
};

export default LoginPage;