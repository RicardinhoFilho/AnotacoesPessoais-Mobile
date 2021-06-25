import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Modal as UpdateModal,
  Alert,
} from "react-native";

import { useFiles } from "../../hooks/files";
import api from "../../Services/api";

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
  file: IFile;

  noteId: number;
}

interface IFile {
  title: string;
  id: number;
}

export function ModalDangerFile({ onClose, file, noteId }: IProps) {
  const { deleteFile, loading } = useFiles();
  const [modalUpdate, setModalUpdate] = useState(false);

  async function handleDelete() {
    try {
      await deleteFile(file.id, noteId);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
      onClose();
    }
  }

  function handleUpdate() {
    // setModalUpdate(true);
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Container>
        <Modal>
          <Title>Deseja Excluir ou Editar</Title>
          <NoteTitle>{file.title}</NoteTitle>
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
