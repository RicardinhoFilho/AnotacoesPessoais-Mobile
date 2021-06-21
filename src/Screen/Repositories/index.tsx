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
  RepositoriesView,
  Title,
  RepositoriesList,
  RepositoriesViewHeader,
  Filter,
  AddFolderButton,
  AddFolderIcon,
  HandleView,
  FilterFolderIcon,
  FilterFolderIconButton,
  ReturnIconButton,
  ReturnIcon,
} from "./styles";

import { useUser } from "../../hooks/user";
import { useRepositories } from "../../hooks/repositories";
import { Card } from "../../Components/Card";

import { handleFilter } from "../../Utils/handleFilter";
import { Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { RepositoryOperations } from "../../Components/RepositoryOperations";

interface IUser {
  name?: string;
  photo?: string;
  email: string;
  password: string;
  token: string;
}

export function Repositories() {
  const { getRepositories, repositories } = useRepositories();
  const { user, signOut } = useUser();

  const [filterIsPress, setFilterIsPress] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const [addRepositoryModalOpen, setAddRepositoryModalOpen] = useState(false);

  function handleLogOut() {
    signOut();
  }

  function handleSetFilterPress() {
    filterIsPress ? setFilterValue("") : "";
    setFilterIsPress(!filterIsPress);
  }

  function handleAddRepositoryModalOpen() {
    setAddRepositoryModalOpen(!addRepositoryModalOpen);
  }

  useEffect(() => {
    getRepositories();
  }, []);

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

      <RepositoriesView>
        <RepositoriesViewHeader>
          {filterIsPress ? (
            <>
              <ReturnIconButton onPress={handleSetFilterPress}>
                <ReturnIcon name="arrowleft" />
              </ReturnIconButton>
              <Filter value={filterValue} onChangeText={setFilterValue} />
            </>
          ) : (
            <>
              <HandleView>
                <AddFolderButton onPress={handleAddRepositoryModalOpen}>
                  <AddFolderIcon name="addfolder" />
                </AddFolderButton>
              </HandleView>
              <HandleView>
                <Title>{repositories.length} Repositórios</Title>
              </HandleView>
              <HandleView>
                <FilterFolderIconButton>
                  <FilterFolderIcon
                    name="search1"
                    onPress={handleSetFilterPress}
                  />
                </FilterFolderIconButton>
              </HandleView>
            </>
          )}
        </RepositoriesViewHeader>
        {repositories && (
          <RepositoriesList
            data={repositories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                invisible={
                  filterValue.length > 0 &&
                  handleFilter(filterValue, item.title, item.description)
                    ? true
                    : false
                }
                id={item.id}
                title={item.title}
                description={item.description}
                setFilterIsPress={setFilterIsPress}
                setFilterValue={setFilterValue}
              />
            )}
          />
        )}
      </RepositoriesView>

      <Modal visible={addRepositoryModalOpen}>
        <RepositoryOperations onClose={handleAddRepositoryModalOpen} />
      </Modal>
    </Container>
  );
}
