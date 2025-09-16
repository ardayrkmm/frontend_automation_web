import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";
// REGISTER
// --- Thunks ---
export const fetchChatsPerDay = createAsyncThunk(
  "chatStats/fetchChatsPerDay",
  async () => {
    const res = await axios.get(`${Config.API_BASE_URL}/admin/chats/per-day`);
    return res.data;
  }
);

export const fetchChatsPerHour = createAsyncThunk(
  "chatStats/fetchChatsPerHour",
  async () => {
    const res = await axios.get(`${Config.API_BASE_URL}/admin/chats/per-hour`);
    return res.data;
  }
);

export const fetchGuestVsRegistered = createAsyncThunk(
  "chatStats/fetchGuestVsRegistered",
  async () => {
    const res = await axios.get(
      `${Config.API_BASE_URL}/admin/chats/guest-vs-registered`
    );
    return res.data;
  }
);

// --- Slice ---
const chatStatsSlice = createSlice({
  name: "chatStats",
  initialState: {
    perDay: [],
    perHour: [],
    guestVsRegistered: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // perDay
      .addCase(fetchChatsPerDay.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatsPerDay.fulfilled, (state, action) => {
        state.loading = false;
        state.perDay = action.payload;
      })
      .addCase(fetchChatsPerDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // perHour
      .addCase(fetchChatsPerHour.fulfilled, (state, action) => {
        state.perHour = action.payload;
      })

      // guest vs registered
      .addCase(fetchGuestVsRegistered.fulfilled, (state, action) => {
        state.guestVsRegistered = action.payload;
      });
  },
});

export default chatStatsSlice.reducer;
