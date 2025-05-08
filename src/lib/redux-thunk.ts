import { StatusReducerEnum } from "@/hooks/use-redux";
import {
  PayloadAction,
  SerializedError,
  UnknownAction,
} from "@reduxjs/toolkit";

export type ErrorType = Record<string, string[]> | null;

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    [key: string]: unknown;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export type ResultType<T> = T | PaginatedResponse<T>;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  code: number;
  result?: ResultType<T>;
  errors?: ErrorType;
}

export interface ModuleState<T> {
  loading: boolean;
  response: ApiResponse<T> | null;
}

// Helper function to generate the initial state for any module
export const createModuleState = <T = unknown>(): ModuleState<T> => ({
  loading: false,
  response: {
    success: false,
    code: null,
    message: "",
    result: null,
    errors: null,
  },
});

export const handleModuleState = <
  State extends Record<string, ModuleState<unknown>>,
  K extends keyof State
>(
  state: State,
  action: UnknownAction,
  status: StatusReducerEnum
) => {
  const moduleName = action.type.split("/")[1] as K;

  if (!state[moduleName]) {
    state[moduleName] = createModuleState() as State[K];
  }

  switch (status) {
    case StatusReducerEnum.PENDING:
      state[moduleName].loading = true;
      state[moduleName].response = createModuleState()
        .response as State[K]["response"];
      break;

    case StatusReducerEnum.FULFILLED:
    case StatusReducerEnum.REJECTED:
      state[moduleName].loading = false;
      state[moduleName].response = action.payload as State[K]["response"];
      break;
  }
};
