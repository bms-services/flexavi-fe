import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice";
import profileReducer from "@/store/profileSlice";
import packageReducer from "@/store/packageSlice";
import leadReducer from "@/store/leadSlice";
import settingReducer from "@/store/settingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    package: packageReducer,
    lead: leadReducer,
    setting: settingReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export type StatusReducerType = "idle" | "loading" | "succeeded" | "failed";
export type ErrorReducerType = string | null;
