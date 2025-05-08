import {
  getDetailLead,
  getLead,
  storeLead,
  updateLead,
  destroyLead,
} from "@/actions/leadAction";
import { StatusReducerEnum } from "@/hooks/use-redux";
import { createModuleState, handleModuleState } from "@/lib/redux-thunk";
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

const initialState = {
  index: createModuleState(),
  show: createModuleState(),
  store: createModuleState(),
  update: createModuleState(),
  destroy: createModuleState(),
};

const leadSlice = createSlice({
  name: "lead",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getLead, getDetailLead, storeLead, updateLead, destroyLead),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.PENDING);
        }
      )
      .addMatcher(
        isRejected(getLead, getDetailLead, storeLead, updateLead, destroyLead),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.FULFILLED);
        }
      )
      .addMatcher(
        isFulfilled(getLead, getDetailLead, storeLead, updateLead, destroyLead),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.REJECTED);
        }
      );
  },
});

export default leadSlice.reducer;
