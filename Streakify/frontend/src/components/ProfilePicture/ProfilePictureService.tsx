import UserServices from "../../ApiServices/UserServices";
import cloudinary from "../../config/cloudinaryConfig";

interface UserUpdateData {
    _id: string;
    profilePicture: string;
}

interface UserResponse {
    _id: string;
    profilePicture: string;
}

export const uploadProfilePicture = async (file: File, userId: string, token: string) => {
    try {
        const response = cloudinary.uploader.upload_stream({
            folder: "uploads",
            public_id: userId,
            resource_type: "image",
        }, async (error: any, result: any) => {
            if (error) {
                throw new Error(`Fehler beim Cloudinary-Upload: ${error}`);
            }
            const profilePictureUrl = result.secure_url;
            const updateData: UserUpdateData = {
                _id: userId,
                profilePicture: profilePictureUrl
            };
            return await UserServices.updateUser(token, updateData);
        });
    } catch (error) {
        console.error(`Fehler beim Upload des Profilbildes: ${error}`);
        throw error;
    }
}

