import React from "react";
import { Platform } from "react-native";
import { Repositories } from "../Screen/Repositories";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";

import { MaterialIcons } from "@expo/vector-icons";

import { useTheme } from "styled-components";
import theme from "../global/styles/theme";

const { Navigator, Screen } = createBottomTabNavigator();

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
      <Screen name="Repositórios" component={Repositories} options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}/>

<Screen name=" " component={Repositories} options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={0}
              color={color}
            />
          ),
          
        }}/>
        
    </Navigator>
  );
}
