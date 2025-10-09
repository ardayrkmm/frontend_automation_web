import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Config from "../api/config";
import axios from "axios";

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async ({ plan_id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/user/checkout`,
        { plan_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Checkout body:", { plan_id });
      console.log("Checkout token:", token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { msg: "Checkout gagal" });
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCheckout: (state) => {
      state.order = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || "Checkout gagal";
      });
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
