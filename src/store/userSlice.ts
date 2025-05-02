import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StatusReducerEnum } from "@/hooks/use-redux";
import {
  createCrudInitialState,
  PaginationResponse,
} from "@/@types/global-type";
import { User } from "@/types/user";

const initialState = createCrudInitialState<User>();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 🔹 GET LIST
    fetchUserStart: (state) => {
      state.list.status = StatusReducerEnum.LOADING;
    },
    fetchUserSuccess: (
      state,
      action: PayloadAction<PaginationResponse<User>>
    ) => {
      state.list.response = action.payload;
      state.list.status = StatusReducerEnum.SUCCEEDED;
    },
    fetchUserFailed: (state, action: PayloadAction<string>) => {
      state.list.status = StatusReducerEnum.FAILED;
      state.list.error = action.payload;
    },

    // 🔹 GET SUMMARY
    fetchUserSummaryStart: (state) => {
      state.summary.status = StatusReducerEnum.LOADING;
    },
    fetchUserSummarySuccess: (state, action: PayloadAction<User>) => {
      state.summary.response = action.payload;
      state.summary.status = StatusReducerEnum.SUCCEEDED;
    },
    fetchUserSummaryFailed: (state, action: PayloadAction<string>) => {
      state.summary.status = StatusReducerEnum.FAILED;
      state.summary.error = action.payload;
    },

    // 🔹 GET DETAIL
    fetchUserDetailStart: (state) => {
      state.detail.status = StatusReducerEnum.LOADING;
    },
    fetchUserDetailSuccess: (state, action: PayloadAction<User>) => {
      state.detail.response = action.payload;
      state.detail.status = StatusReducerEnum.SUCCEEDED;
    },
    fetchUserDetailFailed: (state, action: PayloadAction<string>) => {
      state.detail.status = StatusReducerEnum.FAILED;
      state.detail.error = action.payload;
    },

    // 🔹 ADD USER (STORE)
    storeUserStart: (state) => {
      state.store.status = StatusReducerEnum.LOADING;
    },
    storeUserSuccess: (state, action: PayloadAction<User>) => {
      state.store.response = action.payload;
      state.store.status = StatusReducerEnum.SUCCEEDED;
    },
    storeUserFailed: (state, action: PayloadAction<string>) => {
      state.store.status = StatusReducerEnum.FAILED;
      state.store.error = action.payload;
    },
    storeUserReset: (state) => {
      state.store.status = StatusReducerEnum.IDLE;
      state.store.error = null;
      state.store.response = null;
    },

    // 🔹 UPDATE USER
    updateUserStart: (state) => {
      state.update.status = StatusReducerEnum.LOADING;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.update.response = action.payload;
      state.update.status = StatusReducerEnum.SUCCEEDED;
      state.list.response.data = state.list.response.data.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    },
    updateUserFailed: (state, action: PayloadAction<string>) => {
      state.update.status = StatusReducerEnum.FAILED;
      state.update.error = action.payload;
    },
    updateUserReset: (state) => {
      state.update.status = StatusReducerEnum.IDLE;
      state.update.error = null;
      state.update.response = null;
    },

    // 🔹 DELETE USER
    deleteUserStart: (state) => {
      state.delete.status = StatusReducerEnum.LOADING;
    },
    deleteUserSuccess: (state, action: PayloadAction<User>) => {
      state.delete.response = action.payload;
      state.delete.status = StatusReducerEnum.SUCCEEDED;
    },
    deleteUserFailed: (state, action: PayloadAction<string>) => {
      state.delete.status = StatusReducerEnum.FAILED;
      state.delete.error = action.payload;
    },
    deleteUserReset: (state) => {
      state.delete.status = StatusReducerEnum.IDLE;
      state.delete.error = null;
      state.delete.response = null;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailed,
  fetchUserSummaryStart,
  fetchUserSummarySuccess,
  fetchUserSummaryFailed,
  fetchUserDetailStart,
  fetchUserDetailSuccess,
  fetchUserDetailFailed,
  storeUserStart,
  storeUserSuccess,
  storeUserFailed,
  storeUserReset,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  updateUserReset,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  deleteUserReset,
} = userSlice.actions;

export default userSlice.reducer;
