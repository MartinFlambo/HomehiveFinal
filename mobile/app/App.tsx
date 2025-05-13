import React from "react";
import { ThemeProvider } from "react-native-elements";
import RootNavigation from "../navigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
