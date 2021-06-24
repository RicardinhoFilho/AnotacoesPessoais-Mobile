import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useRepositories } from "../../hooks/repositories";

import { Editor } from "react-draft-wysiwyg";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
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
        <Form>
          <Fields>
            <InputForm
              value={title}
              placeholder="Título"
              onChangeText={setTitle}
              onBlur={handleTitleError}
            />
            <Attention>{titleError}</Attention>

            <InputForm
              value={description}
              placeholder="Descrição"
              autoCorrect={false}
              onChangeText={setDescription}
              onBlur={handleDescriptionError}
            />
            <Attention>{descriptionError}</Attention>

            {loading && <Loader />}

            <SubmitButton onPress={handleRegister}>
              <ButtonText>Confirmar</ButtonText>
            </SubmitButton>
          </Fields>
        </Form>

        <Modal visible={false}>
          <RichEditor handleClose={handleSetRichText} />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );

  // RichEditor
}
