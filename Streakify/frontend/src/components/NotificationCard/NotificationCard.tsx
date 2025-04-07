import React, { useEffect } from "react";
import { NotificationContainer, NotificationMessage } from "./Notification.styles";

interface NotificationCardProps {
  message: string;
  onClose: () => void;
  isFadingOut: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ message, onClose, isFadingOut }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3000ms insgesamt

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <NotificationContainer isFadingOut={isFadingOut}>
      <NotificationMessage>{message}</NotificationMessage>
    </NotificationContainer>
  );
};

export default NotificationCard;