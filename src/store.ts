import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/blog.slice'

export const store = configureStore({
  reducer: { blogReducer }
})

// Lấy RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
