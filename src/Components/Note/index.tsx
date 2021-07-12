import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import HTMLView from 'react-native-htmlview';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CardFiles } from "../CardFiles";

import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  View,
  ScrollView,
  Modal,
} from "react-native";

 
import {AddFile} from "../AddFile";

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
  FileAddButton,
  FileAddText,
  LoadingNoteDiv,
  HandleTitle
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
  const [addFileModal, setAddFileModal] = useState(false)
  const [loadingNote, setLoadingNote] = useState(true);

  const htmlNote =
    note.annotation[0] === "{"
      ? draftToHtml(JSON.parse(note.annotation))
      : note.annotation;

    function handleFileModal(){
      setAddFileModal(!addFileModal);
    }

  useEffect(() => {
    loadFiles(note.id);
  }, [note]);

  return (
    <>
      <Header>
        <HandleTitle>
        <ReturnIcon onPress={handleClose}>
          <AntDesign name="arrowleft" size={RFValue(24)} color="white" />
        </ReturnIcon>
        <Title>{note.title}</Title>
        </HandleTitle>
      </Header>
      <FilesView>
        <FileAddButton onPress={handleFileModal}>
          <FileAddText/>
        </FileAddButton>
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
                noteId={note.id}
              />
            )}
          />
        )}
      </FilesView>
      <LoadingNoteDiv>
      { loadingNote && <Loader />}
      </LoadingNoteDiv> 
      <>
       <WebView
       originWhitelist={['*']}
       automaticallyAdjustContentInsets={false}
        onLoad={()=>{setLoadingNote(false)}}
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
      {/* <HTMLView
        value={htmlNote}
      /> */}
      </>
    <Modal visible={addFileModal}>
    <AddFile handleClose={handleFileModal} noteId={note.id}/>
    </Modal>

    </>
  );
}
