/**
 * LDJ | 2022.03.22 | v1.0
 * @name configStore
 * @api -
 * @des 여러 state들을 store에 (한곳) 모아서 관리하기 위함
 */

import { persistReducer } from "redux-persist";
import { createStore, combineReducers } from "redux";
import { UserReducer } from "./reducers/UserReducer";
import { SearchReducer } from "./reducers/SearchReducer";

import sessionStorage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const allReducers = combineReducers({
  User: UserReducer,
  Search: SearchReducer,
});

const store = createStore(
  persistReducer(persistConfig, allReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
