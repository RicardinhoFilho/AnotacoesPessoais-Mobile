import React, { useEffect, useState } from "react";

import { handleFilter } from "../../Utils/handleFilter";

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

interface INotesModalProps {
  repositoryTitle: string;
  repositoryId: string;
  repositoryDescription?: string;

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
}: INotesModalProps) {
  const { handleSetRepositoryId, notes, loading } = useNotes();

  const [filterIsPress, setFilterIsPress] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  function handleSetFilterIsPress() {
    setFilterIsPress(!filterIsPress);
    setFilterValue("");
  }

  function setRepositoryId() {
    handleSetRepositoryId(Number(repositoryId));
  }
  useEffect(() => {
    setRepositoryId();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderHandlerView>
          <ReturnButton onPress={onClose}>
            <ReturnIcon name="arrowleft" />
          </ReturnButton>

          <RepositoryInformation>
            <RepositoryTitle>{repositoryTitle}:</RepositoryTitle>
            {/* <NotesCount> {notes.length} anotações</NotesCount>  */}
          </RepositoryInformation>
        </HeaderHandlerView>
      </Header>

      <NotesView>
        <RepositoryDescription>
          <RepositoryDescriptionText>
            {repositoryDescription}
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
                  <AddNoteIcon name="note-plus" />
                </AddNoteButton>
              </HandleView>
              <HandleView>
                <NotesCount>{notes.length} Anotações</NotesCount>
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
              initialNumToRender={notes.length}
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
          )
        )}
      </NotesView>
    </Container>
  );
}
