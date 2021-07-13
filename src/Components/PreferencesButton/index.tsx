import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons"; //importo esta lib port conta que quero utilizar um ícone dela específico representando títulos
import { FontAwesome5 } from "@expo/vector-icons"; //Utilizar ícone especifico de desformatação!

import { Button, ImageContainer, Text } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  icon: string;
  IconFamily: "Feather" | "Material" | "FontAwesome5";
}

export function PreferencesButton({ title, icon, IconFamily, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImageContainer>
        {IconFamily === "Feather" && <Feather name={icon} size={24} />}
        {IconFamily === "Material" && (
          <MaterialIcons name={icon} size={24} color="black" />
        )}
        {IconFamily === 'FontAwesome5' && <FontAwesome5 name={icon} size={21} color="black" /> }
      </ImageContainer>

      <Text>{title}</Text>
    </Button>
  );
}
