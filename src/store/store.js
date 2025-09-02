import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import chatbotReducer from "../features/chatbotSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatbot: chatbotReducer,
  },
});

export default store;