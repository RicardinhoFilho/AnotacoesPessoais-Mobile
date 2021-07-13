import React, { useEffect, useState } from "react";
import { PreferencesButton } from "../../Components/PreferencesButton";
import { SignInSocialButton } from "../../Components/SingninSocialButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Modal } from "react-native";
import {
  loggedTypeDataKey,
  titleFormattedDataKey,
} from "../../Services/asyncStorage";

import { useUser } from "../../hooks/user";
import { usesocialLogin } from "../../hooks/socialLogin";

import AppleSvg from "../../Assets/apple.svg";
import GoogleSvg from "../../Assets/google.svg";
import SinsoftSvg from "../../Assets/logo-sinsoft-removebg-preview.svg";

import { SinsoftUpdatePassword } from "../../Components/SinsoftUpdatePassword";

import {
  Container,
  Header,
  Icon,
  LogoutButton,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  Main,
  MainWrapper,
} from "./styles";

import { UseSinsoftAccount } from "../../Components/UseSinsoftAccount";

export function Account() {
  const { signInWithGoogle } = usesocialLogin();

  const { user, signOut, useGoogleAccount } = useUser();
  const [loggedType, setLoggedType] = useState("");
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
  const [useSinsoftAccountModal, setUseSinsoftAccountModal] = useState(false);
  const [formatedTitle, setFormatedTitle] = useState(true);

  async function handleUseGoogleAccount() {
    const google = await signInWithGoogle();
    try {
      if (google) {
        await useGoogleAccount(google);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  async function handleSetLoggedType() {
    const data = await AsyncStorage.getItem(loggedTypeDataKey);
    data ? setLoggedType(data) : "";
  }

  function handleUseSinsoftAccountModal() {
    setUseSinsoftAccountModal(!useSinsoftAccountModal);
  }

  function handleUpdatePasswordModal() {
    setUpdatePasswordModal(!updatePasswordModal);
  }

  async function handleFormatTitle() {
    await AsyncStorage.setItem(titleFormattedDataKey, "true");
    setFormatedTitle(true);
  }

  async function handleUnormatTitle() {
    await AsyncStorage.setItem(titleFormattedDataKey, "false");
    setFormatedTitle(false);
  }

  useEffect(() => {
    async function getTitleFormatedState(){
     const titleState = await AsyncStorage.getItem(titleFormattedDataKey);
     setFormatedTitle(Boolean(titleState === "true"));
    }
    getTitleFormatedState();
    handleSetLoggedType();
  }, [user]);

  return (
    <Container>
      <Header>
        <UserInfo>
          <Photo
            source={{
              uri: user.photo
                ? user.photo
                : `https://ui-avatars.com/api/?name=${user.email}`,
            }}
          />
          <User>
            <UserGreeting>Olá,</UserGreeting>
            <UserName>{user.name}</UserName>
          </User>
        </UserInfo>
        <LogoutButton>
          <Icon name="power" onPress={signOut} />
        </LogoutButton>
      </Header>
      <Main>
        <MainWrapper>
          <PreferencesButton
            IconFamily="Feather"
            title={"Sair"}
            icon={"power"}
            onPress={signOut}
          />
          {loggedType === "sinsoft" && (
            <PreferencesButton
              IconFamily="Feather"
              title={"Alterar Senha"}
              icon={"key"}
              onPress={handleUpdatePasswordModal}
            />
          )}
          {loggedType !== "sinsoft" && (
            <SignInSocialButton
              title="Utilizar Conta Sinsoft"
              svg={SinsoftSvg}
              onPress={handleUseSinsoftAccountModal}
            />
          )}
          {loggedType === "sinsoft" && (
            <SignInSocialButton
              title="Utilizar Conta Google"
              svg={GoogleSvg}
              onPress={handleUseGoogleAccount}
            />
          )}
          {loggedType === "sinsoft" && (
            <SignInSocialButton
              title="Utilizar Conta Apple"
              svg={AppleSvg}
              //  onPress={handleUseGoogleAccount}
            />
          )}
          {!formatedTitle ? (
            <PreferencesButton
              title={"Habilitar Formatação de Títulos"}
              icon={"title"}
              onPress={handleFormatTitle}
              IconFamily="Material"
            />
          ) : (
            <PreferencesButton
              title={"Desabilitar Formatação"}
              icon={"remove-format"}
              onPress={handleUnormatTitle}
              IconFamily="FontAwesome5"
            />
          )}
        </MainWrapper>
      </Main>
      <Modal visible={updatePasswordModal}>
        <SinsoftUpdatePassword handleClose={handleUpdatePasswordModal} />
      </Modal>
      <Modal visible={useSinsoftAccountModal}>
        <UseSinsoftAccount handleClose={handleUseSinsoftAccountModal} />
      </Modal>
    </Container>
  );
}
