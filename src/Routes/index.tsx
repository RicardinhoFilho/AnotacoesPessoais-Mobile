import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useUser } from "../hooks/user";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { emailDataKey } from "../Services/asyncStorage";
import { checkUserLogged } from "../Services/checkUserIsLogged";

export function Routes() {
  const [userLogged, setUserLogged] = useState(false);

  const { user, userIsLogged } = useUser();
  async function userStatus() {
    setUserLogged(userIsLogged);
  }

  useEffect(() => {
    userStatus();
  }, [userIsLogged]);

  return (
    <NavigationContainer >
      {userLogged ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
