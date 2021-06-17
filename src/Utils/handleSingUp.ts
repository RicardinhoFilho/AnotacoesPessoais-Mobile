import api from "../Services/api";
import {
  emailDataKey,
  nameDataKey,
  passwordDataKey,
  photoDataKey,
} from "../Services/asyncStorage";

import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
  name: string;
  photo?: string;
  email: string;
  password: string;
}

export async function handleSingUp({ name, photo, email, password }: IProps) {
  try {

    photo ? await AsyncStorage.setItem(photoDataKey, photo) : "";

    await api.post("/api/user/logup", { email, password });
    await AsyncStorage.setItem(nameDataKey, name);
    await AsyncStorage.setItem(emailDataKey, email);
    await AsyncStorage.setItem(passwordDataKey, password);
  } catch (error) {
    Alert.alert(
      "Não possível efeturar o cadatro. \n Talvez seu email já esteja cadastrado!"
    );
  }
}
