import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";

import {
  emailDataKey,
  nameDataKey,
  photoDataKey,
  passwordDataKey,
} from "../Services/asyncStorage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleSingIn } from "../Utils/handleSingIn";
import { handleSingUp } from "../Utils/handleSingUp";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  signInWithGoogle(): Promise<void>;
  // signInWithApple(): Promise<void>;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [] = useState();
  const [user, setUser] = useState({} as IUser);
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle(): Promise<void> {
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
        console.log(userLogged.name,"ESEEEE");
        try {
          handleSingIn(userLogged);
        } catch (error) {
          handleSingUp(userLogged);
          handleSingIn(userLogged);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
