import "react-native-gesture-handler";
import * as React from "react";
import MainRoutes from "./MainRoutes";
import { AuthProvider } from "./routes/AuthProvider";
import { LogBox } from "react-native";
import { createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
LogBox.ignoreLogs(["Setting a timer"]);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </AuthProvider>
  );
}

export default App;
