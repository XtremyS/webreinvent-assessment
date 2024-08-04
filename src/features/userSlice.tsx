import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../utils/types";

const initialState: UserState = {
  isAuthenticated: false,
  authToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.authToken = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.authToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
