import axios from "axios";
import toast from "react-hot-toast";

export const singleImageUpload = async (formData, setImage) => {
  const apiKey = "2c1161324f8945644a69cd9472a4d8a3";
  const imageBBUrl = "https://api.imgbb.com/1/upload";

  formData.set("key", apiKey);

  const {data} = await axios.post(imageBBUrl, formData);

  if (data.success === true) {
    setImage(data?.data?.display_url);
  } else {
    toast.error("Failed to upload image. Please try again.");
  }
};
