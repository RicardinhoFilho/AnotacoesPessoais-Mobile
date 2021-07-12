import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Modal as UpdateModal,
  Alert,
} from "react-native";

import { useRepositories } from "../../hooks/repositories";
import { RepositoryOperations } from "../RepositoryOperations";

import {
  Container,
  Modal,
  TrashButton,
  TrashIcon,
  EditIcon,
  EditButton,
  Title,
  ButtonConatiner,
  RepositoryTitle,
  Loader,
} from "./styles";

interface IProps {
  onClose(): void;
  title: string;
  description?: string;
  id: number;
  navigation:any;
}

export function ModalDangerRepositoryOperation({
  onClose,
  title,
  description,
  id,
  navigation
}: IProps) {
  const { deleteRepository } = useRepositories();

  const [loading, setLoading] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      await deleteRepository(title, id);
      setLoading(false);
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
          <RepositoryTitle>{title}</RepositoryTitle>
          {loading && <Loader />}
          <ButtonConatiner>
            <TrashButton onPress={handleDelete}>
              <TrashIcon name="trash-2" />
            </TrashButton>
            <EditButton onPress={()=>{
              const repository = {id,title,description};
              console.log(repository)
                navigation.navigate("RepositoryOperations", {repository: repository})
             
            }}>
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
