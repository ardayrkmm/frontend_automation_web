import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${Config.API_BASE_URL}/user/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Gagal fetch orders");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
