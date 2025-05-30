import {
  getPackageIndex,
  getPackageShow,
  putPackageUpdate
} from "@/actions/packageAction";
import { createSlice, AsyncThunk } from "@reduxjs/toolkit";
import { Package } from "@/types/package";
import { PaginatedResponse } from "@/lib/redux-thunk";
import { createAsyncState } from "./settingSlice";


// --- Initial State ---
const initialState = {
  index: createAsyncState<PaginatedResponse<Package>>(),
  show: createAsyncState<Package>(),
  update: createAsyncState<Package>(),
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const attachAsyncHandler = <TKey extends keyof typeof initialState>(
      thunk: AsyncThunk<any, any, any>,
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

    attachAsyncHandler(getPackageIndex, "index");
    attachAsyncHandler(getPackageShow, "show");
    attachAsyncHandler(putPackageUpdate, "update");
  },
});

export default packageSlice.reducer;
