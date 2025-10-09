import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";

export const ambilPrice = createAsyncThunk("pricing/fetchPricing", async () => {
  const response = await axios.get(`${Config.API_BASE_URL}/user/pricing`);
  return response.data;
});

const pricingSlice = createSlice({
  name: "pricing",
  initialState: {
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ambilPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(ambilPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(ambilPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pricingSlice.reducer;
