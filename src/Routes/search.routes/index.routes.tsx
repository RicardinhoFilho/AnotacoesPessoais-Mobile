import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Repositories } from "../../Screen/Repositories";
import { NotesModal } from "../../Components/NotesModal";
import { NoteOperations } from "../../Components/NoteOperations";
import { RepositoryOperations } from "../../Components/RepositoryOperations";
import { Search } from "../../Screen/Search";

export function SearchNavigation() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Search" component={Search} />
      {/* <Screen name="Repositories" component={Repositories} /> */}
      <Screen name="Note" component={NotesModal} />
      <Screen name="NoteOperations" component={NoteOperations} />
      <Screen name="RepositoryOperations" component={RepositoryOperations} />
    </Navigator>
  );
}
