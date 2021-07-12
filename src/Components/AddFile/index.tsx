import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import { loggedTypeDataKey } from "../../Services/asyncStorage";

import api from "../../Services/api";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

import { useFiles } from "../../hooks/files";

import {
  Container,
  Header,
  ReturnIcon,
  Title,
  Form,
  Fields,
  InputForm,
  SubmitButton,
  ButtonText,
  Attention,
  Loader,
  ImageFeedback,
} from "./style";

interface Props {
  handleClose: () => void;
  noteId: number;
}

interface IFormData {
  title: string;
  file: IFile;
}

interface IFile {
  name: string;
  size: number;
  uri: string;
  type: string;
}

export function AddFile({ handleClose, noteId }: Props) {
  const { loading, postFile } = useFiles();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({} as IFile);

  const [titleIsValid, setTitleIsValid] = useState("");

  const pickDocument = async () => {
    var fileToUpload;
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        //console.log(fileToUpload, "...............file");
      }
    });

    if (fileToUpload) {
      setFile(fileToUpload);
    }
  };

  const postDocument = async () => {
    handleTitleIsValid();
    if (title.length > 0) {
      //handleClose();
      // console.log(file, "este");
      postFile({ file, title, noteId });
    }
  };

  function handleTitleIsValid() {
    if (title.length === 0) {
      setTitleIsValid("O arquivo deve conter um título!");
      return;
    }
    setTitleIsValid("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <ReturnIcon onPress={handleClose}>
            <AntDesign name="left" size={20} color="white" />
          </ReturnIcon>
          <Title>Anexar Imagem</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Título"
              onChangeText={setTitle}
              onBlur={handleTitleIsValid}
            />
            <Attention>{titleIsValid}</Attention>

            <ImageFeedback>{file.name}</ImageFeedback>

            <SubmitButton onPress={pickDocument}>
              <ButtonText>Escolher Imagem</ButtonText>
            </SubmitButton>

            {loading && <Loader />}

            <SubmitButton onPress={postDocument}>
              <ButtonText>Confirmar</ButtonText>
            </SubmitButton>
          </Fields>
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
}
