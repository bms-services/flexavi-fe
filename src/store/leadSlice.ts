import {
  getLeadIndex,
  getLeadShow,
  putLeadUpdate,
  postLeadStore,
  deleteLeadDestroy
} from "@/actions/leadAction";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncState } from "./settingSlice";
import { Lead } from "@/types";
import { PaginatedResponse } from "@/lib/redux-thunk";

// --- Initial State ---
const initialState = {
  index: createAsyncState<PaginatedResponse<Lead>>(),
  show: createAsyncState<Lead>(),
  store: createAsyncState<Lead>(),
  update: createAsyncState<Lead>(),
  destroy: createAsyncState<Lead>(),
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const attachAsyncHandler = <
      TKey extends keyof typeof initialState
    >(
      thunk: any,
      key: TKey
    ) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[key] = {
            ...createAsyncState(),
            loading: true,
          };
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state[key] = {
            ...state[key],
            ...action.payload,
            loading: false,
          };
        })
        .addCase(thunk.rejected, (state, action) => {
          state[key] = {
            ...createAsyncState(),
            loading: false,
            errors: action.payload?.errors || [action.error.message],
          };
        });
    };

    attachAsyncHandler(getLeadIndex, "index");
    attachAsyncHandler(getLeadShow, "show");
    attachAsyncHandler(postLeadStore, "store");
    attachAsyncHandler(putLeadUpdate, "update");
    attachAsyncHandler(deleteLeadDestroy, "destroy");
  },
});

export default leadSlice.reducer;
