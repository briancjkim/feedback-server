import { combineReducers } from "redux";
import authRedcuer from "./authReducer";
import serveyReducer from "./serveyReducer";

export default combineReducers({
  auth: authRedcuer,
  suervey: serveyReducer
});
