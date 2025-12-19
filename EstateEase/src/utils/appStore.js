import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux";

import useReducer from "./userSlice";
import postReducer from "./postSlice";
import selectedPostReducer from "./selectedSlice";
import allPostReducer from "./allPostSlice";
import matchingPostReducer from "./matchingPostSlice";

// Combine reducers
const rootReducer = combineReducers({
  user: useReducer,
  post: postReducer,
  selectedPost: selectedPostReducer,
  allPost: allPostReducer,
  matchingPost: matchingPostReducer,
});

// Config persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store with middleware to ignore redux-persist non-serializable actions
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(appStore);
export default appStore;
