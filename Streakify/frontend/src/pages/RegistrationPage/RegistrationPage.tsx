import React, { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Form,
  Title,
  SubmitButton,
  SocialButton,
  TermsText,
  ErrorMessage,
  SwitchContainer,
  ArrowUp,
  InputContainer,
  LoaderContainer,
  Loader,
  SuccessMessage,
  SuccessIcon,
  TutorialContainer,
  ArrowLeft,
} from "./RegistrationPage.styles";
import UserServices from "../../ApiServices/UserServices";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    isAdmin: "false"
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [slideInRight, setSlideInRight] = useState(false);
  const [slideInFromTop, setSlideInFromTop] = useState(true);
  const [slideOutRight, setSlideOutRight] = useState(false);
  const [slideOutDown, setSlideOutDown] = useState(false);
  const [animateTutorial, setAnimateTutorial] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const previousPage = localStorage.getItem("previousPage");
    if (previousPage === "verification") {
      setSlideInFromTop(false);
    } else if (previousPage === "login") {
      setSlideInRight(true);
      setSlideInFromTop(false);
    }
    localStorage.setItem("previousPage", "register");
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password.trim() !== '') {
      if (formData.password !== confirmPassword) {
        setError('Passwörter stimmen nicht überein');
        setLoading(false);
        return;
      }
    }
    if (formData.userName.trim() === '') {
      setError('Bitte geben Sie einen Benutzernamen ein');
      setLoading(false);
      return;
    }
    const response = await UserServices.registerUser(formData);
    if (response.status === 201 && response.token) {
      localStorage.setItem("verificationToken", response.token); // Token im localStorage speichern
      setLoading(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate("/verify");
      }, 4000); // 4 Sekunden warten, bevor zur Verifizierungsseite weitergeleitet wird
    } else {
      if (response.message) {
        setError(response.message);
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten'); // Optional: Standardfehlernachricht
      }
      setLoading(false);
    }
    console.log("Form submitted:", formData);
  };

  const handleSwitchToLogin = () => {
    setSlideOutDown(true);
    setTimeout(() => {
      navigate("/login");
    }, 300); // Wartezeit für die Animation
  };

  const handleTutorialClick = () => {
    setAnimateTutorial(true);
    setTimeout(() => {
      navigate("/");
    }, 300); // Wartezeit für die Animation
  };

  return (
    <Container $slideInRight={slideInRight} $slideInFromTop={slideInFromTop} $slideOutRight={slideOutRight} $slideOutDown={slideOutDown}>
      <LoaderContainer className={loading ? "visible" : ""}>
        <Loader />
      </LoaderContainer>
      {showSuccessMessage && (
        <SuccessMessage>
          <SuccessIcon />
          Registrierung erfolgreich! Sie werden in Kürze zur Verifizierung weitergeleitet.
        </SuccessMessage>
      )}
      {!showSuccessMessage && (
        <Form onSubmit={handleSubmit} $hidden={loading || showSuccessMessage}>
          <SwitchContainer onClick={handleSwitchToLogin} $hidden={loading || showSuccessMessage}>
            <ArrowUp />
            <span>Anmelden</span>
          </SwitchContainer>
          <Title>Erstelle Dein Profil</Title>
          <InputContainer>
            <Input type="text" placeholder="Username" name="userName" onChange={handleInputChange} />
          </InputContainer>

          <InputContainer>
            <Input type="email" placeholder="E-Mail" name="email" onChange={handleInputChange} />
          </InputContainer>
          <InputContainer>
            <Input type="password" placeholder="Passwort" name="password" onChange={handleInputChange} />
          </InputContainer>
          <InputContainer>
            <Input type="password" placeholder="Passwort wiederholen" name="confirmPassword" onChange={handleInputChange} />
          </InputContainer>
          {Error && (
            <ErrorMessage>{Error}</ErrorMessage>
          )}
          <SubmitButton type="submit">Account erstellen</SubmitButton>
          <SocialButton>Mit Facebook registrieren</SocialButton>
          <TermsText>
            Durch deine Anmeldung bei Habito erklärst du dich mit unseren <a href="/terms">Geschäftsbedingungen</a> und unserer <a href="/privacy">Datenschutzerklärung</a> einverstanden.
          </TermsText>
        </Form>
      )}
      {!loading && !showSuccessMessage && (
        <TutorialContainer $animate={animateTutorial} onClick={handleTutorialClick} $hidden={loading || showSuccessMessage}>
          <ArrowLeft />
          <span>Zum Tutorial</span>
        </TutorialContainer>
      )}
    </Container>
  );
};

export default RegistrationPage;