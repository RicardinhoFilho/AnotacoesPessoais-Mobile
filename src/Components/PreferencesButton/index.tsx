import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

import { Button, ImageContainer, Text } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  icon: string;
}

export function PreferencesButton({ title, icon, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Feather name={icon} size={24} />
      </ImageContainer>

      <Text>{title}</Text>
    </Button>
  );
}
