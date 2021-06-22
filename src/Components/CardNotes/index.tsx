import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

import { ModalDangerRepositoryOperation } from "../ModalDangerRepositoryOperation";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Description } from "./styles";
import { ModalDangerNoteoOperation } from "../ModalDangerNote";

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

  function handleLongPress() {
    setDangerNoteModalOperation(true);
  }

  function handleCLoseDangerNoteModalOperation() {
    setDangerNoteModalOperation(false);
  }

  return (
    <Container
      invisible={invisible}
      onLongPress={handleLongPress}
      //   onPress={handleOpenNotesModal}
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
    </Container>
  );
}
