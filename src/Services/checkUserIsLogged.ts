import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  nameDataKey,
  photoDataKey,
  emailDataKey,
  passwordDataKey,
  tokenDataKey,
} from "./asyncStorage";

interface IUser {
  name?: string;
  photo?: string;
  email: string;
  password: string;
  token: string;
}

export async function checkUserLogged(): Promise<IUser> {
  const name = JSON.stringify(await AsyncStorage.getItem(nameDataKey));
  const photo = JSON.stringify(await AsyncStorage.getItem(photoDataKey));
  const email = JSON.stringify(await AsyncStorage.getItem(emailDataKey));
  const password = JSON.stringify(await AsyncStorage.getItem(passwordDataKey));
  const token = JSON.stringify(await AsyncStorage.getItem(tokenDataKey));

  const user = { name, photo, email, password, token };

  return user;
}
