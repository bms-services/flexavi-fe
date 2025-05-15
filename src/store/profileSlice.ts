import {
  getProfile,
  updateProfile,
  createProfileIntent,
  createProfileTrial,
  updateProfilePackage,
  updateProfilePayment,
  getProfileCompany,
  updateProfileCompany,
} from "@/actions/profileAction";
import { StatusReducerEnum } from "@/hooks/use-redux";
import { createModuleState, handleModuleState } from "@/lib/redux-thunk";
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

const initialState = {
  show: createModuleState(),
  update: createModuleState(),
  createIntent: createModuleState(),
  createTrial: createModuleState(),
  updatePackage: createModuleState(),
  updatePayment: createModuleState(),
  showCompany: createModuleState(),
  updateCompany: createModuleState(),

};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(
          getProfile,
          updateProfile,
          createProfileIntent,
          createProfileTrial,
          updateProfilePackage,
          updateProfilePayment,
          getProfileCompany,
          updateProfileCompany
        ),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.PENDING);
        }
      )
      .addMatcher(
        isRejected(
          getProfile,
          updateProfile,
          createProfileIntent,
          createProfileTrial,
          updateProfilePackage,
          updateProfilePayment,
          getProfileCompany,
          updateProfileCompany
        ),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.FULFILLED);
        }
      )
      .addMatcher(
        isFulfilled(
          getProfile,
          updateProfile,
          createProfileIntent,
          createProfileTrial,
          updateProfilePackage,
          updateProfilePayment,
          getProfileCompany,
          updateProfileCompany
        ),
        (state, action) => {
          handleModuleState(state, action, StatusReducerEnum.REJECTED);
        }
      );
  },
});

export default profileSlice.reducer;
