import { combineReducers } from "redux";
import authRedcuer from "./authReducer";
import { reducer as reduxFormReducer } from "redux-form";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  auth: authRedcuer,
  form: reduxFormReducer,
  surveys: surveysReducer
});
