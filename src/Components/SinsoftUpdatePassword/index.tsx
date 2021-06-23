import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import { loggedTypeDataKey } from "../../Services/asyncStorage";

import api from "../../Services/api";

import { useUser } from "../../hooks/user";

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
} from "./styles";

interface Props {
  handleClose: () => void;
}

interface IFormData {
  newPassword: string;
  confirmPassword: string;
}

export function SinsoftUpdatePassword({ handleClose }: Props) {
  const { updateSinsoftPassword } = useUser();
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPasswordIsValid, setNewPasswordIsValid] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(form: IFormData) {
    handleConfirmPasswordIsValid();
    handleNewPasswordError();
    if (
      newPasswordIsValid.length === 0 &&
      confirmPasswordIsValid.length === 0
    ) {
      setLoading(true);
      try {
        await updateSinsoftPassword(newPassword);
        Alert.alert("Senha Alterada");
        handleClose();
      } catch (error) {
        console.log(error);
        Alert.alert("Não foi possível Atualizar Sua conta ");
      }
      setLoading(false);
    }
  }

  function handleNewPasswordError() {
    if (newPassword.length < 3) {
      setNewPasswordIsValid("O campo deve conter pelo menos 3 caractéres");
      return;
    }
    setNewPasswordIsValid("");
  }

  function handleConfirmPasswordIsValid() {
    if (confirmPassword === newPassword) {
      setConfirmPasswordIsValid("");
      return;
    }
    setConfirmPasswordIsValid("As senhas não coincidem");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <ReturnIcon onPress={handleClose}>
            <AntDesign name="left" size={20} color="white" />
          </ReturnIcon>
          <Title>Alterar Senha</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              secureTextEntry={true}
              placeholder="Nova Senha"
              onChangeText={setnewPassword}
              onBlur={handleNewPasswordError}
            />
            <Attention>{newPasswordIsValid}</Attention>

            <InputForm
              secureTextEntry={true}
              placeholder="Confirmar Senha"
              autoCorrect={false}
              onChangeText={setConfirmPassword}
              onBlur={handleConfirmPasswordIsValid}
            />
            <Attention>{confirmPasswordIsValid}</Attention>

            {loading && <Loader />}

            <SubmitButton
              onPress={() => {
                handleRegister({ newPassword, confirmPassword });
              }}
            >
              <ButtonText>Entrar</ButtonText>
            </SubmitButton>
          </Fields>
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
}
