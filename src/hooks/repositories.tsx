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

interface IAuthProviderProps {
  children: ReactNode;
}

interface IRepositoryContextData {
  repositories: IRepository[];
}

interface IRepository {
  title: string;
  description?: string;
}

const RepositoryContext = createContext({} as IRepositoryContextData);

function RepositoryProvider({ children }: IAuthProviderProps) {
  const [repositories, setRepositories] = useState({} as IRepository[]);



  return (
    <RepositoryContext.Provider
      value={{
        repositories,
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
}

function useRepositories() {
  const context = useContext(RepositoryContext);

  return context;
}

export { RepositoryProvider, useRepositories };
