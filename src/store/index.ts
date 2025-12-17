import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth-slice";
import persistenceMiddleware from "./middleware/persistence-middleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      // Add other slices here (locations, logistics, etc.) as we migrate them
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(persistenceMiddleware.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
