import { login, logout, register } from "@/actions/authActions";
import { StatusReducerEnum } from "@/hooks/use-redux";
import {
  createModuleState,
  handleModuleState,
  ModuleState,
} from "@/lib/redux-thunk";
import { User } from "@/types/user";
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

interface initialStateI {
  login: ModuleState<User>;
  register: ModuleState<User>;
  logout: ModuleState<User>;
}

const initialState: initialStateI = {
  login: createModuleState<User>(),
  register: createModuleState<User>(),
  logout: createModuleState<User>(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    registerReset: (state) => {
      state.register = createModuleState<User>();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(login, register, logout), (state, action) => {
        handleModuleState(state, action, StatusReducerEnum.PENDING);
      })
      .addMatcher(isFulfilled(login, register, logout), (state, action) => {
        handleModuleState(state, action, StatusReducerEnum.FULFILLED);
      })
      .addMatcher(isRejected(login, register, logout), (state, action) => {
        handleModuleState(state, action, StatusReducerEnum.REJECTED);
      });
  },
});

export default authSlice.reducer;

export const { registerReset } = authSlice.actions;
