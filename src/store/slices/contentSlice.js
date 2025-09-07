import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSceneList } from '../../utils/api';

// 异步 action：分页加载内容
export const fetchContentPage = createAsyncThunk(
  'content/fetchContentPage',
  async ({ page, pageSize, filters }, { rejectWithValue }) => {
    try {
      // mock 模式分页兼容：只允许 page=1 返回数据，其它页返回空
      const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
      if (USE_MOCK && page > 1) {
        return { items: [], total: 2 };
      }
      const params = {
        count: pageSize,
        page,
        ...filters
      };
      const res = await getSceneList(params);
      // 兼容 mock/真实接口
      return {
        items: res.scenes || [],
        total: res.total || 0
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load content');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    contentList: [],
    loadedCount: 0,
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    loading: false,
    error: null,
    filters: {}
  },
  reducers: {
    resetContent(state, action) {
      state.contentList = [];
      state.loadedCount = 0;
      state.totalCount = 0;
      state.currentPage = 1;
      state.loading = false;
      state.error = null;
      state.filters = action.payload || {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentPage.fulfilled, (state, action) => {
        state.loading = false;
        // mock 模式下只允许追加一次，防止重复
        const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
        if (USE_MOCK && state.currentPage > 1) {
          // 不追加
        } else {
          // 去重追加
          const existingIds = new Set(state.contentList.map(item => item.id));
          const newItems = action.payload.items.filter(item => !existingIds.has(item.id));
          state.contentList = [...state.contentList, ...newItems];
        }
        state.loadedCount = state.contentList.length;
        state.totalCount = action.payload.total;
        state.currentPage += 1;
      })
      .addCase(fetchContentPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load content';
      });
  }
});

export const { resetContent } = contentSlice.actions;
export default contentSlice.reducer;
