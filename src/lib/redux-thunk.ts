import { StatusReducerEnum } from "@/hooks/use-redux";
import {
  PayloadAction,
  SerializedError,
  UnknownAction,
} from "@reduxjs/toolkit";

export type ErrorType = Record<string, string[]> | null;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  code: number;
  result?: T;
  errors?: ErrorType;
}

export interface ModuleState<T> {
  loading: boolean;
  response: ApiResponse<T> | null;
}

// Helper function to generate the initial state for any module
export const createModuleState = <T>(): ModuleState<T> => ({
  loading: false,
  response: {
    success: false,
    code: null,
    message: "",
    result: null,
    errors: null,
  },
});

// Generalized handleModule function
export const handleModule = <T>(
  state: Record<string, ModuleState<T>>,
  action: UnknownAction,
  moduleName: string
): void => {
  state[moduleName].loading = false;
  state[moduleName].response = action.payload as ApiResponse<T>;
};

export const handleModuleState = <T>(
  state: Record<string, ModuleState<T>>,
  action: UnknownAction,
  status: StatusReducerEnum
) => {
  const moduleName = action.type.split("/")[1];

  if (!state[moduleName]) {
    state[moduleName] = createModuleState();
  }

  switch (status) {
    case StatusReducerEnum.PENDING:
      state[moduleName].loading = true;
      state[moduleName].response = createModuleState()
        .response as ApiResponse<T>;
      break;

    case StatusReducerEnum.FULFILLED: {
      state[moduleName].loading = false;
      state[moduleName].response = action.payload as ApiResponse<T>;
      break;
    }

    case StatusReducerEnum.REJECTED: {
      state[moduleName].loading = false;
      state[moduleName].response = action.payload as ApiResponse<T>;
      break;
    }
  }
};
