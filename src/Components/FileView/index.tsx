import React from "react";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import { checkExtension } from "../../Utils/checkExtension";
import { Linking } from "react-native";

import { Header, ReturnIcon, Title, OpenFile, ButtonText } from "./styles";

interface IFileProps {
  file: string;
  id: number;
  title: string;
  handleClose(): void;
}

export function FileView({ file, id, title, handleClose }: IFileProps) {
  function defineLink() {
    const extension = checkExtension(file.toLowerCase());
    if (extension === "pdf" || extension === "docx" || extension === "pptx") {
      return {option:false, extension};
    }

    return {option:true, extension};
  }

  const option = defineLink();
  const url = `http://cpro47698.publiccloud.com.br/uploads/${file}`;

  return (
    <>
      <Header>
        <ReturnIcon onPress={handleClose}>
          <AntDesign name="left" size={20} color="white" />
        </ReturnIcon>
        <Title>{title}</Title>
      </Header>
      {option.option ? (
        <WebView
          source={{
            uri: url,
          }}
        />
      ) : (
        <OpenFile onPress={()=>{Linking.openURL(url)}}>
          <ButtonText>Abrir {option.extension}</ButtonText>
        </OpenFile>
      )}
    </>
  );
}
