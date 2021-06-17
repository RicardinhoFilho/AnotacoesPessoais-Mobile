import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  User,
} from "./styles";

import { useUser } from "../../hooks/user";

interface IUser {
  name?: string;
  photo?: string;
  email: string;
  password: string;
  token: string;
}

export function Repositories() {
  const { user, signOut } = useUser();

  function handleLogOut() {
    signOut();
  }

  useEffect(() => {}, []);

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
          <Icon name="power" onPress={handleLogOut} />
        </LogoutButton>
      </Header>
    </Container>
  );
}
