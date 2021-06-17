import React, { useEffect } from "react";
import { SingIn } from "../Screen/SingIn";
import { createStackNavigator } from "@react-navigation/stack";

import {useUser} from "../hooks/user";

const { Navigator, Screen } = createStackNavigator();


export function AuthRoutes(){

  

    return (
        <Navigator headerMode="none">
          <Screen name="SingIn" component={SingIn} />
        </Navigator>
      );

}