import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useUser } from "../hooks/user";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const [userLogged, setUserLogged] = useState(false);

  const userContext = useUser();

  useEffect(() => {
    setUserLogged(userContext.userIsLogged);
  }, [userContext.userIsLogged]);

  return (
    <NavigationContainer>
      {userLogged ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
