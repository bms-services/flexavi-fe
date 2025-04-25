import { configureStore } from "@reduxjs/toolkit";
// import employeeReducer from "@/store/employeeSlice";
// import customerReducer from "@/store/customerSlice";
// import companyReducer from "@/store/companySlice";
// import metaReducer from "@/store/metaSlice";
import authReducer from "@/store/authSlice";

// import analyticReducer from "@/store/analyticSlice";
// import workdayReducer from "@/store/workdaySlice";
// import purchaseInvoiceReducer from "@/store/purchaseInvoiceSlice";
// import salesInvoiceReducer from "@/store/salesInvoiceSlice";
// import quotationReducer from "@/store/quotationSlice";

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
