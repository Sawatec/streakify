import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dsalrs1mc", // Dein Cloud Name
  api_key: "564265293255654", // Dein API Key
  api_secret: "4MTsRcM_PDvWXUubkX7-sSdJLo0", // Dein Secret Key
});

export default cloudinary;
