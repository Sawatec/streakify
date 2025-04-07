import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateProfilePicture } from "../../userSlice";

export const useProfilePicture = () => {
    const dispatch = useDispatch();

    // Profilbild aus dem Redux-Store laden
    const profilePicture = useSelector((state: RootState) => state.user.profilePicture);

    // Funktion zum Aktualisieren des Profilbilds
    const setProfilePicture = (newPicture: string) => {
        dispatch(updateProfilePicture(newPicture));
    };

    return [profilePicture, setProfilePicture] as const;  // as const sorgt für korrekte Typisierung
};
