import { addCVdescription } from "../action";

export function reducerDescription(state = "", action) {
  switch (action.type) {
    case addCVdescription:
      return action.payload;
    default:
      return state;
  }
}
