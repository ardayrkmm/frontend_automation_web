import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
// Async thunk untuk ambil data fitur dari Flask API
export const fetchFeatures = createAsyncThunk(
  "features/fetchFeatures",
  async () => {
    const res = await axios.get(
      `${Config.API_BASE_URL}/admin/landing/features`
    );
    return res.data;
  }
);
export const addFeature = createAsyncThunk(
  "landingFitur/addFeature",
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("desc", payload.desc);
      formData.append("order_index", payload.order_index);
      if (payload.gambar) {
        formData.append("gambar", payload.gambar); // file, bukan string
      }

      const headers = {
        "Content-Type": "multipart/form-data",
        ...authHeader(),
      };

      const res = await axios.post(
        `${Config.API_BASE_URL}/admin/landing/tambah/fitur`,
        formData,
        { headers }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const featuresSlice = createSlice({
  name: "features",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // add
      .addCase(addFeature.pending, (state) => {
        state.addStatus = "pending";
        state.addError = null;
      })
      .addCase(addFeature.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        // optional: push new item into items array
        state.items.push(action.payload);
      })
      .addCase(addFeature.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload || action.error.message;
      });
  },
});

export default featuresSlice.reducer;
