import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { CLOUDINARY } from "../contants/cloudinary";
import { MediaType } from "../utils/mediaPicker";

export const useCloudinary = () => {
  const uploadToCloudinary = async (
    asset: ImagePicker.ImagePickerAsset,
    type: MediaType
  ): Promise<string> => {
    const file = asset.file;
    const data = new FormData();

    if (Platform.OS === "web") {
      if (file) {
        data.append("file", file);
      } else {
        console.error("Missing file in web upload");
        throw new Error("Missing file in web upload");
      }
    } else {
      data.append("file", {
        uri: asset.uri,
        name: `${Date.now()}${type === "images" ? ".jpg" : ".mp4"}`,
        type: type === "images" ? "image/jpeg" : "video/mp4",
      } as any);
    }

    data.append("upload_preset", CLOUDINARY.UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY.CLOUD_NAME);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/${
        type === "images" ? "image" : "video"
      }/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.secure_url;
  };

  return {
    uploadToCloudinary,
  };
};
