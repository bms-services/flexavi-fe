import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useUser() {
  const user = useSelector((state: RootState) => state.user);
  return { user };
}
