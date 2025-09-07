import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';

const store = configureStore({
  reducer: {
    content: contentReducer
    // 未来可扩展其它 slice，如 user, category 等
  }
});

export default store;
