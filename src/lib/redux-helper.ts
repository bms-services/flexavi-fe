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
  action: { type: string; payload: ApiResponse<T> },
  moduleName: string
): void => {
  state[moduleName].loading = false;
  state[moduleName].response = action.payload;
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  code: number;
  result?: T; // result can be object, array, or null
  errors?: Record<string, string[]> | null;
}

export interface ModuleState<T> {
  loading: boolean;
  response: ApiResponse<T> | null;
}
