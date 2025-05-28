import "./global.css";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { AppNavigator } from "@/navigation/AppNavigator";
import React from "react";
import { AppRegistry } from "react-native";

function App() {
  return <AppNavigator />;
}

AppRegistry.registerComponent("main", () => App);

export default App;
