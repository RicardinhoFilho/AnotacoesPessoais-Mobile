import React, { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import HTMLView from 'react-native-htmlview';

import { useFocusEffect } from "@react-navigation/native";
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
import { titleFormattedDataKey } from "../../Services/asyncStorage";
import { capitalize } from "../../Utils/capitalize";

interface Props {
  navigation: any;
  route: any;
  // note: INote;
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

export function Note({route, navigation}: Props) {
  const { loadFiles, loading, files } = useFiles();
  const [addFileModal, setAddFileModal] = useState(false)
  const [loadingNote, setLoadingNote] = useState(true);

  const [formatedTitle,setFormatedTitle] = useState(false);

  const htmlNote =
  route.params.note.annotation[0] === "{"
      ? draftToHtml(JSON.parse(route.params.note.annotation))
      : route.params.note.annotation;

    function handleFileModal(){
      setAddFileModal(!addFileModal);
    }

  useEffect(() => {
    loadFiles(route.params.note.id);
  }, [route.params.note]);

  useFocusEffect(
    useCallback(() => {
      async function getTitleFormatedState() {
        const titleState = await AsyncStorage.getItem(titleFormattedDataKey);
        console.log(titleState);
        setFormatedTitle(Boolean(titleState === "true")); //Verificando se precisamos formatar titulos
      }
      getTitleFormatedState();
      // console.log(formatedTitle)
    }, [])
  );

  return (
    <>
      <Header>
        <HandleTitle>
        <ReturnIcon onPress={()=>{
          navigation.goBack();
        }}>
          <AntDesign name="arrowleft" size={RFValue(24)} color="white" />
        </ReturnIcon>
        <Title>{formatedTitle ? capitalize(route.params.note.title): route.params.note.title}</Title>
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
                title={formatedTitle ? capitalize(item.title) : item.title}
                noteId={item.id}
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
          
          //  padding: RFValue(50),
           paddingLeft:RFValue(15), 
          // maxWidth: RFPercentage(100),
          // overflowY: "scroll",
        
        }}      
      /> 
      {/* <HTMLView
        value={htmlNote}
      /> */}
      </>
    <Modal visible={addFileModal}>
    <AddFile handleClose={handleFileModal} noteId={route.params.note.id}/>
    </Modal>

    </>
  );
}
