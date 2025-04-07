import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onViewProfilePic: () => void;
    onUploadProfilePic: (event: React.ChangeEvent<HTMLInputElement>) => void;  // Die Funktion erwartet das Event
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onViewProfilePic, onUploadProfilePic }) => {
    const [showUploadSection, setShowUploadSection] = useState(false);

    if (!isOpen) return null;

    const handleUploadClick = () => {
        setShowUploadSection(true);
        // Kein Aufruf von onUploadProfilePic hier, da es mit dem event zusammenhängt
    };

    return (
        <div style={modalStyles}>
            <div style={modalContentStyles}>
                <h3>Wählen Sie eine Option</h3>
                <button onClick={onViewProfilePic}>Profilbild anzeigen</button>
                <button onClick={handleUploadClick}>Profilbild hochladen</button>
                <button onClick={onClose}>Schließen</button>

                {/* Zeigt das Upload-Formular nur, wenn showUploadSection true ist */}
                {showUploadSection && (
                    <div className="upload-container">
                        <h2>Profilbild hochladen</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onUploadProfilePic} // Event-Handler für das Hochladen des Bildes
                        />
                        <button onClick={onClose}>Abbrechen</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const modalStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyles: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export default Modal;
