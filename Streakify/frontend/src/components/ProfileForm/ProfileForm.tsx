import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
    FormContainer,
    FormTitle,
    FormGroup,
    Label,
    Input,
    Button,
    BackButton,
    ErrorMessage
} from './ProfileForm.styles';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import InformationsContainer from '../Container/InformationsContainer/InformationsContainer';
import UserServices from '../../ApiServices/UserServices';

interface UserUpdateData {
    _id: string;
    name: string;
    userName: string;
    email: string;
    dateOfBirth: string;
    password?: string;
}

const ProfileForm: React.FC = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.id);
    const token = useSelector((state: RootState) => state.user.token);

    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                try {
                    const fetchedUser = await UserServices.getUser(userId);
                    if (fetchedUser) {
                        setUser(fetchedUser);
                        setName(fetchedUser.name || '');
                        setUsername(fetchedUser.userName || '');
                        setEmail(fetchedUser.email || '');
                        setBirthdate(fetchedUser.dateOfBirth || '');
                    }
                } catch (error) {
                    console.error('Fehler beim Laden des Benutzers:', error);
                }
            }
        };

        fetchUser();
    }, [userId]);

    const handleSave = async () => {
        // Reset password error
        setPasswordError('');

        // If password is not empty, check confirmation
        if (password.trim() !== '') {
            if (password !== confirmPassword) {
                setPasswordError('Passwörter stimmen nicht überein');
                return;
            }
        }

        try {
            const updateData: UserUpdateData = {
                _id: userId!,
                name: name,
                userName: username,
                email: email,
                dateOfBirth: birthdate
            };

            // Only add password if it's not empty
            if (password.trim() !== '') {
                updateData.password = password;
            }

            const response = await UserServices.updateUser(token!, updateData);

            if (response) {
                alert("Benutzer erfolgreich aktualisiert");
                // Reset password fields after successful update
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Benutzers:', error);
            alert('Fehler beim Aktualisieren des Benutzerprofils');
        }
    };

    const handleBack = () => {
        // Implementieren Sie die Zurück-Logik
    };

    return (
        <FormContainer>
            <FormTitle>Profil bearbeiten</FormTitle>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSave();
            }}>
                <ProfilePicture />
                <InformationsContainer />

                <FormGroup>
                    <Label htmlFor="username">Benutzername:</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        placeholder="Geben Sie Ihren Benutzernamen ein"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        placeholder="Geben Sie Ihren Namen ein"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="birthdate">Geburtsdatum:</Label>
                    <Input
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">Neues Passwort:</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Neues Passwort (optional)"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="confirmPassword">Passwort bestätigen:</Label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        placeholder="Neues Passwort bestätigen"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>

                {passwordError && (
                    <ErrorMessage>{passwordError}</ErrorMessage>
                )}

                <BackButton type="button" onClick={handleBack}>
                    Zurück
                </BackButton>
                <Button type="submit">
                    Speichern
                </Button>
            </form>
        </FormContainer>
    );
};

export default ProfileForm;