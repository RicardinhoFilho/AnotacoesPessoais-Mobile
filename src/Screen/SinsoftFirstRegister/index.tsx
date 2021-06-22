import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import AppLoading from "expo-app-loading";

import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  emailDataKey,
  passwordDataKey,
  tokenDataKey,
} from "../../Services/asyncStorage";

import api from "../../Services/api";
import { handleSingUp } from "../../Utils/handleSingUp";
import { handleSingIn } from "../../Utils/handleSingIn";

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
  name: string;
  email: string;
  password: string;
}

export function SinsoftFirstRegister({ handleClose }: Props) {
  const { singIn, singUp } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comparePassword, setCOmparePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordIsEqual, setPasswordIsEqual] = useState(true);

  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  async function handleRegister(form: IFormData) {
    setLoading(true);
    email ? "" : setEmailIsValid(false);
    password ? "" : setPasswordIsValid(false);
    name ? "" : setNameIsValid(false);
    if (!emailIsValid || !passwordIsValid || !nameIsValid) {
      setLoading(false);
      return;
    }
    if (email.length < 5 || name.length < 3 || password.length < 5) {
      setLoading(false);
      return;
    }
    if(!passwordIsEqual){
      setLoading(false);
      return;
    }
    singUp(form);
    singIn(form);
    setLoading(false);
  }

  function handleValidatePassword() {
    if (comparePassword === password) {
      setPasswordIsEqual(true);
      return;
    }
    setPasswordIsEqual(false);
  }

  function handleNameError() {
    if (name.length < 3) {
      setNameIsValid(false);
      return;
    }
    setNameIsValid(true);
  }

  function handleEmailError() {
    if (email.length < 5) {
      setEmailIsValid(false);
      return;
    }
    setEmailIsValid(true);
  }

  function handlePassordError() {
    if (password.length < 5) {
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
          <Title>Cadastro Sinsoft</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              onChangeText={setName}
              onBlur={handleNameError}
            />
            <Attention>
              {nameIsValid
                ? ""
                : "O campo Nome deve ser preenchido com pelo menos 3 caracteres"}
            </Attention>

            <InputForm
              placeholder="Email"
              onChangeText={setEmail}
              onBlur={handleEmailError}
            />
            <Attention>
              {emailIsValid
                ? ""
                : "O campo Email deve ser preenchido com pelo menos 5 caracteres"}
            </Attention>

            <InputForm
              secureTextEntry={true}
              placeholder="Senha"
              autoCorrect={false}
              onChangeText={setPassword}
              onBlur={handlePassordError}
            />
            <Attention>
              {passwordIsValid
                ? ""
                : "O campo Senha deve ser preenchido com pelo menos 5 caracteres"}
            </Attention>
            <InputForm
              secureTextEntry={true}
              placeholder="Senha"
              autoCorrect={false}
              onChangeText={setPassword}
              onBlur={handleValidatePassword}
            />
            <Attention>
              {passwordIsEqual ? "" : "Senhas não coincidem"}
            </Attention>
            {loading && <Loader />}
            <SubmitButton
              onPress={() => {
                handleRegister({ name, email, password });
              }}
            >
              <ButtonText>Confirmar Cadastro</ButtonText>
            </SubmitButton>
          </Fields>
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
}
