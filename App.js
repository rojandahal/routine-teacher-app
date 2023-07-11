import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./components/Navigation/Navigation";
import TabNavigation from "./components/Navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  if (userLoggedIn) {
    return (
      <RecoilRoot>
        <PaperProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <TabNavigation onLogout={handleLogout} />
            </NavigationContainer>
          </GestureHandlerRootView>
        </PaperProvider>
      </RecoilRoot>
    );
  } else {
    return (
      <RecoilRoot>
        <PaperProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigation onLogin={handleLogin} />
          </GestureHandlerRootView>
        </PaperProvider>
      </RecoilRoot>
    );
  }
}
