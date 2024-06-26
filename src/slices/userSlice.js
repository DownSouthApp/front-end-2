import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      console.log("User logged in:", state.user.username);
    },
    logout: (state) => {
      state.user = null;
      localStorage.setItem("user", null);
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => {
 
  const stateTest = state.user.user;
  console.log("State Test: ", stateTest);
  return JSON.parse(localStorage.getItem("user"));
}

// export const selectUser = (state) => state.user;

export default userSlice.reducer;
