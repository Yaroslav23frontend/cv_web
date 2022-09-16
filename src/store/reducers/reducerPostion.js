import { addCVPosition } from "../action";
export function reducerPosition(state = "", action) {
  switch (action.type) {
    case addCVPosition:
      return action.payload;
    default:
      return state;
  }
}
