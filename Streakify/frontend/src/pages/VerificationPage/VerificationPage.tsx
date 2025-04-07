import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import {
  Container,
  Form,
  Title,
  SubmitButton,
  ErrorMessage,
  Timer,
  ProgressBar,
  Instructions,
  Tooltip,
  TooltipText,
  SuccessMessage,
  SuccessIcon,
  SwitchContainer,
  ArrowUp,
} from "./VerificationPage.styles";
import UserServices from "../../ApiServices/UserServices";

const decodeToken = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const VerificationPage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [Error, setError] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 Minuten in Sekunden
  const [notification, setNotification] = useState<string | null>(null);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("verificationToken");
    const storedExpires = localStorage.getItem("verificationCodeExpires");

    if (!storedToken || !storedExpires) {
      console.log("Token fehlt oder zeit abgelaufen", storedToken, storedExpires);
      setError("Token fehlt");
      navigate("/register");
    } else {
      setToken(storedToken);
      const expires = parseInt(storedExpires, 10);
      const remainingTime = Math.max(0, Math.floor((expires - Date.now()) / 1000));
      console.log("Initial remaining time:", typeof remainingTime, remainingTime);
      setTimeLeft(remainingTime);

      // Überprüfen des Tokens und Weiterleiten, wenn er abgelaufen ist
      const decodedToken = decodeToken(storedToken);
      const currentTime = Date.now() / 1000; // Aktuelle Zeit in Sekunden
      if (decodedToken.exp < currentTime) {
        console.log("Token ist abgelaufen");
        navigate("/login");
      }
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          navigate("/login"); // Redirect to login when time is up
          return 0;
        }
        return prevTime - 1;
      });

      // Überprüfen des Tokens und Weiterleiten, wenn er abgelaufen ist
      if (token) {
        const decodedToken = decodeToken(token);
        const currentTime = Date.now() / 1000; // Aktuelle Zeit in Sekunden
        if (decodedToken.exp < currentTime) {
          console.log("Token ist abgelaufen");
          navigate("/login");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, token]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        const fadeOutTimer = setTimeout(() => {
          setNotification(null);
          setIsFadingOut(false);
        }, 500); // Zeit für die slide-out-Animation

        return () => clearTimeout(fadeOutTimer);
      }, 2500); // 2500ms + 500ms slide-out = 3000ms insgesamt

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!token) {
      setError("Token fehlt");
      setIsLoading(false);
      return;
    }

    const response = await UserServices.verifyUserWithCode(token, verificationCode);
    setIsLoading(false);
    if (response.success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate("/login");
      }, 4000); // 4 Sekunden warten, bevor zur Login-Seite weitergeleitet wird
    } else {
      setError(response.message || "Ein unbekannter Fehler ist aufgetreten");
    }
  };

  const handleResendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Verhindern Sie das Standardverhalten des Formulars
    setError(""); // Setzen Sie die Fehlermeldung zurück
    setIsLoading(true);

    if (!token) {
      setError("Token fehlt");
      setIsLoading(false);
      navigate("/register");
      return;
    }

    // Dekodieren des Tokens und Berechnen der verbleibenden Zeit
    const decodedToken = decodeToken(token);
    const currentTime = Date.now() / 1000; // Aktuelle Zeit in Sekunden
    const remainingTime = decodedToken.exp - currentTime; // Verbleibende Zeit in Sekunden
    const remainingMinutes = Math.floor(remainingTime / 60); // Verbleibende Zeit in Minuten
    const remainingSeconds = Math.floor(remainingTime % 60); // Verbleibende Zeit in Sekunden
    console.log(`Verbleibende Zeit für den Token: ${remainingMinutes} Minuten und ${remainingSeconds} Sekunden`);

    try {
      const response = await UserServices.resendVerificationCode(token);
      setIsLoading(false);
      if (response.status === 200) {
        setNotification("Verification code resent successfully");
        if (response.verificationCodeExpires !== undefined) {
          const expires = new Date(response.verificationCodeExpires).getTime();
          localStorage.setItem("verificationCodeExpires", expires.toString());
          const remainingTime = Math.max(0, Math.floor((expires - Date.now()) / 1000));
          console.log("Remaining time:", typeof remainingTime, remainingTime);
          setTimeLeft(remainingTime);
        }
        if (response.token) {
          setToken(response.token);
          localStorage.setItem("verificationToken", response.token);
        }
      } else {
        setError(response.message || 'Ein unbekannter Fehler ist aufgetreten');
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.message === "Ungültiger oder abgelaufener Token") {
        setError("Ihr Token ist abgelaufen. Bitte fordern Sie einen neuen Token an.");
      } else {
        setError(error.message || 'Ein unbekannter Fehler ist aufgetreten');
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Container>
      {notification && (
        <NotificationCard message={notification} onClose={() => setNotification(null)} isFadingOut={isFadingOut} />
      )}
      {showSuccessMessage ? (
        <SuccessMessage>
          <SuccessIcon />
          E-Mail erfolgreich verifiziert! Sie werden in Kürze zur Login-Seite weitergeleitet.
        </SuccessMessage>
      ) : (
        <Form onSubmit={handleSubmit}>
          <SwitchContainer onClick={() => {
            localStorage.setItem("previousPage", "verification");
            navigate("/register");
          }}>
            <ArrowUp />
            <span>Registrieren</span>
          </SwitchContainer>
          <Title>Verifiziere Dein Konto</Title>
          <Instructions>
            Bitte gib den Verifizierungscode ein, den wir an deine E-Mail-Adresse gesendet haben.
          </Instructions>
          <Tooltip>
            <Input type="text" placeholder="Verifizierungscode" value={verificationCode} onChange={handleInputChange} />
            <TooltipText>Geben Sie den Code ein, den Sie per E-Mail erhalten haben.</TooltipText>
          </Tooltip>
          <Input type="text" placeholder="Verifizierungscode" value={verificationCode} onChange={handleInputChange} />
          {Error && (
            <ErrorMessage>{Error}</ErrorMessage>
          )}
          <Timer>Verbleibende Zeit: {formatTime(timeLeft)}</Timer>
          <ProgressBar value={timeLeft} max={600} />
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Lädt..." : "Verifizieren"}
          </SubmitButton>
          <Button type="button" onClick={handleResendCode} disabled={isLoading}>
            {isLoading ? "Lädt..." : "Code erneut anfordern"}
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default VerificationPage;