import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import authAdminReducer from "../features/adminAuth";
import chatbotReducer from "../features/chatbotSlice";
import chatReducer from "../features/historyChatSlice";
import chatStatsReducer from "../features/adminDashSlice";
import broadcastReducer from "../features/BroadcastSlice";
import pricingReducer from "../features/pricingSlice";
import chekoutReducer from "../features/chekoutSlice";
import orderReducer from "../features/OrderSlice";
import adminUsersReducer from "../features/AdminUserSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatbot: chatbotReducer,
    chats: chatReducer,
    authAdmin: authAdminReducer,
    chatStats: chatStatsReducer,
    broadcast: broadcastReducer,
    pricing: pricingReducer,
    checkout: chekoutReducer,
    orders: orderReducer,
    users: adminUsersReducer,

  },
});

export default store;