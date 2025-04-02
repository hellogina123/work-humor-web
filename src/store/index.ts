import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // 在這裡添加 reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 