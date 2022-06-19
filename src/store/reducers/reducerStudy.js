import {
  addCVstudy,
  deleteCVstudy,
  editCVstudy,
  uploadCVstudy,
} from "../action";
import date from "../../utilites/date";
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
          stringStart: date(action.payload.start),
          stringEnd: action.payload.end !== "" ? date(action.payload.end) : "",
          description: action.payload.description,
          id: action.payload.id,
        },
      ];
    case editCVstudy:
      const data = JSON.parse(JSON.stringify(state));
      data[action.payload.id] = {
        ...action.payload.data,
        stringStart: date(action.payload.data.start),
        stringEnd:
          action.payload.data.end !== "" ? date(action.payload.data.end) : "",
      };
      return data;
    case deleteCVstudy:
      return [...state.filter((el) => el.id !== action.payload)];
    case uploadCVstudy:
      const uploadData = action.payload.map((el) => {
        el.stringStart = date(el.start);
        el.stringEnd = el.end !== "" ? date(el.end) : "";
        return el;
      });
      return uploadData;
    default:
      return state;
  }
}
