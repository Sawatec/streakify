
export async function uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_unsigned_preset");
  
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsalrs1mc/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Fehler beim Hochladen des Bildes");
      }
  
      const data = await response.json();
      console.log("Hochgeladenes Bild:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Bild-Upload fehlgeschlagen:", error);
      throw error;
    }
  }