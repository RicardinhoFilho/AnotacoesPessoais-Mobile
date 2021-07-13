import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

import { ModalDangerRepositoryOperation } from "../ModalDangerRepositoryOperation";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Description } from "./styles";
import { ModalDangerNoteoOperation } from "../ModalDangerNote";
import { Note } from "../Note";
import { capitalize } from "../../Utils/capitalize";

interface ICardProps {
  id: number;
  title: string;
  description?: string;
  annotation: string;
  invisible: boolean;
  showDangeourButtons?: boolean;
  navigation: any;

  formatedTitle: boolean;
}

export function CardNotes({
  id,
  title,
  description,
  annotation,
  invisible,
  showDangeourButtons,
  navigation,
  formatedTitle,
}: ICardProps) {
  const [dangerNoteModalOperation, setDangerNoteModalOperation] =
    useState(false);
  const [noteModal, setNoteModal] = useState(false);

  function handleNoteModalOpen() {
    navigation.navigate("NoteDetails",{
      note:{  title, description, annotation, id },
    } )
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
      delayLongPress={500}
    >
      <Title>{formatedTitle? capitalize(title) : title}</Title>

      {description ? (
        <Description>{description}</Description>
      ) : (
        <Description></Description>
      )}

      <Modal visible={dangerNoteModalOperation}>
        <ModalDangerNoteoOperation
          note={{ title, description, annotation, id }}
          onClose={handleCLoseDangerNoteModalOperation}
          navigation={navigation}
        />
      </Modal>

      {/* <Modal visible={noteModal}>
        <Note
          note={{  title, description, annotation, id }}
          handleClose={handleNoteModalClose}
        /> 
      </Modal>*/}
    </Container>
  );
}
