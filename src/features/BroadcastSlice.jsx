import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";

export const sendBroadcast = createAsyncThunk(
  "broadcast/send",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Config.API_BASE_URL}/user/broadcast/add`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );
      return res.data;
    } catch (err) {
      if (err.response && err.response.data)
        return rejectWithValue(err.response.data);
      return rejectWithValue({ success: false, message: err.message });
    }
  }
);
const broadcastSlice = createSlice({
  name: "broadcast",
  initialState: {
    loading: false,
    lastResult: null,
    error: null,
  },
  reducers: {
    clearResult(state) {
      state.lastResult = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendBroadcast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendBroadcast.fulfilled, (state, action) => {
        state.loading = false;
        state.lastResult = action.payload;
      })
      .addCase(sendBroadcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default broadcastSlice.reducer;
