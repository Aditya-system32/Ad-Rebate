import "react-native-gesture-handler";
import * as React from "react";
import MainRoutes from "./MainRoutes";
import { AuthProvider } from "./routes/AuthProvider";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}

export default App;
