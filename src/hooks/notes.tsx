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

interface INotesContextData {
  handleSetRepositoryId(id: number): void;
  deleteNote(id: number, title: string): void;
  notes: INotes[];
  loading: boolean;
  reload(): Promise<void>;
  noteEffect: string; //para manipularmos a pesquisa em nossa sreen search
  setNoteEffect(effect: string): void;
}

interface INotes {
  title: string;
  description?: string;
  annotation?: string;
}

const NotesContext = createContext({} as INotesContextData);

function NotesProvider({ children }: IAuthProviderProps) {
  const [repositoryId, setRepositoryId] = useState(0);
  const [notes, setNotes] = useState({} as INotes[]);
  const [loading, setLoading] = useState(false);
  const [noteEffect, setNoteEffect] = useState("");

  function handleSetRepositoryId(id: number) {
    setRepositoryId(id);
  }

  async function deleteNote(id: number, title: string) {
    try {
      setLoading(true);
      await api.delete(`/api/note/${id}`);
      await getNotes(repositoryId);
      setLoading(false);
      setNoteEffect("delete");
    } catch (error) {
      console.log(error);

      throw new Error(`Não foi possível excluir a nota${title}`);
    }
  }

  async function getNotes(id: number) {
    try {
      setLoading(true);
      const response = await api.get(`/api/notes/${id}`);
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);

      throw new Error("Não foi possível carregar as notas");
    }
  }
  async function reload() {
    await getNotes(repositoryId);

    setNoteEffect("reload");
  }
  useEffect(() => {
    if (repositoryId > 0) {
      getNotes(repositoryId);
    }
  }, [repositoryId]);

  return (
    <NotesContext.Provider
      value={{
        handleSetRepositoryId,
        notes,
        loading,
        deleteNote,
        reload,
        noteEffect,
        setNoteEffect,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

function useNotes() {
  const context = useContext(NotesContext);

  return context;
}

export { NotesProvider, useNotes };
