import React, { useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

import { ModalDangerRepositoryOperation } from "../ModalDangerRepositoryOperation";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Description } from "./styles";

import { useNotes } from "../../hooks/notes";

import { NotesModal } from "../NotesModal";

interface ICardProps {
  id: number;
  title: string;
  description?: string;
  invisible: boolean;
  showDangeourButtons?: boolean;
  setFilterIsPress(option: boolean): boolean;
  setFilterValue(option: string): boolean;
  navigation: any;
  /*filterIsPress={filterIsPress}
                filterValue={filterValue} */
}

export function Card({
  id,
  title,
  description,
  invisible,
  showDangeourButtons,
  setFilterIsPress,
  setFilterValue,
  navigation,
}: ICardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [dangerRepositoryOperationModal, setDangerRepositoryOperationModal] =
    useState(false);
  const [notesModal, setNotesModal] = useState(false);

  function handleLongPress() {
    setModalOpen(!modalOpen);
    handleOpenDangerRepositoryOperation();
  }

  async function handleOpenNotesModal() {
    navigation.navigate("Note", {
      onClose: handleCloseNotesModal,
      repositoryTitle: title,
      repositoryId: id,
      repositoryDescription: description,
    });
  }

  async function handleCloseNotesModal() {
    setNotesModal(false);
  }

  function handleCloseDangerRepositoryOperation() {
    setDangerRepositoryOperationModal(false);
  }
  function handleOpenDangerRepositoryOperation() {
    setDangerRepositoryOperationModal(true);
  }

  useEffect(() => {
    console.log(title);
  }, []);

  return (
    <Container
      invisible={invisible}
      onLongPress={handleLongPress}
      onPress={handleOpenNotesModal}
      delayLongPress={2000}
    >
      <Title>{title}</Title>

      {description ? (
        <Description>{description}</Description>
      ) : (
        <Description></Description>
      )}

      <Modal
        visible={dangerRepositoryOperationModal}
        animationType={"slide"}
        transparent={true}
      >
        <ModalDangerRepositoryOperation
          onClose={handleCloseDangerRepositoryOperation}
          title={title}
          description={description}
          id={id}
        />
      </Modal>

      {/* <Modal visible={notesModal} animationType={"slide"}>
        <NotesModal
          onClose={handleCloseNotesModal}
          repositoryTitle={title}
          repositoryId={id}
          repositoryDescription={description}
        /> 
      </Modal>*/}
    </Container>
  );
}
