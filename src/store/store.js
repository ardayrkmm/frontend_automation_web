import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import authAdminReducer from "../features/adminAuth";
import chatbotReducer from "../features/chatbotSlice";
import chatReducer from "../features/historyChatSlice";
import chatStatsReducer from "../features/adminDashSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatbot: chatbotReducer,
    chats: chatReducer,
    authAdmin: authAdminReducer,
    chatStats: chatStatsReducer,
  },
});

export default store;