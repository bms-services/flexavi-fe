import { getProfile, updateProfile } from "@/actions/profileAction";
import { StatusReducerEnum } from "@/hooks/use-redux";
import {
  createModuleState,
  handleModule,
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
  show: ModuleState<User>;
  update: ModuleState<User>;
}

const initialState: initialStateI = {
  show: createModuleState<User>(),
  update: createModuleState<User>(),
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getProfile), (state, action) => {
        handleModuleState(state, action, StatusReducerEnum.PENDING);
      })
      .addMatcher(isRejected(getProfile), (state, action) => {
        handleModuleState(state, action, StatusReducerEnum.FULFILLED);
      })
      .addMatcher(isFulfilled(getProfile), (state, action) => {
        handleModuleState(state, action, StatusReducerEnum.REJECTED);
      });
  },
});

export default profileSlice.reducer;
