import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice";
import userReducer from "@/store/userSlice";
import profileReducer from "@/store/profileSlice";

export const store = configureStore({
  reducer: {
    // analytic: analyticReducer,
    // employee: employeeReducer,
    // customer: customerReducer,
    // company: companyReducer,
    // workday: workdayReducer,
    // purchaseInvoice: purchaseInvoiceReducer,
    // salesInvoice: salesInvoiceReducer,
    // quotation: quotationReducer,
    // meta: metaReducer,
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
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
