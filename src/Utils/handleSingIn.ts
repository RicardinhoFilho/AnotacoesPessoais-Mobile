import api from "../Services/api";
import {
  emailDataKey,
  nameDataKey,
  photoDataKey,
  passwordDataKey,
  tokenDataKey,
} from "../Services/asyncStorage";

import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
  name?: string;
  photo?: string;
  email: string;
  password: string;
}

export async function handleSingIn({ name, photo, email, password }: IProps) {
  try {
    name ? await AsyncStorage.setItem(nameDataKey, name) : "";
    console.log(name)
    photo ? await AsyncStorage.setItem(photoDataKey, photo) : "";
    const {
      data: { token },
    } = await api.post("/api/user/login", { email, password });
    //console.log(token);
    await AsyncStorage.setItem(emailDataKey, email);
    await AsyncStorage.setItem(passwordDataKey, password);
    await AsyncStorage.setItem(tokenDataKey, token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    
  } catch (error) {
    console.log(error);
    //Alert.alert("Cheque se seus dados foram preenchidos corretamente");
  }
}
