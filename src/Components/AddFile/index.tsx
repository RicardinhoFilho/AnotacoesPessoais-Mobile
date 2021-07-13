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
  const [file, setFile] = useState({} as Blob);

  const [titleIsValid, setTitleIsValid] = useState("");
  const [fileIsValid, setFileIsValid] = useState("");

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
    try {
      //console.log(file.name)
      if (title.length > 0 && file.name) {
        //handleClose();
        // console.log(file, "este");
        //console.log("aqui tem file")
        postFile({ file, title, noteId });
        handleClose();
      }else{
        setFileIsValid("Nenhum arquivo selecionado");
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
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
            <AntDesign name="arrowleft" size={24} color="white" />
          </ReturnIcon>
          <Title>Anexar Arquivo</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Título"
              onChangeText={setTitle}
              onBlur={handleTitleIsValid}
            />
            <Attention>{titleIsValid}</Attention>
            <Attention>{fileIsValid}</Attention>

            <ImageFeedback>{file.name}</ImageFeedback>

            <SubmitButton onPress={()=>{
              setFileIsValid("");
              pickDocument();
              }}>
              <ButtonText>Escolher arquivo</ButtonText>
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
