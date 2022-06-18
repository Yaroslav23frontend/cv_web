import { addCVWorkExp, deleteCVWorkExp, editCVWorkExp } from "../action";
import date from "../../utilites/date";
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
          stringStart: date(action.payload.start),
          stringEnd: action.payload.end !== "" ? date(action.payload.end) : "",
          description: action.payload.description,
          id: action.payload.id,
        },
      ];
    case editCVWorkExp:
      const data = JSON.parse(JSON.stringify(state));
      data[action.payload.id] = {
        ...action.payload.data,
        stringStart: date(action.payload.data.start),
        stringEnd:
          action.payload.data.end !== "" ? date(action.payload.data.end) : "",
      };
      return data;
    case deleteCVWorkExp:
      return [...state.filter((el) => el.id !== action.payload)];
    default:
      return state;
  }
}
