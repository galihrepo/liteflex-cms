import * as ImagePicker from "expo-image-picker";

export type MediaType = "images" | "videos";

export const pickMedia = async (type: MediaType) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: [type],
    allowsEditing: true,
  });

  if (!result.canceled && result.assets?.[0]) {
    return result.assets[0];
  }

  return null;
};
