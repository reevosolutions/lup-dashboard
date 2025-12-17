import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AuthenticationManager from "@lib/auth/authentication-manager";

// Define the shape of the auth state based on the legacy system
interface AuthState {
  user: Levelup.V2.Users.Entity.ExposedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  roleGroup: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  roleGroup: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: Levelup.V2.Auth.Api.Auth.Signin.Response["data"]) => {
    const authManager = AuthenticationManager.getInstance();
    const result = await authManager.authenticate(data);
    return result;
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async () => {
    const authManager = AuthenticationManager.getInstance();
    const data = await authManager.getAuthData();
    if (!data) throw new Error("No session found");
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    const authManager = AuthenticationManager.getInstance();
    await authManager.logout();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: Levelup.V2.Users.Entity.ExposedUser; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.roleGroup = user?.role_group || null;
      state.isAuthenticated = true;
      state.status = "succeeded";
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.roleGroup = null;
      state.isAuthenticated = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.roleGroup = action.payload.user?.role_group || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      // Restore Session
      .addCase(restoreSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.token = action.payload.token;
        // Note: In a real app, we'd have the user object here too
      })
      .addCase(restoreSession.rejected, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.roleGroup = null;
        state.isAuthenticated = false;
        state.status = "idle";
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
// Export alias for backward compatibility if needed
export const logout = clearCredentials; 

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status;

export default authSlice.reducer;
