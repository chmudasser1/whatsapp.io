import { configureStore } from "@reduxjs/toolkit";
import Chat from "../features/data";

export const store = configureStore({
    reducer: {
        app: Chat
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});