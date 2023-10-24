import axios from "./axios";
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

export const UploadCloudinaryService = async (file) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  return await axios.post(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    uploadData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};
