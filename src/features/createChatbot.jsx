import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../api/config";

export const uploadChatbot = createAsyncThunk(
  "chatbot/uploadChatbot",
  async ({ name, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);

      const res = await axios.post(
        `${Config.API_BASE_URL}/user/chatbot/upload`,
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
      return rejectWithValue(err.response?.data || "Upload gagal");
    }
  }
);

const createChatbot = createSlice({
  name: "chatbot",
  initialState: {
    bots: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadChatbot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadChatbot.fulfilled, (state, action) => {
        state.loading = false;
        state.bots.push(action.payload);
      })
      .addCase(uploadChatbot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createChatbot.reducer;
