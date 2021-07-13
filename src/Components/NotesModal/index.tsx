import React, { useCallback, useEffect, useState } from "react";

import { handleFilter } from "../../Utils/handleFilter";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Header,
  RepositoryInformation,
  RepositoryTitle,
  NotesCount,
  RepositoryDescription,
  RepositoryDescriptionText,
  ReturnButton,
  ReturnIcon,
  HeaderHandlerView,
  NotesList,
  Loader,
  NotesView,
  NotesViewHeader,
  ReturnIconButton,
  HandleView,
  AddNoteButton,
  AddNoteIcon,
  FilterNoteIconButton,
  FilterNoteIcon,
  Filter,
} from "./styles";

import { useNotes } from "../../hooks/notes";
import { CardNotes } from "../CardNotes";
import { Modal } from "react-native";
import { NoteOperations } from "../NoteOperations";
import { titleFormattedDataKey } from "../../Services/asyncStorage";
import { capitalize } from "../../Utils/capitalize";

interface INotesModalProps {
  repositoryTitle: string;
  repositoryId: number;
  repositoryDescription?: string;
  navigation: any;
  route: any;

  onClose(): void;
  setContinueVirtualize(option: boolean): void;
}

interface INote {
  id: number | string;
  description?: string;
  title: string;
  annotation: string;
}

export function NotesModal({
  repositoryTitle,
  repositoryId,
  onClose,
  repositoryDescription,
  navigation,
  route,
}: INotesModalProps) {
  const { handleSetRepositoryId, notes, loading } = useNotes();
  const repId = Number(route.params.repositoryId);
  const [filterIsPress, setFilterIsPress] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [formatedTitle, setFormatedTitle] = useState(false);
  //const [addNote, setAddNote] = useState(false);

  function handleAddNote() {
    //setAddNote(!addNote);
    navigation.navigate("NoteOperations", { repositoryId: repId, noteId: 0 });
  }

  function handleSetFilterIsPress() {
    setFilterIsPress(!filterIsPress);
    setFilterValue("");
  }

  function setRepositoryId() {
    handleSetRepositoryId(repId);
  }
  useEffect(() => {
    //console.log(repId)
    setRepositoryId();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getTitleFormatedState() {
        const titleState = await AsyncStorage.getItem(titleFormattedDataKey);
        console.log(titleState);
        setFormatedTitle(Boolean(titleState === "true")); //Verificando se precisamos formatar titulos
      }
      getTitleFormatedState();
      // console.log(formatedTitle)
    }, [])
  );

  return (
    <Container>
      <Header>
        <HeaderHandlerView>
          <ReturnButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ReturnIcon name="arrowleft" />
          </ReturnButton>

          <RepositoryInformation>
            <RepositoryTitle>
              {formatedTitle
                ? capitalize(route.params.repositoryTitle)
                : route.params.repositoryTitle}
              :
            </RepositoryTitle>
            {/* <NotesCount> {notes.length} anotações</NotesCount>  */}
          </RepositoryInformation>
        </HeaderHandlerView>
      </Header>

      <NotesView>
        <RepositoryDescription>
          <RepositoryDescriptionText>
            {route.params.repositoryDescription}
          </RepositoryDescriptionText>
        </RepositoryDescription>

        <NotesViewHeader>
          {filterIsPress ? (
            <>
              <ReturnIconButton onPress={handleSetFilterIsPress}>
                <ReturnIcon name="arrowleft" />
              </ReturnIconButton>
              <Filter onChangeText={setFilterValue} />
            </>
          ) : (
            <>
              <HandleView>
                <AddNoteButton /*onPress={/*handleAddRepositoryModalOpen}*/>
                  <AddNoteIcon name="note-plus" onPress={handleAddNote} />
                </AddNoteButton>
              </HandleView>
              <HandleView>
                <NotesCount>
                  {loading ? "?" : `${notes.length} Anotações`}
                </NotesCount>
              </HandleView>
              <HandleView>
                <FilterNoteIconButton>
                  <FilterNoteIcon
                    name="search1"
                    onPress={handleSetFilterIsPress}
                  />
                </FilterNoteIconButton>
              </HandleView>
            </>
          )}
        </NotesViewHeader>

        {loading ? (
          <Loader />
        ) : (
          notes && (
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
                  title={formatedTitle? capitalize(item.title):(item.title)}
                  description={item.description}
                  annotation={item.annotation}
                  navigation={navigation}
                  formatedTitle={formatedTitle}
                />
              )}
            />
          )
        )}
      </NotesView>

      {/* <Modal visible={addNote}>
        <NoteOperations onClose={handleAddNote} repId={repId} />
      </Modal> */}
    </Container>
  );
}
