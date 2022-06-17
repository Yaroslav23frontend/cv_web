import { addCVlan, deleteCVlan, editCVlan } from "../action";
export function reducerLan(state = [], action) {
  switch (action.type) {
    case addCVlan:
      return [
        ...state,
        {
          lan: action.payload.lan,
          level: action.payload.level,
          id: action.payload.id,
        },
      ];
    case editCVlan:
      const data = JSON.parse(JSON.stringify(state));
      data[action.payload.id] = action.payload.data;
      return data;
    case deleteCVlan:
      return [...state.filter((el) => el.id !== action.payload)];
    default:
      return state;
  }
}
