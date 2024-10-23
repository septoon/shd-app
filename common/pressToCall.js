import { Linking } from "react-native";

export const pressToCall = (phoneNumber) => {
  Linking.canOpenURL(`tel:${phoneNumber}`).then((supported) => {
    if (supported) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.log('Телефонные звонки не поддерживаются на этом устройстве');
    }
  });
};