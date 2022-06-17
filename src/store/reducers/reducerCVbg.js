import { changeCVbg } from "../action";
import { grey } from "@mui/material/colors";
export function reducerCVbg(state = grey[900], action) {
  switch (action.type) {
    case changeCVbg:
      return action.payload;
    default:
      return state;
  }
}
