import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Modal as UpdateModal,
  Alert,
} from "react-native";

import { useNotes } from "../../hooks/notes";

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
 note:INote;
}

interface INote{
  title: string;
  description?: string;
  annotation: string;
  id: number;
}

export function ModalDangerNoteoOperation({
  onClose,
  note
}: IProps) {
  const { deleteNote, loading } = useNotes();

  const [modalUpdate, setModalUpdate] = useState(false);

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
    setModalUpdate(true);
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
          <RepositoryOperations
            repository={{ title, description, id }}
            onClose={onClose}
          />
        </UpdateModal> */}
      </Container>
    </TouchableWithoutFeedback>
  );
}
