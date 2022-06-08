import { addCV, deleteCV, addCVs } from "../action";

export function reducerCollection(state = [], action) {
  switch (action.type) {
    case addCV:
      return [...state, action.payload];
    case addCVs:
      if (action.payload === undefined) {
        return [];
      }
      return [...action.payload];

    case deleteCV:
      return [...state.filter((el) => el !== action.payload)];
    default:
      return state;
  }
}
