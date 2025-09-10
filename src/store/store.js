import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import authAdminReducer from "../features/adminAuth";
import chatbotReducer from "../features/chatbotSlice";
import chatReducer from "../features/historyChatSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatbot: chatbotReducer,
    chats: chatReducer,
    authAdmin: authAdminReducer,
  },
});

export default store;