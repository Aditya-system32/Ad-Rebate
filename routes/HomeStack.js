import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../Screens/Home.js";
import About from "../Screens/AboutUs.js";
const screens = {
  Home: {
    screen: Home,
  },
  About: {
    screen: About,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
