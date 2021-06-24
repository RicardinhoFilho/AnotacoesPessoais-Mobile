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

interface IAuthProviderProps {
  children: ReactNode;
}

interface IFilesContextData {
  files:IFiles[];
  loadFiles(id: number): Promise<void>;
  deleteFile(id: number): Promise<void>;
  loading: boolean;
}

export interface IFiles {
  title: string;
  file: string;
  id: string;
  noteId: number;
}

const FilesContext = createContext({} as IFilesContextData);

function FilesProvider({ children }: IAuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const[files,setFiles] = useState({} as IFiles[])
  async function deleteFile(id: number) {
    try {
      setLoading(true);
      await api.delete(`/api/file/${id}`);
      setLoading(false);
    } catch (error) {
      throw new Error("Não foi possível deletar o anexo!");
    }
  }

  async function loadFiles(id: number) {
    try {
      setLoading(true);
      const response = await api.get(`/api/files/${id}`);
      setFiles(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error("Não foi possível carregar os anexos!");
    }
  }

  return (
    <FilesContext.Provider
      value={{
        loadFiles,
        deleteFile,
        loading,
        files
      }}
    >
      {children}
    </FilesContext.Provider>
  );
}

function useFiles() {
  const context = useContext(FilesContext);

  return context;
}

export { FilesProvider, useFiles };
