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
import createChatbotRed from "../features/createChatbot";
import LandingFitur from "../features/LandingFiturSlice";
import PaketHistoriPengguna from "../features/PaketHistoriPenggunaSlice";
import customerReducer from "../features/CustomerSlice";
import { injectStore } from "../api/axiosInstance"; // ✅ injeksi store

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
    createChatbot: createChatbotRed,
    fiturs: LandingFitur,
    PaketHistoriPenggunas: PaketHistoriPengguna,
    customer: customerReducer,
  },
});

// ✅ injeksikan store agar axios bisa akses tanpa circular import
injectStore(store);

export default store;
