import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./components/Navigation/Navigation";
import TabNavigation from "./components/Navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import profileSelector from "./selector/profileSelctor";
import { getBatchId, getProfile } from "./api/apiClient";
import { APIEndpoint } from "./env";
import { loginAtom } from "./recoil/ProfileState";

export default function App() {
  const [loggedIn, setLoggedIn] = useRecoilState(loginAtom);

  // const handleLogin = () => {
  //   setUserProfile({
  //     ...userProfile,
  //     userLoggedIn: true,
  //   });
  // };

  // const handleLogout = () => {
  //   setUserProfile({
  //     ...userProfile,
  //     userLoggedIn: false,
  //   });
  // };

  console.log("loggedIn", { loggedIn });
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {loggedIn.userLoggedIn ? (
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        ) : (
          <Navigation userLoggedIn={loggedIn.userLoggedIn} />
        )}
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
