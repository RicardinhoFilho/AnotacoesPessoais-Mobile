import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

import { ModalDangerRepositoryOperation } from "../ModalDangerRepositoryOperation";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Description } from "./styles";

interface ICardProps {
  id: number;
  title: string;
  description?: string;
  invisible: boolean;
  showDangeourButtons?: boolean;
}

export function Card({
  id,
  title,
  description,
  invisible,
  showDangeourButtons,
}: ICardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleLongPress() {
    setModalOpen(!modalOpen);
    //setInterval(()=>{setLongPress(false)}, 10000)
  }

  return (
    <Container invisible={invisible} onLongPress={handleLongPress}>
      <Title>{title}</Title>

      {description ? (
        <Description>{description}</Description>
      ) : (
        <Description></Description>
      )}

      <Modal visible={modalOpen} animationType={"slide"} transparent={true}>
        <ModalDangerRepositoryOperation
          onClose={handleLongPress}
          title={title}
          description={description}
          id={id}
        />
      </Modal>
    </Container>
  );
}
