import {
  addCVskills,
  deleteCVskills,
  editCVskills,
  uploadCVskills,
} from "../action";
export function reducerSkills(state = [], action) {
  switch (action.type) {
    case addCVskills:
      return [
        ...state,
        {
          skill: action.payload.skill,
          id: action.payload.id,
        },
      ];
    case editCVskills:
      const data = JSON.parse(JSON.stringify(state));
      data[action.payload.id] = action.payload.data;
      return data;
    case deleteCVskills:
      return [...state.filter((el) => el.id !== action.payload)];
    case uploadCVskills:
      const uploadData = action.payload.map((el) => el);
      return uploadData;
    default:
      return state;
  }
}
