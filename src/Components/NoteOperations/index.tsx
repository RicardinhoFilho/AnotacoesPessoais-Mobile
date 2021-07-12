import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import HTMLView from "react-native-htmlview";
import { useRepositories } from "../../hooks/repositories";

import { Editor } from "react-draft-wysiwyg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokenDataKey } from "../../Services/asyncStorage";

import { useUser } from "../../hooks/user";
import { useNotes } from "../../hooks/notes";
import {
  Container,
  Header,
  ReturnIcon,
  Title,
  Form,
  Fields,
  InputForm,
  Attention,
  SubmitButton,
  ButtonText,
  HandleIconView,
  HandleTitleView,
  Loader,
  HandleHeaderView,
} from "./styles";
import { RFPercentage } from "react-native-responsive-fontsize";

interface INoteOperations {
  navigation: any;
  route: any;
}

export function NoteOperations({ navigation, route }: INoteOperations) {
  const { user } = useUser();
  const { reload } = useNotes();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(user, "token");
    console.log(route.params.repositoryId);
  }, []);
  return (
    <>
      <Header>
        <HandleTitleView>
          <ReturnIcon
            onPress={() => {
              reload();
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={20} color="white" />
          </ReturnIcon>
          <Title>
            {Number(route.params.noteId) !== 0
              ? "Atualizar Nota"
              : "Cadastrar Nota"}
          </Title>
        </HandleTitleView>
      </Header>

      {loading && <Loader />}
      <>
        <WebView
          onLoadEnd={() => {
            setLoading(false);
          }}
          // source={{
          //   html: `<iframe src=`http://solucoes.sinsoft.com.br/mobile_editor/${user.token}/${route.params.repositoryId}`
          //   // source={{html: <iframe src=`http://solucoes.sinsoft.com.br/mobile_editor/${user.token}/${route.params.repositoryId}`}}/>,//
          // }}
          source={{
            html: Number(route.params.noteId) === 0 ? 
              (`<iframe width="100%" height="100%" src=` +
              `http://solucoes.sinsoft.com.br/mobile_editor/${user.token}/${route.params.repositoryId}/>`):
              (`<iframe width="100%" height="100%" src=` +
              `http://solucoes.sinsoft.com.br/mobile_edit_note/${user.token}/${route.params.noteId}/>`)
          }}
          //
        />
        {/* ${RFPercentage(100)} */}
      </>
    </>
  );
}
