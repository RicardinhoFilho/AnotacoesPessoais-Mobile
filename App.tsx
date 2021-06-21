import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemeProvider } from "styled-components";

import { AuthProvider, useAuth } from "./src/hooks/auth";
import { UserProvider, useUser } from "./src/hooks/user";

import { RepositoryProvider, useRepositories } from "./src/hooks/repositories";

import { NotesProvider, useNotes } from "./src/hooks/notes";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";

import AppLoading from "expo-app-loading";

import { Routes } from "./src/Routes";
// /import { Repositories } from "./src/Pages/Repositories";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const userContext = useUser();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <RepositoryProvider>
            <NotesProvider>
              <Routes />
            </NotesProvider>
          </RepositoryProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
