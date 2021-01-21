import "react-native-gesture-handler";
import * as React from "react";
import MainRoutes from './MainRoutes'
import {AuthProvider} from './routes/AuthProvider'


function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}

export default App;
