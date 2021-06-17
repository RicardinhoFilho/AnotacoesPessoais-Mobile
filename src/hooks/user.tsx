import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  emailDataKey,
  passwordDataKey,
  photoDataKey,
  nameDataKey,
  tokenDataKey,
} from "../Services/asyncStorage";
import { checkUserLogged } from "../Services/checkUserIsLogged";
import api from "../Services/api";
import { Alert } from "react-native";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUserContextData {
  user: IUser;
  signOut(): Promise<void>;
  userIsLogged: boolean;
  checkUserLogged(): Promise<void>;
  singIn({ name, photo, email, password }: IUser): Promise<void>;
  singUp({ name, photo, email, password }: IUser): Promise<void>;
}

interface IUser {
  name?: string;
  photo?: string;
  email: string;
  password: string;
  token?: string;
}

const UserContext = createContext({} as IUserContextData);

function UserProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState({} as IUser);
  const [loading, setLoading] = useState(true);
  const [userIsLogged, setUserIsLogged] = useState(false);

  async function signOut(): Promise<void> {
    //console.log("teste");
    setUserIsLogged(false);

    await AsyncStorage.removeItem(nameDataKey);
    await AsyncStorage.removeItem(photoDataKey);
    await AsyncStorage.removeItem(emailDataKey);
    await AsyncStorage.removeItem(passwordDataKey);
    await AsyncStorage.removeItem(tokenDataKey);
  }

  async function checkUserLogged() {
    const name = await AsyncStorage.getItem(nameDataKey);
    const photo = await AsyncStorage.getItem(photoDataKey);
    const email = await AsyncStorage.getItem(emailDataKey);
    const password = await AsyncStorage.getItem(passwordDataKey);
    const token = await AsyncStorage.getItem(tokenDataKey);

    if (email && password && token && photo && name) {
      setUser({ name, photo, email, password, token });
    } else if (email && password && token) {
      setUser({ email, password, token });
    } else {
      setUserIsLogged(false);
      return;
    }
    setUserIsLogged(true);
  }

  async function singIn({ name, photo, email, password }: IUser) {
    try {
      name ? await AsyncStorage.setItem(nameDataKey, name) : "";
      //console.log(name);
      photo ? await AsyncStorage.setItem(photoDataKey, photo) : "";
      const {
        data: { token },
      } = await api.post("/api/user/login", { email, password });
      //console.log(token);
      await AsyncStorage.setItem(emailDataKey, email);
      await AsyncStorage.setItem(passwordDataKey, password);
      await AsyncStorage.setItem(tokenDataKey, token);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser({ name, photo, email, password });
      console.log(user);
      setUserIsLogged(true);
    } catch (error) {
      console.log(error);
      //Alert.alert("Cheque se seus dados foram preenchidos corretamente");
    }
  }

  async function singUp({ name, photo, email, password }: IUser) {
    try {
      photo ? await AsyncStorage.setItem(photoDataKey, photo) : "";

      name ? await AsyncStorage.setItem(nameDataKey, name) : "";

      await api.post("/api/user/logup", { email, password });
      await AsyncStorage.setItem(emailDataKey, email);
      await AsyncStorage.setItem(passwordDataKey, password);
    } catch (error) {
      Alert.alert(
        "Não possível efeturar o cadatro. \n Talvez seu email já esteja cadastrado!"
      );
    }
  }

  useEffect(() => {
    checkUserLogged();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signOut,
        userIsLogged,
        checkUserLogged,
        singIn,
        singUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  return context;
}

export { UserProvider, useUser };
