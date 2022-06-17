import { configureStore } from "@reduxjs/toolkit";
import { reducerBasicInfo } from "./reducers/reducerBasicInfo";
import { reducerCollection } from "./reducers/reducerCollection";
import { reducerDescription } from "./reducers/reducerDescription";
import { reducerItems } from "./reducers/reducerItems";
import { reducerSettings } from "./reducers/reducerSettings";
import { reducerStudy } from "./reducers/reducerStudy";
import { reducerUserInfo } from "./reducers/reducerUserInfo";
import { reducerWork } from "./reducers/reducerWork";
import { reducerSkills } from "./reducers/reducerSkills";
import { reducerLan } from "./reducers/reducerLan";
import { reducerCVbg } from "./reducers/reducerCVbg";
export const store = configureStore({
  reducer: {
    user: reducerUserInfo,
    items: reducerItems,
    settings: reducerSettings,
    collection: reducerCollection,
    cvBasicInfo: reducerBasicInfo,
    cvWork: reducerWork,
    cvDescription: reducerDescription,
    cvStudy: reducerStudy,
    cvSkills: reducerSkills,
    cvLan: reducerLan,
    cvBg: reducerCVbg,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
