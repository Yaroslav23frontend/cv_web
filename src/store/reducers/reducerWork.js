import { addCVWorkExp, deleteCVWorkExp, editCVWorkExp } from "../action";
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
    case editCVWorkExp:
      const data = JSON.parse(JSON.stringify(state));
      data[action.payload.id] = action.payload.data;
      return data;
    case deleteCVWorkExp:
      return [...state.filter((el) => el.id !== action.payload)];
    default:
      return state;
  }
}
