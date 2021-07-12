import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Modal as UpdateModal,
  Alert,
} from "react-native";

import { useNotes } from "../../hooks/notes";
import { NoteOperations } from "../NoteOperations";

import {
  Container,
  Modal,
  TrashButton,
  TrashIcon,
  EditIcon,
  EditButton,
  Title,
  ButtonConatiner,
  NoteTitle,
  Loader,
} from "./styles";

interface IProps {
  onClose(): void;
  note: INote;

  navigation:any;
}

interface INote {
  title: string;
  description?: string;
  annotation: string;
  id: number;
}

export function ModalDangerNoteoOperation({ onClose, note, navigation }: IProps) {
  const { deleteNote, loading } = useNotes();

 

  async function handleDelete() {
    try {
      await deleteNote(note.id, note.title);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
      onClose();
    }
  }

  function handleUpdate() {
    navigation.navigate("NoteOperations",{repositoryId:0, noteId:note.id});
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Container>
        <Modal>
          <Title>Deseja Excluir ou Editar</Title>
          <NoteTitle>{note.title}</NoteTitle>
          {loading && <Loader />}
          <ButtonConatiner>
            <TrashButton onPress={handleDelete}>
              <TrashIcon name="trash-2" />
            </TrashButton>
            <EditButton onPress={handleUpdate}>
              <EditIcon name="edit-3" />
            </EditButton>
          </ButtonConatiner>
        </Modal>
        {/* <UpdateModal visible={modalUpdate}>
          <NoteOperations onClose={handleUpdate} noteId={note.id} />
        </UpdateModal> */}
      </Container>
    </TouchableWithoutFeedback>
  );
}
