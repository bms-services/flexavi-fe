// import { DateRangeType } from "react-tailwindcss-datepicker";

export interface ParamsAction {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
  search?: string;
  //   date?: {
  //     start_date?: DateRangeType["startDate"];
  //     end_date?: DateRangeType["endDate"];
  //   };
}

export interface ParamsActionAnalytic extends ParamsAction {
  start_date?: string;
  end_date?: string;
}

import { ErrorReducerType, StatusReducerType } from "@/store";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
}

export interface PaginationResponse<T> {
  current_page: number;
  data: T[];
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export interface CrudState<T> {
  summary: SubState<T>;
  store: SubState<T>;
  list: SubState<PaginationResponse<T>>;
  detail: SubState<T>;
  update: SubState<T>;
  delete: SubState<T>;
}

export interface SubState<T> {
  response: Partial<T> | null;
  status: StatusReducerType;
  error: ErrorReducerType;
}

// 👉 Function to generate reusable initial state
export const createCrudInitialState = <T>(): CrudState<T> => ({
  summary: {
    response: null,
    status: "idle",
    error: null,
  },
  store: {
    response: null,
    status: "idle",
    error: null,
  },
  list: {
    response: null,
    status: "idle",
    error: null,
  },
  detail: {
    response: null,
    status: "idle",
    error: null,
  },
  update: {
    response: null,
    status: "idle",
    error: null,
  },
  delete: {
    response: null,
    status: "idle",
    error: null,
  },
});
