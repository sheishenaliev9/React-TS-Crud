import { configureStore } from "@reduxjs/toolkit";
import PostsSlice from "./slices/PostsSlice";


export const store = configureStore({
    reducer: {
        posts: PostsSlice
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;