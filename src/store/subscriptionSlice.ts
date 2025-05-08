import {
  getDetailPackage,
  getPackage,
  updatePackage,
} from "@/actions/packageAction";
import { StatusReducerEnum } from "@/hooks/use-redux";
import {
  createModuleState,
  handleModuleState,
  ModuleState,
  PaginatedResponse,
} from "@/lib/redux-thunk";
import { Package } from "@/types/package";
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

// interface initialStateI {
//   index: ModuleState<PaginatedResponse<Package>>;
//   show: ModuleState<Package>;
//   update: ModuleState<Package>;
// }

const initialState = {
  index: createModuleState(),
  show: createModuleState(),
  update: createModuleState(),
};

const packageSlice = createSlice({
  name: "package",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getPackage, getDetailPackage, updatePackage),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.PENDING);
        }
      )
      .addMatcher(
        isRejected(getPackage, getDetailPackage, updatePackage),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.FULFILLED);
        }
      )
      .addMatcher(
        isFulfilled(getPackage, getDetailPackage, updatePackage),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.REJECTED);
        }
      );
  },
});

export default packageSlice.reducer;
