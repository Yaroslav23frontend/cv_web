import {
  addCVBasicInfo,
  deleteCVBasicInfo,
  uploadPhotoCVBasicInfo,
} from "../action";
const intialState = {
  photo: "",
  name: "",
  lastName: "",
  email: "",
  tel: "",
  address: "",
  zip: "",
  city: "",
  linkedIn: "",
  skype: "",
};
export function reducerBasicInfo(state = intialState, action) {
  switch (action.type) {
    case addCVBasicInfo:
      return {
        photo: state.photo,
        name: action.payload.name,
        lastName: action.payload.lastName,
        email: action.payload.email,
        tel: action.payload.tel,
        address: action.payload.address,
        zip: action.payload.zip,
        city: action.payload.city,
        linkedIn: action.payload.linkedIn,
        skype: action.payload.skype,
      };
    case deleteCVBasicInfo:
      return {};
    case uploadPhotoCVBasicInfo:
      return {
        ...state,
        photo: action.payload,
      };
    default:
      return state;
  }
}