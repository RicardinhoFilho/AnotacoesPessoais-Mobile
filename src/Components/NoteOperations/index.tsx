import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {WebView} from "react-native-webview"

import { useRepositories } from "../../hooks/repositories";

import { Editor } from "react-draft-wysiwyg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {tokenDataKey} from "../../Services/asyncStorage"; 

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  Container,
  Header,
  ReturnIcon,
  Title,
  Form,
  Fields,
  InputForm,
  Attention,
  SubmitButton,
  ButtonText,
  HandleIconView,
  HandleTitleView,
  Loader,
} from "./styles";
import { RichEditor } from "../RichEditor";

interface IRepositoryOperations {
  note?: INote;
  onClose(): void;
}

interface ICreate {}

interface IUpdate {
  note: INote;
}

interface INote {
  id: number;
  title: string;
  description?: string;
  annotation: string;
}

export function NoteOperations({ note, onClose }: IRepositoryOperations) {
  const [richText, setRichText] = useState(true);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(() => {
    if (note) {
      return note.title;
    }
    return "";
  });
  const [description, setDescription] = useState(() => {
    if (note) {
      return note.description;
    }

    return "";
  });

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  function handleSetRichText() {
    setRichText(!richText);
  }

  function handleTitleError() {
    if (title.length < 3) {
      setTitleError("Título deve conter pelo menos 3 caractéres");
      return;
    }

    if (title.length > 50) {
      setTitleError("Título não pode conter mais de 50 caractéres");
      return;
    }

    setTitleError("");
  }

  function handleDescriptionError() {
    if (title.length < 3) {
      setDescriptionError(
        "Descrição deve conter pelo menos 3 caractéres ou ser vazia!"
      );
      return;
    }

    if (title.length > 150) {
      setDescriptionError("Descrição não pode conter mais de 150 caractéres");
      return;
    }

    setDescriptionError("");
  }

  async function handleRegister() {
    setLoading(true);
    handleDescriptionError();
    handleTitleError();
    onClose();

    if (!titleError && !descriptionError) {
      try {
        if (note) {
          // await updateRepository(note.id, note.title, title, description)
        } else {
          // await addRepository({ title, description });
        }
      } catch (error) {
        console.log(error);
        Alert.alert(error.message);
      }
    }

    setLoading(false);
  }

  return (
    <>
    <Header>
      <ReturnIcon
        onPress={() => {
          //console.log("cliqueii");
          onClose();
        }}
      >
        <AntDesign name="left" size={20} color="white" />
      </ReturnIcon>
      <HandleTitleView>
        <Title>{note ? "Atualizar Nota" : "Cadastrar Nota"}</Title>
      </HandleTitleView>
    </Header>
    <WebView source={{uri:`192.168.1.58:3000/mobile_editor/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI0OTAzOTczLCJleHAiOjE2MjQ5Mzk5NzN9.SW1N6tkkbeeRYcrA9nVlfXuBqvOiKk5bhhcmKbUaPeM/56` }}/>
    </>
  );
}
