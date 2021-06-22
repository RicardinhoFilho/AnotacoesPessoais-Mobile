import React from "react";
import { PreferencesButton } from "../../Components/PreferencesButton";
import { SignInSocialButton } from "../../Components/SingninSocialButton";
import { useUser } from "../../hooks/user";

import AppleSvg from "../../Assets/apple.svg";
import GoogleSvg from "../../Assets/google.svg";
import SinsoftSvg from "../../Assets/logo-sinsoft-removebg-preview.svg";

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

export function Account() {
  const { user, signOut } = useUser();

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
          <PreferencesButton title={"Sair"} icon={"power"} onPress={signOut} />
          <PreferencesButton title={"Alterar Senha"} icon={"key"} />
          <SignInSocialButton
            title="Utilizar Conta Sinsoft"
            svg={SinsoftSvg}
            // onPress={}
          />
          <SignInSocialButton
            title="Utilizar Conta Google"
            svg={GoogleSvg}
            // onPress={}
          />
          <SignInSocialButton
            title="Utilizar Conta Apple"
            svg={AppleSvg}
            // onPress={handleSignInWithGoogle}
          />
        </MainWrapper>
      </Main>
    </Container>
  );
}
