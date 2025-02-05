import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "./todoSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'todo', // name of the key in localstorage,
    storage,
}

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
    reducer: {
        todos: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore persist actions
          },
        }),
}) 

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
