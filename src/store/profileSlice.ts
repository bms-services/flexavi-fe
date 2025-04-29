import { getProfile } from "@/actions/profileAction";
import {
  createModuleState,
  handleModule,
  ModuleState,
} from "@/lib/redux-helper";
import { User } from "@/types/auth";
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

interface AuthState {
  profile: ModuleState<User>;
}

const initialAuthState: AuthState = {
  profile: createModuleState<User>(),
};

const profileSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getProfile), (state, action) => {
        const moduleName = action.type.split("/")[1];
        state[moduleName].loading = true;
        state[moduleName].response = createModuleState().response;
      })
      .addMatcher(isRejected(getProfile), (state, action) => {
        const moduleName = action.type.split("/")[1];
        state[moduleName].loading = false;
        state[moduleName].response = action.payload;
      })
      .addMatcher(isFulfilled(getProfile), (state, action) => {
        const moduleName = action.type.split("/")[1];
        handleModule(state, action, moduleName);
      });
  },
});

export default profileSlice.reducer;
