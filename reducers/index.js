import { combineReducers } from "redux";
import banner from "./banner";
import test from "./test";

const rootReducer = combineReducers({
  test: test,
  bannerData: banner,
});

export default rootReducer;
