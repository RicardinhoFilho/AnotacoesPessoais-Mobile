import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CardFiles } from "../CardFiles";

import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  View,
  ScrollView,
} from "react-native";

import { loggedTypeDataKey } from "../../Services/asyncStorage";

import api from "../../Services/api";

import { useFiles } from "../../hooks/files";

import draftToHtml from "draftjs-to-html";

import {
  Container,
  Header,
  ReturnIcon,
  Title,
  Loader,
  FilesView,
  FilesList,
} from "./styles";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FileView } from "../FileView";

interface Props {
  handleClose: () => void;
  note: INote;
}

interface INote {
  title: string;
  description?: string;
  id: number;
  annotation: string;
}

interface IFile {
  file: string;
  id: string;
  title: string;
}

export function Note({ handleClose, note }: Props) {
  const { loadFiles, loading, files } = useFiles();

  const htmlNote =
    note.annotation[0] === "{"
      ? draftToHtml(JSON.parse(note.annotation))
      : note.annotation;

  useEffect(() => {
    loadFiles(note.id);
  }, [note]);

  return (
    <>
      <Header>
        <ReturnIcon onPress={handleClose}>
          <AntDesign name="left" size={20} color="white" />
        </ReturnIcon>
        <Title>{note.title}</Title>
      </Header>
      <FilesView>
        {loading ? (
          <Loader />
        ) : (
          <FilesList
            data={files}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardFiles
                file={item.file}
                id={item.id}
                title={item.title}
                noteId={item.noteId}
              />
            )}
          />
        )}
      </FilesView>
      <WebView
        source={{
          html: `${htmlNote}`,
        }}
        style={{
          backgroundColor: "#D3D3D3",
          padding: RFValue(50),
          maxWidth: RFPercentage(100),
          overflowY: "scroll",
        }}
      />
    </>
  );
}
