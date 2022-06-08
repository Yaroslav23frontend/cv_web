import { configureStore } from "@reduxjs/toolkit";
import { reducerCollection } from "./reducers/reducerCollection";
import { reducerItems } from "./reducers/reducerItems";
import { reducerSettings } from "./reducers/reducerSettings";
import { reducerUserInfo } from "./reducers/reducerUserInfo";
export const store = configureStore({
  reducer: {
    user: reducerUserInfo,
    items: reducerItems,
    settings: reducerSettings,
    collection: reducerCollection,
  },
});
