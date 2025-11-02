import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";

// === POST broadcast ===
export const sendBroadcast = createAsyncThunk(
  "broadcast/send",
  async (payload, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${Config.API_BASE_URL}/user/broadcast/add`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { success: false, message: err.message }
      );
    }
  }
);

// === GET broadcast list ===
export const ambilDataBroadcast = createAsyncThunk(
  "broadcast/ambil",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue({ message: "Token tidak ditemukan" });

    try {
      const res = await axios.get(`${Config.API_BASE_URL}/user/broadcast`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { success: false, message: err.message }
      );
    }
  }
);

const broadcastSlice = createSlice({
  name: "broadcast",
  initialState: {
    loading: false,
    items: [], // list histori
    lastResult: null, // hasil kirim terakhir
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
      // === SEND ===
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
      })
      // === GET ===
      .addCase(ambilDataBroadcast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ambilDataBroadcast.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(ambilDataBroadcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const { clearResult } = broadcastSlice.actions;
export default broadcastSlice.reducer;
