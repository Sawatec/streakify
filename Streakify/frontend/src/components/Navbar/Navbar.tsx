import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { NavContainer, NotificationBadge, Logo, NavbarLinks, NavbarLink, UserInfo, Divider, LogoutButton, XPBarContainer, XPBar, XPText } from './Navbar.styles';
import { Link } from 'react-router-dom';
import { HabitIcon, ShopIcon, FriendsIcon, ProfileIcon } from '../../icons/Icon';
import { logout } from '../../userSlice';
import UserServices from '../../ApiServices/UserServices';
import MessageServices from '../../ApiServices/MessageServices';

const calculateXPForNextLevel = (level: number): number => {
    return 1000 + (200 * (level - 1)); // 1000 XP für Level 2, 1200 XP für Level 3, 1400 XP für Level 4, usw.
};

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.id);
    const token = useSelector((state: RootState) => state.user.token);
    const profilePicture = useSelector((state: RootState) => state.user.profilePicture);
    const xp = useSelector((state: RootState) => state.user.xp); // XP aus dem Redux-Store
    const level = useSelector((state: RootState) => state.user.level); // Level aus dem Redux-Store
    const [user, setUser] = useState<any>(null);
    const [hasNotifications, setHasNotifications] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                try {
                    const fetchedUser = await UserServices.getUser(userId);
                    if (fetchedUser) {
                        setUser(fetchedUser);
                    }
                } catch (error) {
                    console.error('Fehler beim Laden des Benutzers:', error);
                }
            }
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        const checkUserNotifications = async () => {
            try {
                if (userId) {
                    const hasUnreadNotifications = await MessageServices.checkNotifications(token!);
                    setHasNotifications(hasUnreadNotifications!);
                }
            } catch (error) {
                console.error('Fehler beim Überprüfen der Benachrichtigungen:', error);
            }
        };

        if (userId) {
            checkUserNotifications();
            intervalId = setInterval(checkUserNotifications, 5000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [userId, token]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const xpForNextLevel = calculateXPForNextLevel(level);

    return (
        <NavContainer>
            <Logo>Habito</Logo>
            {user && (
                <UserInfo>
                    <img src={profilePicture || "default-image.jpg"} alt="" />
                    <div>{user.name}</div>
                    <div id="level">Level: {level}</div> {/* Level aus dem Redux-Store */}
                    <XPBarContainer>
                        <XPBar xp={(xp / xpForNextLevel) * 100} /> {/* XP-Leiste füllen */}
                    </XPBarContainer>
                    <XPText>{Math.round(xp)} XP / {xpForNextLevel} XP</XPText> {/* XP-Text anzeigen */}
                </UserInfo>
            )}
            <Divider />
            <NavbarLinks>
                <NavbarLink>
                    <Link to="/dashboard">
                        <HabitIcon /> Dashboard
                    </Link>
                </NavbarLink>
                <NavbarLink>
                    <Link to="/missions">
                        <HabitIcon /> Missionen
                    </Link>
                </NavbarLink>
                <NavbarLink>
                    <Link to="/shop">
                        <ShopIcon /> Shop
                    </Link>
                </NavbarLink>
                <NavbarLink>
                    <Link to="/friends">
                        <FriendsIcon /> Freunde {!hasNotifications ? "" : "🟡"}
                    </Link>
                </NavbarLink>
                <NavbarLink>
                    <Link to="/profile">
                        <ProfileIcon /> Profil
                    </Link>
                </NavbarLink>
            </NavbarLinks>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavContainer>
    );
};

export default Navbar;