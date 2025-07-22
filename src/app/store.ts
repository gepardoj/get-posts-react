import postReducer from '@/entities/post/model/post.slice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    post: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;