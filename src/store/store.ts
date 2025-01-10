import { configureStore } from "@reduxjs/toolkit";

import editeReducer from "./slices/EditSlice";


export const store = configureStore({
    reducer: {
        edit: editeReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;