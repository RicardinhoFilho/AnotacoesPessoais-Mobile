import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import * as Google from "expo-google-app-auth";
import * as ApplesocialLoginentication from "expo-apple-authentication";

import { loggedTypeDataKey } from "../Services/asyncStorage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleSingIn } from "../Utils/handleSingIn";
import { handleSingUp } from "../Utils/handleSingUp";

interface ISocialLoginProviderProps {
  children: ReactNode;
}

interface IsocialLoginContextData {
  signInWithGoogle(): Promise<IUser | undefined>;
  // signInWithApple(): Promise<void>;
}

interface IUser {
  password: string;
  name: string;
  email: string;
  photo?: string;
}

const socialLoginContext = createContext({} as IsocialLoginContextData);

function SocialLoginProvider({ children }: ISocialLoginProviderProps) {
  const [] = useState();
  const [user, setUser] = useState({} as IUser);
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle(): Promise<IUser | undefined> {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "65361440743-r4q471v1vmg3ebhgr7lr6ero277v6h47.apps.googleusercontent.com",
        androidClientId:
          "65361440743-klfd0j3bgbggg3os4ji7ii4aus81a8hf.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const userLogged = {
          name: result.user.name!,
          photo: result.user.photoUrl!,
          email: result.user.email!,
          password: String(result.user.id),
        };

        AsyncStorage.setItem(loggedTypeDataKey, "google");

        return userLogged;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <socialLoginContext.Provider
      value={{
        signInWithGoogle,
      }}
    >
      {children}
    </socialLoginContext.Provider>
  );
}

function usesocialLogin() {
  const context = useContext(socialLoginContext);

  return context;
}

export { SocialLoginProvider, usesocialLogin };
