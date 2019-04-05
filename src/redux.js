import { combineReducers, createStore } from "redux";
const initialState = {
  history: [],
  count: 0
};

export const updateCount = payload => ({
  type: "UPDATE_COUNT",
  payload // <-- action.type
});
export const updateHistory = payload => ({
  type: "UPDATE_HISTORY",
  payload // <-- action.type
});

export const history = (state = initialState.history, action) => {
  let newState = state;
  switch (action.type) {
    case "UPDATE_HISTORY":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const count = (state = initialState.count, action) => {
  switch (action.type) {
    case "UPDATE_COUNT":
      return state + action.payload;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  count,
  history
});

export function configureStore(initialState = initialState) {
  // initialState = initialState | {}
  const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  console.log(store);
  return store;
}

export const store = configureStore();
