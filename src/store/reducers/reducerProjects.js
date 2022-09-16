import {
  addCVProject,
  deleteCVProject,
  editCVProject,
  uploadCVProject,
} from "../action";
export function reducerProjects(state = [], action) {
  switch (action.type) {
    case addCVProject:
      return [
        ...state,
        {
          title: action.payload.title,
          description: action.payload.description,
          technologies: action.payload.technologies,
          link: action.payload.link,
          git: action.payload.git,
          id: action.payload.id,
        },
      ];
    case editCVProject:
      const data = JSON.parse(JSON.stringify(state));
      data[action.payload.id] = {
        ...action.payload.data,
      };
      return data;
    case deleteCVProject:
      return [...state.filter((el) => el.id !== action.payload)];
    case uploadCVProject:
      return action.payload;
    default:
      return state;
  }
}
