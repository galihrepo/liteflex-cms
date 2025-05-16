import { Alert, Platform } from "react-native";

export const showAlert = (message: string) => {
  if (Platform.OS === "web") {
    alert(message);
  } else {
    Alert.alert("Informasi", message);
  }
};

export const showAlertChoice = (message: string, onYes?: () => void) => {
  if (Platform.OS === "web") {
    const confirm = window.confirm(message);
    if (confirm) onYes?.();
  } else {
    Alert.alert("Konfirmasi", message, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          onYes?.();
        },
      },
    ]);
  }
};
