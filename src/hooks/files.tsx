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
  files: IFiles[];
  loadFiles(id: number): Promise<void>;
  deleteFile(id: number, noteId: number): Promise<void>;
  postFile({ file, title, noteId }: IPostFile): Promise<void>;
  loading: boolean;
}

interface IFileProps {
  name: string;
  size: number;
  uri: string;
  type: string;
}

interface IPostFile {
  file: Blob;
  title: string;

  noteId: number;
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
  const [files, setFiles] = useState({} as IFiles[]);
  async function deleteFile(id: number, noteId: number) {
    try {
      setLoading(true);
      await api.delete(`/api/file/${id}`);
      loadFiles(noteId);
    } catch (error) {
      throw new Error("Não foi possível deletar o anexo!");
    }
    setLoading(false);
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
    setLoading(false);
  }

  async function postFile({ file, title, noteId }: IPostFile) {
    console.log(file)
    console.log(noteId);
    console.log(title);
    try {
      setLoading(true);
      const dataform = new FormData();

      dataform.append("file", file);
      dataform.append("title", title);

      await api.post(`/api/files/${noteId}`, dataform);
      console.log("deu Certo");
      loadFiles(noteId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error("Não foi possível anexar o documento!")
      //setLoading(false);
    }
    setLoading(false);
  }

  return (
    <FilesContext.Provider
      value={{
        loadFiles,
        deleteFile,
        loading,
        files,
        postFile,
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
