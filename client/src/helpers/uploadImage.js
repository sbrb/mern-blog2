import axios from "axios";

export const uploadImage = async (image, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "cloudinary");
  formData.append("api_key", "886465574151875");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: onUploadProgress,
    withCredentials: false,
  };

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/ddvjlniy0/image/upload",
    formData,
    config
  );
  const data = await res.data;

  if (!data) {
    throw new Error("Error uploading image");
  }

  const imageData = {
    publicId: data.public_id,
    url: data.secure_url,
  };

  return imageData;
};

