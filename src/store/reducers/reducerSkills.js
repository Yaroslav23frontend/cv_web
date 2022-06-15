import { addCVskills, deleteCVskills } from "../action";
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
    case deleteCVskills:
      return [...state.filter((el) => el.id !== action.payload)];
    default:
      return state;
  }
}
