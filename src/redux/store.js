import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  roleReducer,
  videogameReducer,
  ordersReducer
} from "./reducers";

export default createStore(
  combineReducers({
    roleReducer,
    videogameReducer,
    ordersReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)
