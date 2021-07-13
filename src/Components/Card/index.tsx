import React, { useCallback, useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { ModalDangerRepositoryOperation } from "../ModalDangerRepositoryOperation";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Description } from "./styles";

import { useNotes } from "../../hooks/notes";

import { NotesModal } from "../NotesModal";
import { titleFormattedDataKey } from "../../Services/asyncStorage";
import { capitalize } from "../../Utils/capitalize";

interface ICardProps {
  id: number;
  title: string;
  description?: string;
  invisible: boolean;
  showDangeourButtons?: boolean;
  navigation: any;
  formatedTitle:boolean;
  /*filterIsPress={filterIsPress}
                filterValue={filterValue} */
}

export function Card({
  id,
  title,
  description,
  invisible,
  showDangeourButtons,
  navigation,
  formatedTitle,
}: ICardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [dangerRepositoryOperationModal, setDangerRepositoryOperationModal] =
    useState(false);
  const [notesModal, setNotesModal] = useState(false);
  // const[formatedTitle,setFormatedTitle] = useState(false);

  function handleLongPress() {
    setModalOpen(!modalOpen);
    handleOpenDangerRepositoryOperation();
  }

  async function handleOpenNotesModal() {
    // console.log
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

  return (
    <Container
      invisible={invisible}
      onLongPress={handleLongPress}
      onPress={handleOpenNotesModal}
      delayLongPress={500}
    >
      <Title>{formatedTitle? capitalize(title) : title}</Title>

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
          navigation={navigation}
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
