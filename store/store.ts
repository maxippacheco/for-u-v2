import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import postSlice from './post/postSlice'
import communitySlice from './community/communitySlice';
import uiSlice from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    community: communitySlice,
    ui: uiSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

