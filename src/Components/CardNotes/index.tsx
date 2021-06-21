import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

import { ModalDangerRepositoryOperation } from "../ModalDangerRepositoryOperation";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Description } from "./styles";

interface ICardProps {
  id: string | number;
  title: string;
  description?: string;
  invisible: boolean;
  showDangeourButtons?: boolean;
}

export function CardNotes({
  id,
  title,
  description,
  invisible,
  showDangeourButtons,
}: ICardProps) {
  return (
    <Container
      invisible={invisible}
      //   onLongPress={handleLongPress}
      //   onPress={handleOpenNotesModal}
    >
      <Title>{title}</Title>

      {description ? (
        <Description>{description}</Description>
      ) : (
        <Description></Description>
      )}
    </Container>
  );
}
