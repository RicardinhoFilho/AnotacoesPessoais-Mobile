import React, { useState } from "react";
import { Linking, Modal } from "react-native";
import { SignInSocialButton } from "../../Components/SingninSocialButton";
import { SinsoftAdress } from "../../Utils/adress";

import AppleSvg from "../../Assets/apple.svg";
import GoogleSvg from "../../Assets/google.svg";
import SinsoftSvg from "../../Assets/logo-sinsoft-removebg-preview.svg";

import AppLoading from "expo-app-loading";

import { SinsoftRegister } from "../SinsoftRegister";
import { SinsoftFirstRegister } from "../SinsoftFirstRegister";

import { useUser } from "../../hooks/user";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  Footer,
  FooterWrapper,
  Logo,
  Title,
  SinsoftButton,
  AnottationText,
  SignInTitle,
  Loader
} from "./style";
export function SingIn() {
  const authContext = useAuth();
  const userContext = useUser();
  const [sinsoftRegisterModalOpen, setSinsoftRegisterModalOpen] =
    useState(false);
  const [sinsoftFirstRegisterModalOpen, setSinsoftFirstRegisterModalOpen] =
    useState(false);
    const [loading, setLoading] = useState(false);
  function handleSinsoftRegisterModalOpen() {
    setSinsoftRegisterModalOpen(!sinsoftRegisterModalOpen);
  }

  function handleNewSinsoftAccountModal() {
    setLoading(true);
    setSinsoftFirstRegisterModalOpen(!sinsoftFirstRegisterModalOpen);
    setLoading(false);
  }

  async function handleSignInWithGoogle() {
    setLoading(true);
    const user = await authContext.signInWithGoogle();
    user? await userContext.singIn(user) : "";
    setLoading(false);
  }

  return (
    <Container>
      <Header>
        <SinsoftButton
          onPress={() => {
            Linking.openURL(SinsoftAdress);
          }}
        >
          <Logo />
        </SinsoftButton>
        <Title>Anotações Pessoais</Title>
        <AnottationText>
          {" "}
          Controle suas{"\n"}
          anotações de forma{"\n"}
          muito simples!
        </AnottationText>

        {loading && <Loader />}
        <SignInTitle>
          {/* Faça seu login {"\n"}
          com uma das opções abaixo */}
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Sinsoft"
            svg={SinsoftSvg}
            onPress={handleSinsoftRegisterModalOpen}
          />
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            // onPress={handleSignInWithGoogle}
          />
        </FooterWrapper>
      </Footer>
      <Modal visible={sinsoftRegisterModalOpen}>
        <SinsoftRegister
          handleClose={handleSinsoftRegisterModalOpen}
          handleNewAccount={handleNewSinsoftAccountModal}
        />
      </Modal>
      <Modal visible={sinsoftFirstRegisterModalOpen}>
        <SinsoftFirstRegister handleClose={handleNewSinsoftAccountModal} />
      </Modal>
    </Container>
  );
}
