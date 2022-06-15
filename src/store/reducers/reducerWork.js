import { addCVWorkExp, deleteCVWorkExp } from "../action";
export function reducerWork(state = [], action) {
  switch (action.type) {
    case addCVWorkExp:
      return [
        ...state,
        {
          title: action.payload.title,
          company: action.payload.company,
          city: action.payload.city,
          start: action.payload.start,
          end: action.payload.end,
          description: action.payload.description,
          id: action.payload.id,
        },
      ];
    case deleteCVWorkExp:
      return [...state.filter((el) => el.id !== action.payload)];
    default:
      return state;
  }
}
