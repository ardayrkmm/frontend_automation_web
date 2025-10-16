import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";

export const ambilHistoriPengguna = createAsyncThunk(
  "orders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${Config.API_BASE_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Gagal fetch orders");
    }
  }
);

const paketPenggunaHistoriSlice = createSlice({
  name: "paketPenggunaHistori",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ambilHistoriPengguna.pending, (state) => {
        state.loading = true;
      })
      .addCase(ambilHistoriPengguna.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(ambilHistoriPengguna.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paketPenggunaHistoriSlice.reducer;
