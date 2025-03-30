import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: {
    User_ID: number;
    Address: string;
    Contact_no: string;
    Email: string;
    Role: string;
    Name: string;
  } | null;
}

const initialState: UserState = { userData: null };

const Userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState["userData"]>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { login, logout } = Userslice.actions;
export default Userslice.reducer;
