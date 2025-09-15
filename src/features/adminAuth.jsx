import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Config from "../api/config";
// REGISTER
export const registerAdmin = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Config.API_BASE_URL}/admin/register`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Register failed");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://chatbot.gitstraining.com/verify/${token}`
      );
      return res.data; // misalnya { message: "Email verified successfully" }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Verification failed" }
      );
    }
  }
);

// LOGIN
// LOGIN
export const loginAdmin = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const apiKey = "my-secure-api-key"; // dari Config.API_KEY
      const basicUser = "admin"; // dari Config.BASIC_AUTH_USERNAME
      const basicPass = "chatbot11"; // dari Config.BASIC_AUTH_PASSWORD
      const basicAuth = btoa(`${basicUser}:${basicPass}`);

      const res = await axiosInstance.post(
        `${Config.API_BASE_URL}/admin/login`,
        credentials,
        {
          headers: {
            "x-api-key": apiKey,
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data; // { access_token, session_id, ... }
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null,

    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.msg;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        const token = action.payload.access_token || action.payload.token;

        state.loading = false;
        state.token = token;
        state.user = jwtDecode(token);
        localStorage.setItem("token", token);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY EMAIL
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Verification failed";
      });
  },
});

export const { logout, clearMessage } = authSlice.actions;
export default authSlice.reducer;
