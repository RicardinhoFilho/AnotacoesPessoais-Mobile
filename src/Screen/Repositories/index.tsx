import React, { useEffect, useState,useCallback } from "react";


import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer, Link } from "@react-navigation/native";


import { handleFilter } from "../../Utils/handleFilter";
import { Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { RepositoryOperations } from "../../Components/RepositoryOperations";

import { Routes } from "../../Routes";
import { titleFormattedDataKey } from "../../Services/asyncStorage";

interface IUser {
  name?: string;
  photo?: string;
  email: string;
  password: string;
  token: string;
}

export function Repositories({navigation}:any) {
  
  const { getRepositories, repositories } = useRepositories();
  const { user, signOut } = useUser();

  const [filterIsPress, setFilterIsPress] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const [addRepositoryModalOpen, setAddRepositoryModalOpen] = useState(false);

  const [formatedTitle, setFormatedTitle] = useState(false);

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

  function testa() {
    console.log("teste");
  }

  useFocusEffect(
    useCallback(() => {
      async function getTitleFormatedState() {
        const titleState = 
          await AsyncStorage.getItem(titleFormattedDataKey)
        ;
        console.log(titleState)
        setFormatedTitle(Boolean(titleState === "true"));//Verificando se precisamos formatar titulos
      }
      getTitleFormatedState();
      console.log(formatedTitle)
    }, [])
  );

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
                <AddFolderButton onPress={()=>{
                  navigation.navigate("RepositoryOperations",{repository:null});
                }}>
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
                navigation={navigation}
                formatedTitle={formatedTitle}
              />
            )}
          />
        )}
      </RepositoriesView>

    
    </Container>
  );
}
