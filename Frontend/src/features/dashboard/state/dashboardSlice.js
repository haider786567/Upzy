import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import monitorService from '../service/monitorService';
import analyticsService from '../service/analyticsService';

export const fetchMonitors = createAsyncThunk(
  'dashboard/fetchMonitors',
  async (_, thunkAPI) => {
    try {
      return await monitorService.getAllMonitors();
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  'dashboard/fetchAnalytics',
  async ({ monitorId, range }, thunkAPI) => {
    try {
      return await analyticsService.getAnalytics(monitorId, range);
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  monitors: [],
  selectedMonitorAnalytics: null,
  isLoading: false,
  isError: false,
  message: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonitors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMonitors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monitors = action.payload;
      })
      .addCase(fetchMonitors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.selectedMonitorAnalytics = action.payload;
      });
  },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;
