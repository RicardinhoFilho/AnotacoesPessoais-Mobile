import React, { useState } from "react";
import { Card } from "../../Components/Card";
import { CardNotes } from "../../Components/CardNotes";
import { useUser } from "../../hooks/user";
import api from "../../Services/api";
import { handleFilter } from "../../Utils/handleFilter";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  UserGreeting,
  UserName,
  LogoutButton,
  User,
  Icon,
  SearchContainer,
  SearchTitle,
  SearchTextInput,
  FilterTextInput,
  RepositoriesList,
  Loader,
  ResultContainer,
  NotesList,
  NotesContainer,
  RepositoriesContainer,
} from "./styles";

interface INotes {
  id: number;
  title: string;
  description?: string;
  annotation: string;
}

interface IRepository {
  id: number;
  title: string;
  description?: string;
}

export function Search({navigation}:any) {
  const { user, signOut } = useUser();
  const [search, setSearch] = useState("");
  const [filterIsPress, setFilterIsPress] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [notes, setNotes] = useState({} as INotes[]);
  const [repositories, setRepositories] = useState({} as IRepository[]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    try {
      const response = await api.post("/api/search", { search });
      setRepositories(response.data.repositories);
      setNotes(response.data.notes);
      setFilterValue("");
      //console.log(notes);
    } catch (error) {}
    setLoading(false);
  }

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

      <SearchContainer>
        <SearchTextInput
          placeholder={"Busque por repositórios ou anotações..."}
          value={search}
          onChangeText={setSearch}
          onEndEditing={handleSearch}
        />

        <FilterTextInput
          placeholder={"Filtrar Resultados"}
          value={filterValue}
          onChangeText={setFilterValue}
        />
      </SearchContainer>
      {loading && <Loader />}
      <ResultContainer>
        {repositories.length > 0 && <SearchTitle>Repositórios: {repositories.length}</SearchTitle>}

        {repositories.length > 0 && (
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
                navigation={navigation}
              />
            )}
          />
        )}

        {notes.length > 0 && <SearchTitle>Anotações: {notes.length}</SearchTitle>}
        {notes.length > 0 && (
          <NotesList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardNotes
                invisible={
                  filterValue.length > 0 &&
                  handleFilter(filterValue, item.title, item.description)
                    ? true
                    : false
                }
                id={item.id}
                title={item.title}
                description={item.description}
                annotation={item.annotation}
              />
            )}
          />
        )}
      </ResultContainer>
    </Container>
  );
}
