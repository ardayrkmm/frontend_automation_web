// src/features/CustomerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";

// === GET all customers ===
export const fetchCustomers = createAsyncThunk(
  "customer/fetchAll",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${Config.API_BASE_URL}/user/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": Config.API_KEY,
        },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// === ADD customer ===
export const addCustomer = createAsyncThunk(
  "customer/add",
  async ({ nomer }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${Config.API_BASE_URL}/user/customers`,
        { nomer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": Config.API_KEY,
          },
        }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// === UPDATE customer ===
export const updateCustomer = createAsyncThunk(
  "customer/update",
  async ({ id, nomer }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${Config.API_BASE_URL}/user/customers/${id}`,
        { nomer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": Config.API_KEY,
          },
        }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// === DELETE customer ===
export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${Config.API_BASE_URL}/user/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": Config.API_KEY,
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ NEW: Upload CSV customer
// features/CustomerSlice.js
export const uploadCSVCustomer = createAsyncThunk(
  "customer/uploadCSVCustomer",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Config.API_BASE_URL}/user/customer/uploadcsv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Upload gagal" });
    }
  }
);

// === SLICE ===
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    status: null,
    items: [],
    error: null,
    csvResult: null, // untuk respon upload CSV (opsional)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchCustomers.pending, (s) => {
        s.loading = true;
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (s, a) => {
        s.loading = false;
        s.status = "succeeded";

        s.items = a.payload;
      })
      .addCase(fetchCustomers.rejected, (s, a) => {
        s.loading = false;
        s.status = "failed";
        s.error = a.payload?.message || a.error.message;
      })

      // ADD
      .addCase(addCustomer.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })

      // UPDATE
      .addCase(updateCustomer.fulfilled, (s, a) => {
        const i = s.items.findIndex((x) => x.id === a.payload.id);
        if (i !== -1) s.items[i] = a.payload;
      })

      // DELETE
      .addCase(deleteCustomer.fulfilled, (s, a) => {
        s.items = s.items.filter((x) => x.id !== a.payload);
      })
      .addCase(uploadCSVCustomer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadCSVCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(uploadCSVCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || "Terjadi kesalahan saat upload CSV";
      });
  },
});

export default customerSlice.reducer;
