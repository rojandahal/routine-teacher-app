import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./components/Navigation/Navigation";
import TabNavigation from "./components/Navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import profileSelector from "./selector/profileSelctor";

export default function App() {
  const [userProfile, setUserProfile] = useRecoilState(profileSelector);

  useEffect(() => {
    console.log("userProfile", userProfile);
  }, [userProfile]);

  const handleLogin = () => {
    setUserProfile({
      ...userProfile,
      userLoggedIn: true,
    });
  };

  const handleLogout = () => {
    setUserProfile({
      ...userProfile,
      userLoggedIn: false,
    });
  };

  if (userProfile.userLoggedIn) {
    console.log("userProfile.userLoggedIn", userProfile.userLoggedIn);
    return (
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <TabNavigation onLogout={handleLogout} />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
    );
  } else {
    return (
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation
            onLogin={handleLogin}
            userLoggedIn={userProfile.userLoggedIn}
          />
        </GestureHandlerRootView>
      </PaperProvider>
    );
  }
}
