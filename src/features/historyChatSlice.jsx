// src/features/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";

// ambil token dari localStorage (hasil login)

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${Config.API_BASE_URL}/admin/chats `, {
        headers: {
          Authorization: `Bearer ${token}`, // kirim JWT token
        },
      });
      console.log("API response =>", res.data);
      return res.data;
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        err.message ||
        "Unknown error";
      return rejectWithValue(msg);
    }
  }
);

export const chatWa = createAsyncThunk(
  "chats/chatWa",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${Config.API_BASE_URL}/admin/history/wa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API response =>", res.data);
      return res.data;
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        err.message ||
        "Unknown error";
      return rejectWithValue(msg);
    }
  }
);
const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(chatWa.pending, (state) => {
        state.loading = true;
      })
      .addCase(chatWa.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(chatWa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
