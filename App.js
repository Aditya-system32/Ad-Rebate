import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Screens/Home";
import Navigator from "./routes/HomeStack";
export default function App() {
  return <Navigator />;
}
