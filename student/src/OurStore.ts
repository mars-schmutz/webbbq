import { createStore, combineReducers } from "redux";

const nameReducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  name: nameReducer,
})

const store = createStore(rootReducer);
export default store;
