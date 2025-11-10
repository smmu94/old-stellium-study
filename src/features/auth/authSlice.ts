import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, SafeUser } from "./types";

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SafeUser | null>) => {
      state.user = action.payload;
    },
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setInitializing } = authSlice.actions;
export default authSlice.reducer;