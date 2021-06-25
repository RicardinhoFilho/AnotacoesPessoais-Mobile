import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

import { ModalDangerRepositoryOperation } from "../ModalDangerRepositoryOperation";

import { Feather } from "@expo/vector-icons";

import { Container, Title } from "./styles";
import { ModalDangerNoteoOperation } from "../ModalDangerNote";
import { Note } from "../Note";
import { FileView } from "../FileView";
import { ModalDangerFile } from "../ModalDangerFile";

interface ICardProps {
  file: string;
  id: number;
  title: string;
  noteId: number;
}

export function CardFiles({ id, title, file, noteId }: ICardProps) {
  const [fileView, setFileView] = useState(false);
  const [modalDangeour, setModalDangeour] = useState(false);

  function handleModalDangeour() {
    setModalDangeour(!modalDangeour);
  }
  function handleSetFileView() {
    setFileView(!fileView);
  }

  return (
    <Container onPress={handleSetFileView} onLongPress={handleModalDangeour}>
      <Title>{title}</Title>

      <Modal visible={fileView} animationType={"slide"}>
        <FileView
          handleClose={handleSetFileView}
          file={file}
          title={title}
          id={id}
        />
      </Modal>
      <Modal visible={modalDangeour} animationType={"slide"}>
        <ModalDangerFile
          onClose={handleModalDangeour}
          file={{ id, title }}
          noteId={noteId}
        />
      </Modal>
    </Container>
  );
}
