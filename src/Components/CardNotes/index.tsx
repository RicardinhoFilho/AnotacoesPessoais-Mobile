import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

import { ModalDangerRepositoryOperation } from "../ModalDangerRepositoryOperation";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Description } from "./styles";
import { ModalDangerNoteoOperation } from "../ModalDangerNote";
import { Note } from "../Note";

interface ICardProps {
  id: number;
  title: string;
  description?: string;
  annotation: string;
  invisible: boolean;
  showDangeourButtons?: boolean;
}

export function CardNotes({
  id,
  title,
  description,
  annotation,
  invisible,
  showDangeourButtons,
}: ICardProps) {
  const [dangerNoteModalOperation, setDangerNoteModalOperation] =
    useState(false);
  const [noteModal, setNoteModal] = useState(false);

  function handleNoteModalOpen() {
    setNoteModal(true);
  }

  function handleNoteModalClose() {
    setNoteModal(false);
  }

  function handleLongPress() {
    setDangerNoteModalOperation(true);
  }

  function handleCLoseDangerNoteModalOperation() {
    setDangerNoteModalOperation(false);
  }

  return (
    <Container
      invisible={invisible}
      onPress={handleNoteModalOpen}
      onLongPress={handleLongPress}
      delayLongPress={2000}
    >
      <Title>{title}</Title>

      {description ? (
        <Description>{description}</Description>
      ) : (
        <Description></Description>
      )}

      <Modal visible={dangerNoteModalOperation}>
        <ModalDangerNoteoOperation
          note={{ title, description, annotation, id }}
          onClose={handleCLoseDangerNoteModalOperation}
        />
      </Modal>

      <Modal visible={noteModal}>
        <Note
          note={{ title, description, annotation, id }}
          handleClose={handleNoteModalClose}
        />
      </Modal>
    </Container>
  );
}
