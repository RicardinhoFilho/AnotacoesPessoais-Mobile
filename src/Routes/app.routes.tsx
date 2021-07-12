import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { RFValue } from "react-native-responsive-fontsize";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "styled-components";
import theme from "../global/styles/theme";

const { Navigator, Screen } = createBottomTabNavigator();


import { Search } from "../Screen/Search";
import { Account } from "../Screen/Account";
import { RepositoriesNavigation } from "./routes.repositories";
import { SearchNavigation } from "./search.routes/index.routes";




export function AppRoutes() {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.text,
        labelPosition: "beside-icon",
        style: {
          paddingVertical: Platform.OS === "ios" ? RFValue(20) : 0,
          height: RFValue(88),
        },
      }}
    >
      <Screen
        name="Home"
        component={RepositoriesNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="Pesquisar"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Minha Conta"
        component={Account}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
