import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  roleReducer,
  videogameReducer
} from "./reducers";

export default createStore(
  combineReducers({
    roleReducer,
    videogameReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)
