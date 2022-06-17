import { addCVstudy, deleteCVstudy, editCVstudy } from "../action";
export function reducerStudy(state = [], action) {
  switch (action.type) {
    case addCVstudy:
      return [
        ...state,
        {
          studies: action.payload.studies,
          location: action.payload.location,
          insitution: action.payload.insitution,
          start: action.payload.start,
          end: action.payload.end,
          description: action.payload.description,
          id: action.payload.id,
        },
      ];
    case editCVstudy:
      const data = JSON.parse(JSON.stringify(state));
      data[action.payload.id] = action.payload.data;
      return data;
    case deleteCVstudy:
      return [...state.filter((el) => el.id !== action.payload)];
    default:
      return state;
  }
}
