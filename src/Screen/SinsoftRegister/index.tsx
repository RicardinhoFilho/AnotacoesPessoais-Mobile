import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import {
  emailDataKey,
  passwordDataKey,
  tokenDataKey,
} from "../../Services/asyncStorage";

import api from "../../Services/api";

import {useUser} from "../../hooks/user"

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
  handleNewAccount: () => void;
}

interface IFormData {
  email: string;
  password: string;
}

export function SinsoftRegister({ handleClose, handleNewAccount }: Props) {
  const {singIn} = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [loading, setLoading] = useState(false);

  async function handleRegister(form: IFormData) {

    try{
      setLoading(true);
      const email = form.email;
      const password = form.password;
  
      await singIn(form)
    
    }catch(error){
      console.log(error);
      Alert.alert("Não foi possível efetuar o Login")
    }
    setLoading(false);
  }

  function handleEmailError() {
    if (email.length < 1) {
      setEmailIsValid(false);
      return;
    }
    setEmailIsValid(true);
  }

  function handlePassordError() {
    if (password.length < 1) {
      setPasswordIsValid(false);
      return;
    }
    setPasswordIsValid(true);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <ReturnIcon onPress={handleClose}>
            <AntDesign name="left" size={20} color="white" />
          </ReturnIcon>
          <Title>Entrar com Sinsoft</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Email"
              onChangeText={setEmail}
              onBlur={handleEmailError}
            />
            <Attention>
              {emailIsValid ? "" : "O campo Email deve ser preenchido"}
            </Attention>

            <InputForm
              secureTextEntry={true}
              placeholder="Senha"
              autoCorrect={false}
              onChangeText={setPassword}
              onBlur={handlePassordError}
            />
            <Attention>
              {passwordIsValid ? "" : "O campo Senha deve ser preenchido"}
            </Attention>

            {loading && <Loader />}

            <SubmitButton
              onPress={() => {
                handleRegister({ email, password });
              }}
            >
              <ButtonText>Entrar</ButtonText>
            </SubmitButton>
            <SubmitButton
              onPress={() => {
                handleClose();
                handleNewAccount();
              }}
            >
              <ButtonText>Não possuo conta</ButtonText>
            </SubmitButton>
          </Fields>
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
}
