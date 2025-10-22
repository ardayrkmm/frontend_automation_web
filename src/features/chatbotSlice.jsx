
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";


export const sendMessage = createAsyncThunk(
  "chatbot/sendMessage",
  async ({ message, session_id, isGuest }, { rejectWithValue }) => {
    try {
      const endpoint = isGuest ? "user/chatbot/guest" : "user/chatbot";

      const res = await axiosInstance.post(endpoint, {
        message,
        session_id,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Failed to send message"
      );
    }
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    messages: [],
    session_id: null,
    loading: false,
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ sender: "user", text: action.payload });
    },
    addBotMessage: (state, action) => {
      state.messages.push({ sender: "ai", text: action.payload });
    },
    clearChat: (state) => {
      state.messages = [];
      state.session_id = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const reply = action.payload.response;

        // Jangan push kalau kosong
        if (reply && reply !== "No response") {
          state.messages.push({ sender: "ai", text: reply });
        }

        state.session_id = action.payload.session_id;
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push({
          sender: "ai",
          text: "❌ Error koneksi ke server",
        });
      });
  },
});

export const { addUserMessage, addBotMessage, clearChat } =
  chatbotSlice.actions;
export default chatbotSlice.reducer;
