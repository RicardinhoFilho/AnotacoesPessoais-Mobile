import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "./user";

import {
  emailDataKey,
  passwordDataKey,
  photoDataKey,
  nameDataKey,
  tokenDataKey,
} from "../Services/asyncStorage";
import { checkUserLogged } from "../Services/checkUserIsLogged";
import api from "../Services/api";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IRepositoryContextData {
  repositories: IRepository[];
  getRepositories(): Promise<void>;
  addRepository(repository: IRepository): Promise<void>;
  deleteRepository(title: string, id: number): Promise<void>;
  updateRepository(
    id: string,
    oldTitle: string,
    title: string,
    description?: string
  ): Promise<void>;
  repEffect: string;//"" | "update" | "add" | "delete"; //Este campo é utilizado para identificarmos alteração em nosso repositórios, dessa forma a screen search poderá decidir oq fará dependendo de cada operação ocorrida!
  setrepEffect(effect:string): void;
}

interface IRepository {
  title: string;
  description?: string;
}

const RepositoryContext = createContext({} as IRepositoryContextData);

function RepositoryProvider({ children }: IAuthProviderProps) {
  const { user, refreshToken, signOut } = useUser();

  const [repositories, setRepositories] = useState({} as IRepository[]);

  const [repEffect, setrepEffect] = useState("");

  async function getRepositories() {
    try {
      const { data } = await api.get<IRepository[]>("/api/repositories");
      setRepositories(data);
    } catch {
      try {
        await refreshToken();
        const { data } = await api.get<IRepository[]>("/api/repositories");
        setRepositories(data);
      } catch (error) {
        console.log(error);
        signOut();
      }
    }
  }

  async function deleteRepository(title: string, id: number) {
    try {
      await api.delete<IRepository[]>(`/api/repositories/${id}`);
      getRepositories();

      setrepEffect("delete");
    } catch {
      throw new Error(
        `Não foi possível excluir ${title}, pois contém notas axadas!`
      );
    }
  }

  async function addRepository(repository: IRepository) {
    try {
      const title = repository.title;
      const description = repository.description;

      const response = await api.post("/api/repositories", {
        title,
        description,
      });

      getRepositories();

      setrepEffect("add");
    } catch (error) {
      console.log(error);
      throw new Error(
        `Não foi possível adicionar o repositório ${repository.title}`
      );
    }
  }

  async function updateRepository(
    id: string,
    oldTitle: string,
    title: string,
    description?: string
  ) {
    try {
      description
        ? await api.patch(`/api/repositories/${id}`, {
            title,
            description,
          })
        : await api.patch(`/api/repositories/${id}`, {
            title,
          });

      getRepositories();
      setrepEffect("update");
    } catch (error) {
      console.log(error);
      throw new Error(`Não foi possível Editar o repositório ${oldTitle}`);
    }
  }

  useEffect(() => {
    getRepositories();
  }, []);

  return (
    <RepositoryContext.Provider
      value={{
        repositories,
        getRepositories,
        addRepository,
        deleteRepository,
        updateRepository,
        repEffect,
        setrepEffect
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
