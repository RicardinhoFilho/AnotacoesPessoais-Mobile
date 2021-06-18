import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  nameDataKey,
  photoDataKey,
  emailDataKey,
  passwordDataKey,
  tokenDataKey,
} from "./asyncStorage";

export async function checkUserLogged(): Promise<boolean> {
  const email = await AsyncStorage.getItem(emailDataKey);
  const password = await AsyncStorage.getItem(passwordDataKey);

  return email && password ? true : false;
}
